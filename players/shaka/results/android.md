# Test results for Video.js on Android (v8+)

Tested on ![chrome](../../icons/chrome.png)Chrome(v83.0.4103.97) and ![firefox](../../icons/firefox.png)Firefox (v68.9+).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png)  Only supported for these browsers

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ❌ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ❌ | ❌ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | Not applicable| Not applicable | ❌ | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable |Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ |![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌ |
