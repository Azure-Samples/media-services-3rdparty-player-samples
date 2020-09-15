import BasePlayer from '../js/common.js'

class HlsPlayer extends BasePlayer {
  initPlayer () {
    if (Hls.isSupported()) {
      this.events = {
        url: this.manifest,
        t0: performance.now(),
        load: [],
        buffer: [],
        video: [],
        level: [],
        bitrate: []
      }
      this.startTime = Date.now()
      const video = document.getElementById('video')
      if (this.caption) {
        document.getElementById('inputvtt').src = this.caption
      }

      const config = {}
      if (this.token) {
        Object.assign(config, {
          xhrSetup: (xhr, url) => {
            const urlLocation = this.getLocation(url)
            if (this.encryptionKeyUrl && this.encryptionKeyUrl.indexOf(urlLocation.hostname) !== -1) {
              xhr.setRequestHeader('Authorization', 'Bearer=' + this.getInputToken())
            }
          }
        })

        if (this.widevineLicenseUrl) {
          Object.assign(config, {
            licenseXhrSetup: (xhr, url) => {
              xhr.setRequestHeader('Authorization', 'Bearer=' + this.getInputToken())
            }
          })
        }
      }

      if (this.widevineLicenseUrl) {
        Object.assign(config, {
          widevineLicenseUrl: this.widevineLicenseUrl,
          emeEnabled: true
        })
      }

      this.hls = new Hls(config)
      this.hls.attachMedia(video)
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        this.hls.loadSource(this.manifest)
      })

      this.attachEvents()
    }
  }

  handleLevelError (data) {
    const levelObj = data.context || data
    this.hls.removeLevel(levelObj.level, levelObj.urlId || 0)
    if (!this.hls.levels.length) {
      this.addErrorMessage('All levels have been removed')
      this.hls.destroy()
      return
    }
    this.hls.currentLevel = 0
    this.hls.currentLevel = -1
  }

  handleMediaError () {
    const now = performance.now()
    if (!this.recoverDecodingErrorDate || (now - this.recoverDecodingErrorDate) > 3000) {
      this.recoverDecodingErrorDate = performance.now()
      this.addInfoMessage('Trying to recover media error.')
      this.hls.recoverMediaError()
    } else {
      if (!this.recoverSwapAudioCodecDate || (now - this.recoverSwapAudioCodecDate) > 3000) {
        this.recoverSwapAudioCodecDate = performance.now()
        this.addInfoMessage('Trying to swap audio codec and recover media error.')
        this.hls.swapAudioCodec()
        this.hls.recoverMediaError()
      } else {
        this.addErrorMessage('Cannot recover. Last media error recovery failed.')
      }
    }
  }

  // override method
  getPlayerInfo () {
    return `hls.js v${Hls.version}`
  }

  attachEvents () {
    this.hls.on(Hls.Events.MANIFEST_PARSED, (name, data) => {
      this.addInfoMessage('No of quality levels found: ' + this.hls.levels.length)
      this.addInfoMessage('Manifest successfully loaded')
    })

    this.hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (name, data) => {
      this.addInfoMessage('No of audio tracks found: ' + data.audioTracks.length)
    })

    this.hls.on(Hls.Events.AUDIO_TRACK_SWITCHING, (name, data) => {
      this.addInfoMessage('Audio track switching...')
      this.events.video.push({
        time: performance.now() - this.events.t0,
        type: 'audio switching',
        name: '@' + data.id
      })
      this.lastAudioTrackSwitchingIdx = this.events.video.length - 1
    })

    this.hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (name, data) => {
      this.addInfoMessage('Audio track switched')
      const event = {
        time: performance.now() - this.events.t0,
        type: 'audio switched',
        name: '@' + data.id
      }
      if (this.lastAudioTrackSwitchingIdx !== undefined) {
        this.events.video[this.lastAudioTrackSwitchingIdx].duration = event.time - this.events.video[this.lastAudioTrackSwitchingIdx].time
        this.lastAudioTrackSwitchingIdx = undefined
      }
      this.events.video.push(event)
    })

    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      this.addInfoMessage('Media element attached')
      this.bufferingIdx = -1
      this.events.video.push({
        time: performance.now() - this.events.t0,
        type: 'Media attached'
      })
    })

    this.hls.on(Hls.Events.MEDIA_DETACHED, () => {
      this.addInfoMessage('Media element detached')
      this.bufferingIdx = -1
      this.tracks = []
      this.events.video.push({
        time: performance.now() - this.events.t0,
        type: 'Media detached'
      })
    })

    this.hls.on(Hls.Events.FRAG_PARSING_INIT_SEGMENT, (name, data) => {
      this.events.video.push({
        time: performance.now() - this.events.t0,
        type: data.id + ' init segment'
      })
    })

    this.hls.on(Hls.Events.LEVEL_LOADED, (name, data) => {
      this.addInfoMessage("Level's playlist finished loading.")
    })

    this.hls.on(Hls.Events.LEVEL_UPDATED, (name, data) => {
      this.addInfoMessage("Level's details have been updated based on previous details - data: " + JSON.stringify(data.details))
    })

    this.hls.on(Hls.Events.LEVEL_PTS_UPDATED, (name, data) => {
      this.addInfoMessage("Level's PTS information has been updated after parsing a fragment - data: " + JSON.stringify(data.details))
    })

    this.hls.on(Hls.Events.ERROR, (name, data) => {
      console.warn('Error event:', data)
      switch (data.details) {
        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
          try {
            this.$('playerEvents').innerHTML = 'Cannot load <a href="' + data.context.url + '">' + this.manifest + '</a><br>HTTP response code:' + data.response.code + ' <br>' + data.response.text
            if (data.response.code === 0) {
              this.$('playerEvents').append('This might be a CORS issue, consider installing <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi">Allow-Control-Allow-Origin</a> Chrome Extension')
            }
          } catch (err) {
            this.$('playerEvents').innerHTML = 'Cannot load <a href="' + data.context.url + '">' + this.manifest + '</a><br>Response body: ' + data.response.text
          }
          break
        case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
          this.addErrorMessage('Timeout while loading manifest')
          break
        case Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
          this.addErrorMessage('Error while parsing manifest:' + data.reason)
          break
        case Hls.ErrorDetails.LEVEL_EMPTY_ERROR:
          this.addErrorMessage('Loaded level contains no fragments ' + data.level + ' ' + data.url)
          this.handleLevelError(data)
          break
        case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
          this.addErrorMessage('Error while loading level playlist ' + data.context.level + ' ' + data.url)
          this.handleLevelError(data)
          break
        case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
          this.addErrorMessage('Timeout while loading level playlist ' + data.context.level + ' ' + data.url)
          this.handleLevelError(data)
          break
        case Hls.ErrorDetails.LEVEL_SWITCH_ERROR:
          this.addErrorMessage('Error while trying to switch to level ' + data.level)
          break
        case Hls.ErrorDetails.FRAG_LOAD_ERROR:
          this.addErrorMessage('Error while loading fragment ' + data.frag.url)
          break
        case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
          this.addErrorMessage('Timeout while loading fragment ' + data.frag.url)
          break
        case Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
          this.addErrorMessage('Fragment-loop loading error')
          break
        case Hls.ErrorDetails.FRAG_DECRYPT_ERROR:
          this.addErrorMessage('Decrypting error:' + data.reason)
          break
        case Hls.ErrorDetails.FRAG_PARSING_ERROR:
          this.addErrorMessage('Parsing error:' + data.reason)
          break
        case Hls.ErrorDetails.KEY_LOAD_ERROR:
          this.addErrorMessage('Error while loading key ' + data.frag.decryptdata.uri)
          break
        case Hls.ErrorDetails.KEY_LOAD_TIMEOUT:
          this.addErrorMessage('Timeout while loading key ' + data.frag.decryptdata.uri)
          break
        case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
          this.addErrorMessage('Buffer append error')
          break
        case Hls.ErrorDetails.BUFFER_ADD_CODEC_ERROR:
          this.addErrorMessage('Buffer add codec error for ' + data.mimeType + ':' + data.err.message)
          break
        case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
          this.addErrorMessage('Buffer appending error')
          break
        case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
          this.addErrorMessage('Buffer stalled error')
          break
        default:
          break
      }
      if (data.fatal) {
        var errorMessage = 'Fatal error :' + JSON.stringify(data.details)
        console.error(errorMessage)
        this.addErrorMessage(errorMessage)
        switch (data.type) {
          case Hls.ErrorTypes.MEDIA_ERROR:
            this.handleMediaError()
            break
          case Hls.ErrorTypes.NETWORK_ERROR:
            this.addErrorMessage('A network error occurred')
            break
          default:
            this.addErrorMessage('An unrecoverable error occurred')
            this.hls.destroy()
            break
        }
      }
    })
  }
}

const hlsPlayer = new HlsPlayer()
hlsPlayer.initPlayer()
