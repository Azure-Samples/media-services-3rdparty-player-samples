# Media Services 3rd Party Player Samples - Video.js

- [Overview](#overview)
- [Implementing the player](#implementing-the-player)
  - [Set up captions](#set-up-captions)
  - [Set up token authentication](#set-up-token-authentication)
  - [Set up AES-128 encryption](#set-up-aes-128-encryption)
  - [Set up DRM protection](#set-up-drm-protection)
- [Implementation reference](#implementation-reference)
- [Test results](#test-results)

## Overview

Video.js is a web video player built from the ground up for an HTML5 world. It plays adaptive media formats (such as DASH and HLS) in a browser, without using plugins or Flash. Instead, Video.js uses the open web standards MediaSource Extensions and Encrypted Media Extensions. Moreover, it supports video playback on desktops and mobile devices.

Its official documentation can be found [here](https://docs.videojs.com/ "Video.js documentation").

------------

## Implementing the player

1. Create an `index.html` file where you'll host the player. Add the following lines of code (you can replace the versions for newer if applicable):

    ```html
    <html>
      <head>
        <link href="https://vjs.zencdn.net/7.8.2/video-js.css" rel="stylesheet" />
      </head>
      <body>
        <video id="video" class="video-js vjs-default-skin vjs-16-9" controls data-setup="{}">
        </video>

        <script src="https://vjs.zencdn.net/7.8.2/video.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/videojs-contrib-eme@3.7.0/dist/videojs-contrib-eme.min.js"></script>
        <script type="module" src="index.js"></script>
      </body>
    <html>
    ```

2. Add an `index.js` file with the following code:

    ```javascript
    var videoJS = videojs("video");
    videoJS.src({
      src: "manifestUrl",
      type: "protocolType",
    });
    ```

3. Replace `manifestUrl` with the manifest URL of your choice.

4. Replace `protocolType` with the following options:

- "application/x-mpegURL" for HLS protocols
- "application/dash+xml" for DASH protocols

### Set up captions

Run the `addRemoteTextTrack` method, and replace:

- `subtitleKind` with either `"captions"`, `"subtitles"`,`"descriptions"`,  or `"metadata"`  
- `caption` with the .vtt file path (vtt file needs to be in the same host to avoid CORS error)
- `subtitleLang` with the BCP 47 code for language, e.g. `"eng"` for English or `"es"` Spanish
- `subtitleLabel` with your desired display name of caption

```javascript
videojs.players.video.addRemoteTextTrack({
  kind: subtitleKind,
  src: caption,
  srclang: subtitleLang,
  label: subtitleLabel
});
```

### Set up token authentication

The token must be set in the authorization field of the request's header. In order to avoid problems with CORS, this token must be set only in those requests with `'keydeliver'` in its URL. The following code lines should do the work:

```javascript
setupTokenForDecrypt (options) {
  if (options.uri.includes('keydeliver')) {
    options.headers = options.headers || {}
    options.headers.Authorization = 'Bearer=' + this.getInputToken()
  }

  return options
}
```

Then, the above function must be attached to the `videojs.Hls.xhr.beforeRequest` event.

```javascript
videojs.Hls.xhr.beforeRequest = setupTokenForDecrypt;
```

### Set up AES-128 encryption

Video.js supports AES-128 encryption without any additional configuration. Please note that there's currently an [issue](https://github.com/videojs/video.js/issues/6717) with encryption and HLS/DASH CMAF content, which are not playable.

### Set up DRM protection

In order to support DRM protection, you must add the [videojs-contrib-eme](https://github.com/videojs/videojs-contrib-eme) official extension; a CDN version works as well.

1. In the `index.js` file detailed above, you must initialize the EME extension by adding `videoJS.eme();` *before* adding the source of the video:

   ```javascript
    videoJS.eme();
   ```

2. Now you can define the URLs of the DRM services, and the URLs of the corresponding licenses as follows:

   ```javascript
   videoJS.src({
       keySystems: {
           "com.microsoft.playready": "YOUR PLAYREADY LICENSE URL",
           "com.widevine.alpha": "YOUR WIDEVINE LICENSE URL",
           "com.apple.fps.1_0": {
            certificateUri: "YOUR FAIRPLAY CERTIFICATE URL",
            licenseUri: "YOUR FAIRPLAY LICENSE URL"
           }
         }
       })

   ```

#### Acquiring the license URL

In order to acquire the license URL, you can:

- Consult your DRM provider configuration
- or, consult the `output.json` document generated when you previously ran the [setup-vod.ps1](../../setup#setup-vodps1) for VODs, or [start-live.ps1](../../setup#start-liveps1) for live streams; you'll also find the KIDs inside this file.

#### Using tokenized DRM

In order to support tokenized DRM protection, you have to add the following line to the `src` property of the player:

```javascript
videoJS.src({
src: ...,
emeHeaders: {'Authorization': "Bearer=" + "YOUR TOKEN"},
keySystems: {...
```

## Implementation reference

For an implementation reference sample please check the following [link](../../src/video.js) which contains a complete implementation of a Video.js Player.

------------

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).

- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).

- ❌ No scenario is supported.

### Windows 10 v1909+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![newedge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![edge](../icons/edge.png) Edge (v44.18362.449.0+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not applicable | ⚠️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/windows.md)

### macOS v10.15.5+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![safari](../icons/safari.png) Safari (v13.1.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ![chrome](../icons/chrome.png) | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ![chrome](../icons/chrome.png) | Not applicable | Not applicable | ❌ | ✔️ |

[More details](./results/macOS.md)

### Ubuntu v18.04.3 LTS+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v79.0.3945.130+)
- ![firefox](../icons/firefox.png) Firefox (v76.0.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ✔️ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ❌ | Not applicable | ❌ | ✔️ |

[More details](./results/ubuntu.md)

### Android v8+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ⚠️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ⚠️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ❌ | Not applicable | ❌ | ✔️ |

[More details](./results/android.md)

### iOS v13.5.1+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.88+)
- ![safari](../icons/safari.png) Safari (v13.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ❌ |

[More details](./results/iOS.md)
