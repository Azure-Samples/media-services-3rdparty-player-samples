import BasePlayer from '../js/common.js'

class TheoPlayer extends BasePlayer {
  initPlayer () {
    document.getElementById('player-version').innerHTML = THEOplayer.version;

    //sample test stream cdn.theoplayer.com/video/elephants-dream/playlist.m3u8
    var type = '';
    var drmConfiguration = '';
    var element = document.querySelector(".theoplayer-container");
    var player = new THEOplayer.Player(element, {
        libraryLocation: "//cdn.theoplayer.com/dash/theoplayer/"
    });

    if (this.manifest) {
      if (this.manifest.indexOf('.m3u8') !== -1) {
          type = 'application/x-mpegurl';
      } else if (this.manifest.indexOf('.mpd') !== -1) {
          type = 'application/dash+xml';
      } else {
          type = '';
      }

      if (this.playReadyLicenseUrl) {
        drmConfiguration = {
            "integration": "azure",
            "token": this.token,
            "playready": {
                "licenseAcquisitionURL": this.playReadyLicenseUrl
            }
        };
      } else if (this.widevineLicenseUrl) {
          drmConfiguration = {
            "integration": "azure",
            "token": this.token,
            "widevine": {
                "licenseAcquisitionURL": this.widevineLicenseUrl
            }
        };
      } else if (this.fairPlayLicenseUrl && this.fairPlayCertificate) {
          drmConfiguration = {
              "integration": "azure",
              "token": this.token,
              "fairplay": {
                  "licenseAcquisitionURL": this.fairPlayLicenseUrl,
                  "certificateURL": this.fairPlayCertificate
              }
          };

      player.source = {
        "sources": [{
          "src": this.manifest,
          "type": type,
          "contentProtection": drmConfiguration
        }],

        // advertisement configuration
        //ads: [{
        //   "sources": "//cdn.theoplayer.com/demos/preroll.xml",
        //    "timeOffset": "start",
        //    "skipOffset": 2
        //}]

        // subtitles configuration
        textTracks : [{
          "default": true, //optional
          "kind": "subtitles", //optional - find other values at https://support.theoplayer.com/hc/en-us/articles/214350425#TextTrackDescription
          "label": "English subs", //optional - this will appear in your UI
          "src": "transcript.vtt", //path/to/your-subs-track1.vtt
          "srclang": "en"
        }]
      }

      var logEvent = function(event) {
        if (event.type == 'error') {
          this.addMessage('ERROR', event.error);
        } else {
          this.addMessage('INFO', event.type);
        }
      }.bind(this);

      [ 'currentsourcechange',
        'sourcechange',
        'durationchange',
        'ended',
        'seeking',
        'seeked',
        'waiting',
        'progress',
        'loadstart',
        'loadedmetadata',
        'loadeddata',
        'canplay',
        'play',
        'playing',
        'pause',
        'canplaythrough',
        'readystatechange',
        'volumechange',
        'representationchange',
        'manifestupdate',
        'contentprotectionsuccess',
        'error'
      ].forEach(function(e) {
          player.addEventListener(e, logEvent);
      });

      player.textTracks.addEventListener('change', function(){
          for(var t in player.textTracks){
              if (player.textTracks[t].mode === 'showing') {
                  var currentTextTrack = player.textTracks[t];
                  this.addMessage('INFO', currentTextTrack.label);
              }
          }
      }.bind(this));

    }
  }
}

const theoPlayer = new TheoPlayer()
theoPlayer.initPlayer()
