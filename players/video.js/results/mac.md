# Test results for Video.js on MacOS (v10.15.5)

Tested on ![chrome](../../icons/chrome.png)Chrome(v83.0.4103.97) and ![safari](../../icons/safari.png)Safari (v13.1.1).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![chrome](../../icons/chrome.png)![safari](../../icons/safari.png)  Only supported for these browsers

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | ❌ | Not tested | ❌ | ✔️ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | ❌ | Not tested | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ![chrome](../../icons/chrome.png) | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | ❌ | Not tested | ❌ | ![safari](../../icons/safari.png) |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | ❌ | ❌ | ❌ | ❌ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ❌ | ❌ | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | ❌ | Not tested | ❌ |
| DASH CMAF | ![safari](../../icons/safari.png) | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | ❌ | Not tested | ❌ |

