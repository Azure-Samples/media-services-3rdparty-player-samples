# Media Services 3rd Party Player Samples - THEOplayer

- [Overview](#overview)
- [Implementation reference sample](#implementation-reference-sample)
- [Test results](#test-results)

## Overview

THEOplayer is a Universal Video Player solution, that enables online media companies and enterprises worldwide to quickly bring a consistent video playback experience across any device or platform through its feature-rich SDKs and a wide variety of video ecosystem pre-integrations.

Its official documentation can be found [here](https://docs.portal.theoplayer.com/ "THEOplayer documentation").

There is also a THEOplayer [landing page](https://azure.microsoft.com/en-us/blog/azure-media-services-announces-new-collaboration-with-theoplayer/ "Azure Media Services collaboration with THEOplayer") for Azure Media Services customers to help you get started. Here you can insert the streaming URLs you get from the Microsoft Azure Management portal and see them in action.

For detailed instructions on how to implement the player, see [How to use THEOplayer with Azure Media Service](how-to-THEOplayer.md)

------------

## Implementation reference sample

For an implementation reference sample please check the following [link](../../src/THEOplayer) which contains an implementation of THEOplayer.

------------

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).

- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).

- ❌ No scenario is supported.

### Windows 10 v2004

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![safari](../icons/safari.png) Safari (v77.0.1+)
- ![newedge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![edge](../icons/edge.png) Edge (v44.18362.449.0+)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/windows.md)

### macOS Catalina v10.15.6

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![newedge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![safari](../icons/safari.png) Safari (v77.0.1+)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | ✔️ | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/macOS.md)

### Android v9

Tested on:

- ![android](../icons/android.png) Android SDK (v9)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/android.md)

### AndroidTV v9

Tested on:

- ![android](../icons/android.png) Android SDK (v9)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/androidTV.md)

### iOS v13.6

Tested on:

- ![safari](../icons/safari.png)
- ![chrome](../icons/chrome.png)
- ![iOS SDK](../icons/ios.png)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/ios.md)

### tvOS v13.4.8

Tested on:

- ![tvOS](../icons/tvos.png) tvOS SDK (v13.4.8)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ⚠️ | Not applicable | Not applicable | ⚠️  | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ⚠️ | Not  applicable | Not applicable | ⚠️  | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/tvOS.md)

### ipadOS v13.6

Tested on:

- ![safari](../icons/safari.png)
- ![chrome](../icons/chrome.png)
- ![ipadOS](../icons/ipados.png)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/ipadOS.md)

### webOS v3.0

Tested on:

- ![webOS](../icons/webos.png) webOS SDK (v3.0)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | Not applicable  | Not applicable | Not applicable | Not applicable | ⚠️ | ✔️ |
| HLS CMAF  | ⚠️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/webOS.md)

### Tizen v4.0

Tested on:

- ![tizen](../icons/tizen.png) tizen SDK (v4.0)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | Not  applicable  | Not applicable | Not applicable | Not applicable  | ⚠️ | ✔️ |
| HLS CMAF  | ⚠️ | Not  applicable | Not  applicable | Not applicable | Not applicable  | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/tizen.md)

### Ubuntu v18.04.4 LTS

Tested on:

- ![edge-new](../icons/edge-new.png)
- ![chrome](../icons/chrome.png)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | ⚠️ | Not applicable | ⚠️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | ⚠️ | Not applicable | ⚠️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ⚠️ | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | ⚠️ | Not applicable | ⚠️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | ⚠️ | Not applicable | ⚠️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ⚠️ | Not applicable | ⚠️ | ✔️ |

[More details](./results/ubuntu.md)

### chromecast v2.0

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| HLS CMAF  | ✔️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/chromecast.md)