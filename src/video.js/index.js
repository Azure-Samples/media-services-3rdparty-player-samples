import BasePlayer from '../js/common.js'

const Types = {
  hlsType: 'application/x-mpegURL',
  dashType: 'application/dash+xml',
  dashCmaf: 'mpd-time-cmaf'
}

class VideojsPlayer extends BasePlayer {
  initPlayer () {

    var options = {
      html5: {
        vhs: {
         // Try to use videojs-http-streaming even on platforms that provide some level of HLS support natively. 
         // There are a number of platforms that technically play back HLS content but aren't very reliable or are
         //  missing features like CEA-608 captions support. When overrideNative is true, if the platform supports 
         // Media Source Extensions videojs-http-streaming will take over HLS playback to provide a more consistent experience. 
         // NOTE: This includes Edge browser. It has a native HLS player that will stall out if you do not do this.
          overrideNative: true
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false
      }
    };

    const videoJS = videojs('video', options, function onPlayerReady() {
      videojs.log('Your player is ready!');
    
      // How about an event listener?
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
      });
    });

    const subtitleKind = 'subtitles'
    const subtitleLang = 'eng'
    const subtitleLabel = 'test'

    videojs.Vhs.xhr.beforeRequest = this.setupTokenForDecrypt.bind(this)

    let typeUrl = Types.hlsType
    // Get a handle to the VHS tech for HLS playback. See - https://github.com/videojs/http-streaming
    var vhs = player.tech().vhs;

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

    const logLevelDetailsChosen = 1

    if (logLevelDetailsChosen >= 1) {
      videojs.log.error = this.interceptLog('ERROR')
    }

    if (logLevelDetailsChosen >= 2) {
      videojs.log.warn = this.interceptLog('WARNING')
    }

    if (logLevelDetailsChosen >= 3) {
      videojs.log.info = this.interceptLog('INFO')
    }

    if (logLevelDetailsChosen >= 4) {
      videojs.log.debug = this.interceptLog('DEBUG')
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

  setupTokenForDecrypt (options) {
    const urlLocation = this.getLocation(options.uri)
    var authentication = false

    if (this.encryptioKeyUrl && this.encryptioKeyUrl.indexOf(urlLocation.hostname) !== -1) {
      authentication = true
    }
    if (this.widevineLicenseUrl && this.widevineLicenseUrl.indexOf(urlLocation.hostname) !== -1) {
      authentication = true
    }
    if (this.fairPlayLicenseUrl && this.fairPlayLicenseUrl.indexOf(urlLocation.hostname) !== -1) {
      authentication = true
    }
    if (this.playReadyLicenseUrl && this.playReadyLicenseUrl.indexOf(urlLocation.hostname) !== -1) {
      authentication = true
    }

    if (authentication || options.uri.includes("keydeliver")) {
      options.headers = options.headers || {}
      options.headers.Authorization = 'Bearer=' + this.getInputToken()
    }
    return options
  }

  // override method
  getPlayerInfo () {
    return `Video.js v${videojs.VERSION}`
  }

  // override method
  getPluginsInfo () {
    const plugins = []
    plugins['videojs-contrib-eme'] = 'v4.0.0'
    return plugins
  }
}

const videojsPlayer = new VideojsPlayer()
videojsPlayer.initPlayer()
