# Test results for Video.js on IOS v13.5.1+

References:

- ✔️ All browsers are supported.

- ❌ None browser supported. More details [here](issues.md).

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ![safari](../../icons/safari.png) | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌(#4) | ❌(#3) | ❌(#4) | Not applicable | Not tested | ❌(#3) | ✔️ |
| DASH CMAF | ❌(#4) | Not applicable | ❌(#3) | Not applicable | Not applicable | Not applicable | ❌(#3) | ❌(#4) |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌(#4) | ❌(#3) | ❌(#4) | Not applicable | Not tested | ❌(#3) | ✔️ |
| DASH CMAF | ❌(#4) | Not applicable | ❌(#3) | Not applicable | Not applicable | Not applicable | ❌(#3) | ❌(#4) |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ❌(#3) | Not applicable | Not applicable | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ❌(#4) | ❌(#3) | ❌(#4) | Not applicable | Not tested | ❌(#3) |
| DASH CMAF | ❌(#4) | Not applicable | ❌(#3) | Not applicable | Not applicable | Not applicable | ❌(#3) |
