# Media Services 3rd Party Player Samples - hls.js

- [Overview](#overview)
- [Implementation reference sample](#implementation-reference-sample)
- [Test results](#test-results)

## Overview

hls.js is a JavaScript library which implements an HTTP Live Streaming client. It relies on HTML5 video and MediaSource Extensions for playback.

It works by transmuxing MPEG-2 Transport Stream and AAC/MP3 streams into ISO BMFF (MP4) fragments. This transmuxing could be performed asynchronously using Web Worker if available in the browser. hls.js also supports HLS + fmp4, as announced during WWDC2016

hls.js does not need any player, it works directly on top of a standard HTML `<video>` element.

Its official documentation can be found [here](https://github.com/video-dev/hls.js/blob/master/docs/API.md).

For detailed instructions on how to implement the player, see [How to use the hls.js player with Azure Media Service](how-to-hls-js-player.md)

------------

## Implementation reference sample

For an implementation reference sample please check the following [link](../../src/hls.js) which contains a complete implementation of a hls.js Player.

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
| HLS TS    | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ⚠️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | ❌ | Not applicable | ❌ | ⚠️ |

[More details](./results/windows.md)

### macOS v10.15.5+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![safari](../icons/safari.png) Safari (v13.1.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ⚠️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ❌ | ⚠️ |

[More details](./results/macOS.md)

### Ubuntu v18.04.3 LTS+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v79.0.3945.130+)
- ![firefox](../icons/firefox.png) Firefox (v76.0.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ⚠️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ❌ | ⚠️ |

[More details](./results/ubuntu.md)

### Android v8+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ⚠️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ❌ | ⚠️ |

[More details](./results/android.md)

### iOS v13.5.1+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.88+)
- ![safari](../icons/safari.png) Safari (v13.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| HLS CMAF  | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

[More details](./results/iOS.md)
