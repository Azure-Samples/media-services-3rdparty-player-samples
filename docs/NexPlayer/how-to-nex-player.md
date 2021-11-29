
# How to use the NexPlayer player with Azure Media Service

## Overview

The NexPlayer HTML5 Player is a fully customizable media player that enables HLS and MPEG-DASH streaming with broadcast quality video across all platforms, browsers and devices. Premium OTT services can now provide an outstanding user experience thanks to a flexible feature set including the latest playback capabilities, advanced DRM content protection and advertisements like client-side ad insertion (CSAI) with VPAID, VMAP, VAST and server-side ad insertion (SSAI). 

Its official documentation can be found [here](https://nexplayer.github.io/NexPlayer_HTML5_Documentation/#/).

## Sample code

Sample code for this article is available at [Azure-Samples/media-services-3rdparty-player-samples](https://github.com/Azure-Samples/media-services-3rdparty-player-samples)

## Implementing the player

1. Create an `index.html` file where you'll host the player. Add the following lines of code (you can replace the versions for newer if applicable):


     ```html
    <html>
      <body>
          <div id="player"></div>
          <script src="https://nexplayer.nexplayersdk.com/latest/nexplayer.js"></script>
          <script type="module" src="index.js"></script>
      </body>
    <html>
    ```

2. Add an `index.js` file with the following code:

    ```javascript
    nexplayer.Setup({
    key:  'azure key',
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

    ```

### Set up captions

Supported Platforms
Online progressive download (MP4) is supported on any platform. The support for DASH and HLS, and associated DRMs, changes depending on each browser and platform. The platforms listed below are being continuously tested.

#### Widevine

Is a DRM powered by Google, available on Chrome and Firefox (on Android and desktop), Opera, MS Edge and IE (on desktop). It can be set by entering the appropriate information into the DRM array:

```javascript
nexDrm = {
            NexDRMType:'com.widevine.alpha',
            NexDRMKey: this.widevineLicenseUrl,
            NexHeaders:[{FieldName: this.FieldNameCertificate, 
                        FiledValue: this.FiledValueCertificate,
                        }]
            }

```

#### Playready

A DRM powered by Microsoft, available on Edge and Internet Explorer (on Windows). It can be used by entering the appropriate information into the DRM array:

```javascript
nexDrm={
            NexDRMType:'com.microsoft.playready',
            NexDRMKey: this.playReadyLicenseUrl,
            NexHeaders:[{FieldName: this.FieldNameCertificate, 
                        FiledValue: this.FiledValueCertificate,
                        }]
        }
```

#### FairPLay

Is a DRM powered by Apple, it’s available on Safari (on macOS and iOS). When using FairPlay the license must be manually requested, adapting it to the specified FairPlay server implementation. It can be used by entering the information into the DRM array:

```javascript
  nexDrm={
            NexDRMType:'com.apple.fps.1_0',
            NexDRMKey: this.fairPlayCertificate,
            drm: [licenseRequestReady]
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

```

#### AES
NexPlayer™ supports HLS content encrypted with the AES-128 algorithm. If the key is transported inside the HLS manifest itself, it will automatically work without any modification on the developer’s side.
Please note that this method is not as secure as other DRMs.
AES is supported with HLS
