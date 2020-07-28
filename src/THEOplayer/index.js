import BasePlayer from '../js/common.js'

var type = '';

class TheoPlayer extends BasePlayer {
  initPlayer () {
    if ( this.manifest == "" ) {
      this.manifest = "//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8";
    }

    var element = document.querySelector(".theoplayer-container");
    var player = new THEOplayer.Player(element, {
        libraryLocation: "//cdn.theoplayer.com/dash/theoplayer/"
    });

    if ( this.manifest.indexOf('.m3u8') !== -1 ) {
        type = 'application/x-mpegurl';
    } else if ( this.manifest.indexOf('.mpd') !== -1 ) {
        type = 'application/dash+xml';
    } else {
        type = '';
    }

    if (this.playReadyLicenseUrl || this.widevineLicenseUrl || this.fairPlayCertificate) {
      if (type == 'application/x-mpegurl') {
          let drmConfiguration = {
              "integration": "azure",
              "token": this.tokenInput,
              "fairplay": {
                  "licenseAcquisitionURL": this.fairPlayInput,
                  "certificateURL": this.fairPlayCertificateInput
              }
          };
          player.source = {
              "sources": {
                  "src": this.manifest,
                  "type": type,
                  "contentProtection": drmConfiguration
              }
          }
      } else if (type == 'application/dash+xml') {
          let drmConfiguration = {
              "integration": "azure",
              "token": this.tokenInput,
              "playready": {
                  "licenseAcquisitionURL": this.playReadyInput
              },
              "widevine": {
                  "licenseAcquisitionURL": this.widevineInput
              }
          };
          player.source = {
            "sources": {
                "src": this.manifest,
                "type": type,
                "contentProtection": drmConfiguration
            }
          }
      }
    } else {
        player.source = {
          "sources": {
            "src": this.manifest,
            "type": type
          }
        }
    }
  }
}

const theoPlayer = new TheoPlayer()
theoPlayer.initPlayer()