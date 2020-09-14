import BasePlayer from '../js/common.js'

class DashPlayer extends BasePlayer {
  async initPlayer () {
    var video
    var player
    var url = this.manifest
    const protData = {}

    video = document.querySelector('video')

    if (this.caption) {
      document.getElementById('inputvtt').src = this.caption
    }

    var headers = {}
    if (this.token) {
      headers = {
        authorization: 'Bearer=' + this.token
      }
    }

    if (this.widevineLicenseUrl) {
      Object.assign(protData, {
        'com.widevine.alpha': {
          serverURL: this.widevineLicenseUrl,
          httpRequestHeaders: headers,
          withCredentials: false,
          priority: 0
        },
        'com.microsoft.playready': {
          serverURL: this.widevineLicenseUrl
        }
      })
    }

    if (this.playReadyLicenseUrl) {
      Object.assign(protData, {
        'com.microsoft.playready': {
          serverURL: this.playReadyLicenseUrl,
          httpRequestHeaders: headers,
          withCredentials: false
        }
      })
    }
    var TTMLRenderingDiv = document.querySelector('#ttml-rendering-div')
    player = dashjs.MediaPlayer().create()
    player.initialize(video, url, this.autoPlay === 'true')

    player.on(dashjs.MediaPlayer.events.ERROR, (e) => this.showEvent('ERROR', e))
    if (this.logLevel > 2) {
      player.on(dashjs.MediaPlayer.events.LOG, (e) => this.showEvent('INFO', e))
    }
    if (this.logLevel > 3) {
      for (var playerEvent in dashjs.MediaPlayer.events) {
        if (playerEvent === 'ERROR' || playerEvent === 'LOG') {
          continue
        }

        player.on(dashjs.MediaPlayer.events[playerEvent], (e) => this.showEvent('DEBUG', e))
      }
    }

    player.setTextDefaultEnabled(true)
    player.attachTTMLRenderingDiv(TTMLRenderingDiv)
    player.setProtectionData(protData)
  }

  showEvent (playerEvent, e) {
    var message = ''

    for (var name in e) {
      if (typeof e[name] !== 'object') {
        message += '    ' + name + ': ' + e[name]
      }
    }

    for (name in e) {
      if (typeof e[name] === 'object') {
        var mns1 = '\n    ' + name + ':'
        message += mns1
        for (var name2 in e[name]) {
          message += '\n        ' + name2 + ': ' + JSON.stringify(e[name][name2])
        }
      }
    }

    this.addMessage(playerEvent, message)
  }

  getPlayerInfo () {
    return `dash.js v${dashjs.Version}`
  }

  getPluginsInfo () {
    const plugins = []
    return plugins
  }
}

const dashPlayer = new DashPlayer()
dashPlayer.initPlayer()
