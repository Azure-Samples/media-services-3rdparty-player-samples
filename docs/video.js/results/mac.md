# Test results for Video.js on MacOS v10.15.5+

References:

- ✔️ All browsers are supported.

- ❌ None browser supported. More details [here](issues.md).

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌(#3) | ![chrome](../../icons/chrome.png) | Not applicable | Not tested | ❌(#3) | ✔️ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌(#3) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌(#3) | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌(#3) | ![chrome](../../icons/chrome.png) | Not applicable | Not tested | ❌(#3) | ![safari](../../icons/safari.png) |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌(#3) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌(#3) | ❌(#7) |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌(#3) | ![chrome](../../icons/chrome.png) | Not applicable | Not tested | ❌(#3) |
| DASH CMAF | ![safari](../../icons/safari.png) | ![chrome](../../icons/chrome.png) | ❌(#3) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌(#3) |