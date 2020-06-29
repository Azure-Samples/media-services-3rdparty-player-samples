# Media Services 3rd Party Player Sample - Video.js

[Overview](#overview)

- [How to use](#how-to-use)
  * [Setup development environment](#setup-development-environment)
  * [Basic usage of sample](#basic-usage-of-sample)
  * [Custom setup of player](#custom-setup-of-player)
    + [Setup VOD captions](#setup-vod-captions)
    + [Setup Token Authentication](#setup-token-authentication)
    + [Setup AES-128 encryption](#setup-aes-128-encryption)
    + [Setup DRM Protection](#setup-drm-protection)
      - [Acquiring the License URL](#acquiring-the-license-url)
      - [Using tokenized DRM](#using-tokenized-drm)
- [Test results](#test-results)
  * [Windows 10](#windows-10---v1909-)
  * [macOS](#macos---v10155-)
  * [Ubuntu](#ubuntu---v18043-lts-)
  * [Android](#android---v8-)
  * [iOS](#ios---v1351-)

# Overview

Video.js is a web video player built from the ground up for an HTML5 world. It plays adaptive media formats (such as DASH and HLS) in a browser, without using plugins or Flash. Instead, Video.js uses the open web standards MediaSource Extensions and Encrypted Media Extensions. Moreover, It supports video playback on desktops and mobile devices.

Its official documentation can be found [here](https://docs.videojs.com/ "Video.js documentation").

------------

# How to use

## Setup development environment
- Install [NodeJS v8+](https://nodejs.org/en/download/ "NodeJS v8+")

## Basic usage of sample
1. Clone this repository
2. Navigate through the console to the example's folder (src/) and run `npx http-server`
3. Open the browser of your choice, and go to `http://localhost:8080/`
4. Copy the link to your manifest URL, and paste it in the `Manifest URL` field and click `Load Stream`. Your video is now loaded.

## Custom setup of player

1. Create an `index.html` file where you'll host the player. Add the following lines of code (you can replace the versions for newer if applicable):

```xml
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

4. Replace `protocolType` with the folowin options:

- "application/x-mpegURL" for HLS protocols
- "application/dash+xml" for DASH protocols

### Setup VOD captions 

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

### Setup Token Authentication

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
### Setup AES-128 encryption

Video.js supports AES-128 encryption without any additional configuration. Please note that there's currently [an issue](https://github.com/videojs/video.js/issues/6717) with encryption and HLS/DASH CMAF content, which are not playable. 

### Setup DRM Protection

In order to support DRM protection, you must add the [videojs-contrib-eme](https://github.com/videojs/videojs-contrib-eme) official extension; a CDN version of it works as well. 

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

#### Acquiring the License URL

In order to acquire the license URL you can:

- Consult your DRM provider configuration
- or, consult the `output.json` document generated when you previously ran the [setup-vod.ps1](https://github.com/southworks/media-services-v3-player-frameworks-tests/tree/master/setup#setup-vodps1) for VODs, or [start-live.ps1](https://github.com/southworks/media-services-v3-player-frameworks-tests/tree/master/setup#start-liveps1) for live streams; you'll also find the KIDs inside this file.

#### Using tokenized DRM

In order to support tokenized DRM protection, you have to add the following line to the `src` property of the player:

```javascript
videoJS.src({
src: ...,
emeHeaders: {'Authorization': "Bearer=" + "YOUR TOKEN"},
keySystems: {...
```

------

# Test results

References: 

✔️ All scenarios are supported (Protocol + Browsers + VOD + Live Stream + Low Latency)

⚠️ Some scenarios may not be supported. See the notes in each case.

❌ No scenarios were supported

![chrome](../icons/chrome.png) Compatible browser

## Windows 10 - v1909+

Tested on ![newedge](../icons/edge-new.png) Edge (Chromium-based v83.0.478.50+), ![edge](../icons/edge.png) Edge(v44.18362.449.0), ![firefox](../icons/firefox.png) Firefox (v77.0.1), and ![chrome](../icons/chrome.png) Chrome(v83.0.4103.97)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | ❌ | ❌ | Not tested | ![newedge](../icons/edge-new.png)![edge](../icons/edge.png) | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ✔️ | ⚠️ | Not tested | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ⚠️ | Not tested | ❌ | ✔️ |

[More details](./results/windows.md)

## macOS - v10.15.5+

Tested on ![chrome](../icons/chrome.png) Chrome(v83.0.4103.97) and ![safari](../icons/safari.png) Safari (v13.1.1)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ![chrome](../icons/chrome.png) | ❌ | Not tested | ❌ | ✔️ |
| DASH CMAF | ✔️ | ⚠️ | ![chrome](../icons/chrome.png) | ❌ | Not tested | ❌ | ✔️ |

[More details](./results/mac.md)

## Ubuntu - v18.04.3 LTS+

Tested on ![chrome](../icons/chrome.png) Chrome(v79.0.3945.130) and ![firefox](../icons/firefox.png) Firefox (v76.0.1)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ✔️ | ❌ | Not tested | ❌ | ✔️ |
| DASH CMAF | ✔️ | ⚠️ | ⚠️ | ❌ | Not tested | ❌ | ✔️ |

[More details](./results/ubuntu.md)

## Android - v8+

Tested on ![chrome](../icons/chrome.png) Chrome(v83.0.4103.97) and ![firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | ❌ | ❌ | ❌ | ✔️ | ✔️ |
| HLS CMAF  | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ✔️ |

[More details](./results/android.md)

## iOS - v13.5.1+

Tested on ![chrome](../icons/chrome.png) Chrome (v83.0.4103.88) and ![safari](../icons/safari.png) Safari (v13.1)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | Not tested | ❌ | ❌ |

[More details](./results/ios.md)
