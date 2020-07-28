# Test results for Video.js on macOS v10.15.5+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested  | ✔️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#3](issues.md#issue-3)) | ![chrome](../../icons/chrome.png) | Not applicable | Not tested | ❌([#3](issues.md#issue-3)) | ✔️ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#3](issues.md#issue-3)) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested  | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#3](issues.md#issue-3)) | ![chrome](../../icons/chrome.png) | Not applicable | Not tested | ❌([#3](issues.md#issue-3)) | ![safari](../../icons/safari.png) |
| DASH CMAF | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#3](issues.md#issue-3)) | ❌([#1](issues.md#issue-1)) | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ❌([#7](issues.md#issue-7)) |

More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not tested  | ✔️ | Not applicable | Not applicable | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#3](issues.md#issue-3)) | ![chrome](../../icons/chrome.png) | Not applicable | Not tested | ❌([#3](issues.md#issue-3)) |
| DASH CMAF | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#3](issues.md#issue-3)) | ❌([#1](issues.md#issue-1)) | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) |

More details about issues [here](issues.md).
