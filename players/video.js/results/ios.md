# Test results for Video.js on IOS (v13.5.1)

Tested on ![chrome](../../icons/chrome.png)Chrome (v83.0.4103.88) and ![safari](../../icons/safari.png)Safari (v13.1).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![chrome](../../icons/chrome.png) ![safari](../../icons/safari.png)  Only supported for these browsers


## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ![safari](../../icons/safari.png) | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ❌ | ❌ | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | ❌ | ❌ | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | Not tested | ❌ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
