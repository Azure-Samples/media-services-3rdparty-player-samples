import BasePlayer from '../js/common.js'
class NexPlayer extends BasePlayer {
    
    initPlayer () {
    var player = null;
    var videoElem = null;
    var nexDrm='';
    var self=this;
    var callBackWithPlayers = function (nexplayer, videoElement) {
        player = nexplayer;
        videoElem= videoElement;
        
        videoElem.onended = function() {
            self.addMessage('INFO','The video has ended');
          };
        videoElem.onvolumechange = function() {
            self.addMessage('INFO','Volume change');
                };
        videoElem.onseeking = () => {
            self.addMessage('INFO','Seeking');
        };
        videoElem.onseeked = function() {
            self.addMessage('INFO','Seeked');
          };
        videoElem.onwaiting = function() {
            self.addMessage('INFO','Waiting');
          };
        videoElem.onprogress = function() {
            self.addMessage('INFO','Onprogress');
          };
        videoElem.onloadstart = function() {
            self.addMessage('INFO','Starting to load');
          };
        videoElem.onloadedmetadata = function() {
            self.addMessage('INFO','Metadata loaded');
          };
        videoElem.onloadeddata = function() {
            self.addMessage('INFO','Browser has loaded the current frame');
          };
        videoElem.oncanplay = function() {
            self.addMessage('INFO','Can start playing');
          };
        videoElem.oncanplaythrough = function() {
            self.addMessage('INFO','Can play through video without stopping');
          };
        videoElem.addEventListener("timeupdate",function(){
            self.addMessage('INFO','Current Time: '+videoElem.currentTime);
            if(videoElem.paused){
                self.addMessage('INFO','Paused');
            }else if(!videoElem.paused){
                self.addMessage('INFO','IsPlaying');
            }
        });

       
        
    }
    
    function licenseRequestReady (event) {
        var session = event.target;
        var message = event.message;
        var request = new XMLHttpRequest();
        var sessionId = event.sessionId;
        request.responseType = 'text'; 
        request.session = session;
        request.addEventListener('load', player.FairPlayNexLicenseRequestLoaded.bind(player), false);
        request.addEventListener('error', player.FairPlayNexLicenseRequestFailed.bind(player), false);
        var params = 'spc='+ encodeURIComponent(base64EncodeUint8Array(message)); 
        request.open('POST', this.fairPlayLicenseUrl , true);
        request.setRequestHeader("Content-type”, “application/x-www-form-urlencoded");
        request.setRequestHeader("dt-custom-data”, “Optional license token");
        request.send(params);
       }
      
    if (this.playReadyLicenseUrl) {
        nexDrm={
            NexDRMType:'com.microsoft.playready',
            NexDRMKey: this.playReadyLicenseUrl,
            NexHeaders:[{FieldName: this.FieldNameCertificate, 
                        FieldValue: this.FieldValueCertificate,
                        }]
        }
      } else if (this.widevineLicenseUrl) {
        nexDrm = {
            NexDRMType:'com.widevine.alpha',
            NexDRMKey: this.widevineLicenseUrl,
            NexHeaders:[{FieldName: this.FieldNameCertificate, 
                        FieldValue: this.FieldValueCertificate,
                        }]
            }
      } else if (this.fairPlayLicenseUrl && this.fairPlayCertificate) {
        nexDrm={
            NexDRMType:'com.apple.fps.1_0',
            NexDRMKey: this.fairPlayCertificate,
            drm: [licenseRequestReady]
        }
      }
    
    nexplayer.Setup({
    key:  'tg1tll70cg80g5fafiya2yrl',
    div: document.getElementById('player'),
    mutedAtStart: true,
    callbacksForPlayer: callBackWithPlayers,
    drm: [nexDrm],
    poster:"image/nexplayer_red.png",
    debug: false,
    autoplay: true,
    showingFullUI: true,
    useDefaultControls: true,
    src: this.manifest ,

    });

    }
      
}

const nexPlayer = new NexPlayer()
nexPlayer.initPlayer()