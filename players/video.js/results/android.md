# Test results for Video.js on Android (v8+)

Tested on ![chrome](../../icons/chrome.png)Chrome(v83.0.4103.97) and ![firefox](../../icons/firefox.png)Firefox (v68.9+).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png)  Only supported for these browsers

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ❌ | ❌ | ❌ | ✔️ | ✔️ |
| HLS CMAF  | ![firefox](../../icons/firefox.png) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ![chrome](../../icons/chrome.png) |
| DASH CMAF | ✔️ | ✔️ | ❌ | ✔️ | ❌ | ❌ | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ❌ | ✔️ | ❌ |
| HLS CMAF  | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DASH CMAF | ![firefox](../../icons/firefox.png) | ![firefox](../../icons/firefox.png) | ❌ | ![firefox](../../icons/firefox.png) | ❌ | ❌ | ❌ | ❌ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ❌ | ❌ | ❌ | ✔️ |
| HLS CMAF  | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
