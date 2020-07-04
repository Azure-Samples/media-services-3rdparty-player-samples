# Test results for Video.js on iOS v13.5.1+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested  | ![safari](../../icons/safari.png) | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌([#4](issues.md#issue-4)) | ❌([#3](issues.md#issue-3)) | ❌([#4](issues.md#issue-4)) | Not applicable | Not tested | ❌([#3](issues.md#issue-3)) | ✔️ |
| DASH CMAF | ❌([#4](issues.md#issue-4)) | Not applicable | ❌([#4](issues.md#issue-4)) | Not applicable | Not applicable | Not applicable | ❌([#4](issues.md#issue-4)) | ❌([#4](issues.md#issue-4)) |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested  | ✔️ | Not applicable | Not applicable | Not tested | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌([#4](issues.md#issue-4)) | ❌([#3](issues.md#issue-3)) | ❌([#4](issues.md#issue-4)) | Not applicable | Not tested | ❌([#3](issues.md#issue-3)) | ✔️ |
| DASH CMAF | ❌([#4](issues.md#issue-4)) | Not applicable | ❌([#4](issues.md#issue-4)) | Not applicable | Not applicable | Not applicable | ❌([#4](issues.md#issue-4)) | ❌([#4](issues.md#issue-4)) |

More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not tested  | ❌([#3](issues.md#issue-3)) | Not applicable | Not applicable | Not tested | ✔️ |
| HLS CMAF  | ✔️ | ❌([#4](issues.md#issue-4)) | ❌([#3](issues.md#issue-3)) | ❌([#4](issues.md#issue-4)) | Not applicable | Not tested | ❌([#3](issues.md#issue-3)) |
| DASH CMAF | ❌([#4](issues.md#issue-4)) | Not applicable | ❌([#4](issues.md#issue-4)) | Not applicable | Not applicable | Not applicable | ❌([#4](issues.md#issue-4)) |

More details about issues [here](issues.md).
