# Media Services 3rd Party Player Samples - Shaka Player

- [Overview](#overview)
- [Implementing the player](#implementing-the-player)
  - [Setup captions](#setup-captions)
  - [Setup token authentication](#setup-token-authentication)
  - [Setup AES-128 encryption](#setup-aes-128-encryption)
  - [Setup DRM protection](#setup-drm-protection)
- [Implementation reference](#implementation-reference)
- [Test results](#test-results)

## Overview

Shaka Player is an open-source JavaScript library for adaptive media. It plays adaptive media formats (such as DASH and HLS) in a browser, without using plugins or Flash. Instead, Shaka Player uses the open web standards MediaSource Extensions and Encrypted Media Extensions.

We recommend using it with [Mux.js](https://github.com/videojs/mux.js/) in order to maximize HLS compatibility. Without Mux.js the player would support HLS CMAF format, but not HLS TS.

Its official documentation can be found [here](https://shaka-player-demo.appspot.com/docs/api/tutorial-welcome.html).

Shaka DRM documentation: [here](https://shaka-player-demo.appspot.com/docs/api/tutorial-drm-config.html)

For detailed instructions on how to implement the player, see [How to use the Shaka player with Azure Media Services](https://docs.microsoft.com/azure/media-services/latest/how-to-shaka-player).

## Implementation reference sample

For an implementation reference sample, see [the shaka src folder](./src/shaka) which contains a complete implementation of a Shaka Player.

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).

- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).

- ❌ No scenario is supported.

### Windows 10 v1909+

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![Mew Edge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![Edge](../icons/edge.png) Edge (v44.18362.449.0+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/windows.md)

### macOS v10.15.5+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Safari](../icons/safari.png) Safari (v13.1.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ❌ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ✔️ | ⚠️ | ✔️ | Not applicable | Not applicable | ❌ | ✔️ |

[More details](./results/macOS.md)

### Ubuntu v18.04.3 LTS+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v79.0.3945.130+)
- ![Firefox](../icons/firefox.png) Firefox (v76.0.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/ubuntu.md)

### Android v8+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/android.md)

### iOS v13.5.1+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.88+)
- ![Safari](../icons/safari.png) Safari (v13.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | Not tested | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ |  Not applicable | Not applicable | Not applicable | ❌ | ✔️ |

[More details](./results/iOS.md)
