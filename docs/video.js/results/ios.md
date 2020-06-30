# Test results for Video.js on IOS v13.5.1+

References:

- ✔️ All browsers are supported.

- ❌ None browsers supported.

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ![safari](../../icons/safari.png) | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ❌ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not tested | ❌ | ✔️ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ❌ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not tested | ❌ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ |
