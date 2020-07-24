# Media Services 3rd Party Player Samples - Video.js

- [Overview](#overview)
- [Implementing the player](#implementing-the-player)
- [Implementation reference sample](#implementation-reference-sample)
- [Test results](#test-results)

## Overview

Video.js is a web video player built for an HTML5 world. It plays adaptive media formats (such as DASH and HLS) in a browser, without using plugins or Flash. Video.js uses the open web standards MediaSource Extensions and Encrypted Media Extensions. It supports video playback on desktops and mobile devices.

Its official documentation can be found [here](https://docs.videojs.com/).

For detailed instructions on how to implement the player, see [How to use the Video.js player with Azure Media Services](https://docs.microsoft.com/azure/media-services/latest/how-to-video-js-player).

## Implementation reference sample

For an implementation reference sample please check the following [link](../../src/video.js) which contains a complete implementation of a Video.js Player.

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).

- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).

- ❌ No scenario is supported.

### Windows 10 v1909+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![New Edge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![Edge](../icons/edge.png) Edge (v44.18362.449.0+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not applicable | ⚠️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/windows.md)

### macOS v10.15.5+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Safari](../icons/safari.png) Safari (v13.1.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ![Chrome](../icons/chrome.png) | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ![Chrome](../icons/chrome.png) | Not applicable | Not applicable | ❌ | ✔️ |

[More details](./results/macOS.md)

### Ubuntu v18.04.3 LTS+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v79.0.3945.130+)
- ![Firefox](../icons/firefox.png) Firefox (v76.0.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ✔️ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ❌ | Not applicable | ❌ | ✔️ |

[More details](./results/ubuntu.md)

### Android v8+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ⚠️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ⚠️ |
| DASH CMAF | ⚠️ | ⚠️ | ⚠️ | ❌ | Not applicable | ❌ | ✔️ |

[More details](./results/android.md)

### iOS v13.5.1+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.88+)
- ![Safari](../icons/safari.png) Safari (v13.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ❌ |

[More details](./results/iOS.md)
