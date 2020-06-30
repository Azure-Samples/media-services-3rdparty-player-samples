# Media Services 3rd Party Player Sample - Shaka Player

[Overview](#overview)

- [How to use](#how-to-use)
  - [Setup development environment](#setup-development-environment)
  - [Basic usage of sample](#basic-usage-of-sample)
  - [Custom setup of player](#custom-setup-of-player)
    - [Setup VOD captions](#setup-vod-captions)
    - [Setup Live stream captions](#setup-live-stream-captions)
    - [Setup Token Authentication](#setup-token-authentication)
    - [Setup AES-128 encryption](#setup-aes-128-encryption)
    - [Setup DRM Protection](#setup-drm-protection)
- [Test results](#test-results)

## Overview

Shaka Player is an open-source JavaScript library for adaptive media. It plays adaptive media formats (such as DASH and HLS) in a browser, without using plugins or Flash. Instead, Shaka Player uses the open web standards MediaSource Extensions and Encrypted Media Extensions.

We recommend using it with [Mux.js](https://github.com/videojs/mux.js/) in order to maximize HLS compatibility. Without Mux the player would support HLS CMAF format, but not HLS TS.

Its official documentation can be found [here](https://shaka-player-demo.appspot.com/docs/api/tutorial-welcome.html "Shaka player documentation").

------------

## How to use

### Setup development environment

- Install [NodeJS v8+](https://nodejs.org/en/download/ "NodeJS v8+")

### Basic usage of sample

1. Clone this repository.
2. Navigate through the console to the example's folder (src/) and run `npx http-server`.
3. Open the browser of your choice, and go to `http://localhost:8080/`.
4. Copy the link to your manifest URL, and paste it in the `Manifest URL` field and click `Load Stream`.

**Your video is now loaded.**

### Custom setup of player

Follow these instructions if you need to setup your own instance of the player.

1. Create an `index.html` file where you'll host the player. Add the following lines of code (you can replace the versions for newer if applicable):

    ```html
    <html>
      <head>
        <script src="//cdn.jsdelivr.net/npm/shaka-player@3.0.1/dist/shaka-player.compiled.js"></script>
        <script src="//cdn.jsdelivr.net/npm/mux.js@5.6.3/dist/mux.js"></script>
        <script type="module" src="index.js"></script>
      </head>
      <body>
        <video id="video" controls></video>
      </body>
    </html>
    ```

2. Add a JavaScript file with the following code:

    ```javascript
    // myScript.js
    shaka.polyfill.installAll();

    var video = document.getElementById('video');
    var player = new shaka.Player(video);
    window.player = player;

    var manifestUrl = 'https://amsplayeraccount-usw22.streaming.media.azure.net/00000000-0000-0000-0000-000000000000/sample-vod.ism/manifest(format=m3u8-aapl)';
    player.load(manifestUrl);
    ```

3. Replace `manifestUrl` with the manifest URL of your choice.
4. Run a server (for example with `npx http-server`) and your player should be working.

#### Setup VOD captions

Run the following lines of code, and replace `captionUrl` with your .vtt directory (vtt file needs to be in the same host to avoid CORS error), `lang` with the two letter code for language, and `type` with either `caption` or `subtitle`:

```javascript
player.configure('streaming.alwaysStreamText', true)
player.load(manifestUrl).then(function(){
        player.addTextTrack(captionUrl, lang, type, 'text/vtt');
        var tracks = player.getTextTracks();
        player.selectTextTrack(tracks[0]);
});
```

#### Setup Live stream captions

Enable captions in live stream is configured adding the following line of code:

```javascript
player.setTextTrackVisibility(true)
```

#### Setup Token Authentication

Run the following lines of code, and replace `token` with your token string:

```javascript
player.getNetworkingEngine().registerRequestFilter(function (type, request) {
  if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
    request.headers['Authorization'] = 'Bearer ' + token;
  }
});
```

#### Setup AES-128 encryption

Shaka Player does not currently support AES-128 encryption.

A link to a GitHub [issue](https://github.com/google/shaka-player/issues/850) to follow the status of this feature.

#### Setup DRM Protection

Shaka Player uses Encrypted Media Extensions (EME), which requires a secure URL to use. It means that for testing any DRM protected content it's necessary to use https. Also, because of mixed content requirements, if the site is using https, then the manifest and every segment will also need to use https too.

The order of preference for Shaka management of the URL(s) of its license server(s):

1. Clear Key config, used for debugging, should override everything else. (The application can still specify a clearkey license server.)
2. Application-configured servers, if any are present, should override anything from the manifest.
3. Manifest-provided license servers are only used if nothing else is specified.

To specify the license server URL for Widevine or PlayReady we can use the following code:

```javascript
player.configure({
  drm: {
    servers: {
      "com.widevine.alpha": "YOUR WIDEVINE LICENSE URL",
      "com.microsoft.playready": "YOUR PLAYREADY LICENSE URL"
    }
  }
});

```

All FairPlay content requires setting a server certificate. This is set in the Player configuration:

```javascript
const req = await fetch("YOUR FAIRPLAY CERTIFICATE URL");
const cert = await req.arrayBuffer();
player.configure('drm.advanced.com\\.apple\\.fps\\.1_0.serverCertificate', new Uint8Array(cert));
```

#### Documentation: [here](https://shaka-player-demo.appspot.com/docs/api/tutorial-drm-config.html "Shaka player DRM protection documentation")

------------

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).

- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).

- ❌ No scenario supported.

### Windows 10 v1909+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![newedge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![edge](../icons/edge.png) Edge (v44.18362.449.0+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/windows.md)

### macOS v10.15.5+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![safari](../icons/safari.png) Safari (v13.1.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ❌ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ✔️ | ⚠️ | ✔️ | Not applicable | Not applicable | ❌ | ✔️ |

[More details](./results/mac.md)

### Ubuntu v18.04.3 LTS+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v79.0.3945.130+)
- ![firefox](../icons/firefox.png) Firefox (v76.0.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/ubuntu.md)

### Android v8+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/android.md)

### iOS v13.5.1+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.88+)
- ![safari](../icons/safari.png) Safari (v13.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ |  Not applicable | Not applicable | Not tested | ❌ | ✔️ |

[More details](./results/ios.md)
