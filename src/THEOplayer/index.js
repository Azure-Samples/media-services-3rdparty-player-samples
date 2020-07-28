import BasePlayer from '../js/common.js'

var type = '';

class TheoPlayer extends BasePlayer {
  initPlayer () {
    if ( document.getElementById('manifestInput').value == "" ) {
      document.getElementById('manifestInput').value = "//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8";
    }

    var element = document.querySelector(".theoplayer-container");
    var player = new THEOplayer.Player(element, {
        libraryLocation: "//cdn.theoplayer.com/dash/theoplayer/"
    });

    if ( document.getElementById('manifestInput').value.indexOf('.m3u8') !== -1 ) {
        type = 'application/x-mpegurl';
    } else if ( document.getElementById('manifestInput').value.indexOf('.mpd') !== -1 ) {
        type = 'application/dash+xml';
    } else {
        type = '';
    }

    if (this.playReadyLicenseUrl || this.widevineLicenseUrl || this.fairPlayCertificate) {
      if (type == 'application/x-mpegurl') {
          let drmConfiguration = {
              "integration": "azure",
              "token": document.getElementById('tokenInput').value,
              "fairplay": {
                  "licenseAcquisitionURL": document.getElementById('fairPlayInput').value,
                  "certificateURL": document.getElementById('fairPlayCertificateInput').value
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
              "token": document.getElementById('tokenInput').value,
              "playready": {
                  "licenseAcquisitionURL": document.getElementById('playReadyInput').value
              },
              "widevine": {
                  "licenseAcquisitionURL": document.getElementById('widevineInput').value
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