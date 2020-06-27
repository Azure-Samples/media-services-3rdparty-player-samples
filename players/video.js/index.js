import BasePlayer from '../js/common.js'

const Types = {
  hlsType: 'application/x-mpegURL',
  dashType: 'application/dash+xml',
  dashCmaf: 'mpd-time-cmaf'
}

class VideojsPlayer extends BasePlayer {
  initPlayer () {
    const videoJS = videojs('video')

    const subtitleKind = 'subtitles'
    const subtitleLang = 'eng'
    const subtitleLabel = 'test'

    videojs.Hls.xhr.beforeRequest = this.setupTokenForDecrypt.bind(this)

    let typeUrl = Types.hlsType
    if (this.format === 'dash') {
      typeUrl = Types.dashType
    }

    videoJS.eme()

    if (this.playReadyLicenseUrl || this.widevineLicenseUrl || this.fairPlayCertificate) {
      videoJS.src({
        src: this.manifest,
        type: typeUrl,
        emeHeaders: { Authorization: 'Bearer=' + this.getInputToken() },
        keySystems: {
          'com.microsoft.playready': this.playReadyLicenseUrl,
          'com.widevine.alpha': this.widevineLicenseUrl,
          'com.apple.fps.1_0': {
            certificateUri: this.fairPlayCertificate,
            licenseUri: this.fairPlayLicenseUrl
          }
        }
      })
    } else {
      videoJS.src({
        src: this.manifest,
        type: typeUrl
      })
    }

    const logLevelDetailsChosen = 4

    if (logLevelDetailsChosen >= 1) {
      videojs.log.error = this.interceptLog('ERROR', videojs.log.error)
    }

    if (logLevelDetailsChosen >= 2) {
      videojs.log.warn = this.interceptLog('WARNING', videojs.log.warn)
    }

    if (logLevelDetailsChosen >= 3) {
      videojs.log.info = this.interceptLog('INFO', videojs.log.info)
    }

    if (logLevelDetailsChosen >= 4) {
      videojs.log.debug = this.interceptLog('DEBUG', videojs.log.debug)
    }

    if (this.caption) {
      videojs.players.video.addRemoteTextTrack({
        kind: subtitleKind,
        src: this.caption,
        srclang: subtitleLang,
        label: subtitleLabel
      })
    };
  }

  getInputToken () {
    return this.$('tokenInput').value
  }

  setupTokenForDecrypt (options) {
    if (options.uri.includes('keydeliver')) {
      options.headers = options.headers || {}
      options.headers.Authorization = 'Bearer=' + this.getInputToken()
    }

    return options
  }
}

const videojsPlayer = new VideojsPlayer()
videojsPlayer.initPlayer()
