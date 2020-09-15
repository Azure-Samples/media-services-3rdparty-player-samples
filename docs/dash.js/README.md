# Media Services 3rd Party Player Samples - dash.js

- [Overview](#overview)
- [Implementation reference sample](#implementation-reference-sample)
- [Test results](#test-results)

## Overview

dash.js is an initiative of the DASH Industry Forum to establish a production quality framework for building video and audio players that play back MPEG-DASH content using client-side JavaScript libraries leveraging the Media Source Extensions API set as defined by the W3C.

Its official documentation can be found [here](https://github.com/Dash-Industry-Forum/dash.js/wiki).

For detailed instructions on how to implement the player, see [How to use the dash.js player with Azure Media Service](how-to-dash-js-player.md)

------------

## Implementation reference sample

For an implementation reference sample please check the following [link](../../src/dash.js) which contains a complete implementation of a dash.js Player.

------------

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
| DASH CMAF | ✔️ | ⚠️ | ✔️ | ✔️ | Not applicable | ❌ | ✔️ |

[More details](./results/windows.md)

### macOS v10.15.5+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Safari](../icons/safari.png) Safari (v13.1.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| DASH CMAF | ✔️ | ⚠️ | ✔️ | ⚠️ | Not applicable | ❌ | ✔️ |

[More details](./results/macOS.md)

### Ubuntu v18.04.3 LTS+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v79.0.3945.130+)
- ![Firefox](../icons/firefox.png) Firefox (v76.0.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| DASH CMAF | ✔️ | ⚠️ | ✔️ | Not applicable | ✔️ | ❌ | ✔️ |

[More details](./results/ubuntu.md)

### Android v8+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![Firefox](../icons/firefox.png) Firefox (v68.9+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| DASH CMAF | ✔️ | ⚠️ | ⚠️ | Not applicable | Not applicable | ❌ | ✔️ |

[More details](./results/android.md)

### iOS v13.5.1+

Tested on:

- ![Chrome](../icons/chrome.png) Chrome (v83.0.4103.88+)
- ![Safari](../icons/safari.png) Safari (v13.1+)

| Format | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

[More details](./results/iOS.md)
