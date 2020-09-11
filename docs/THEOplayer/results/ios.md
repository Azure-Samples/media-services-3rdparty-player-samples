# Test results for THEOplayer on iOS v13.6

References:

- ✔️ All browsers and native SDK are supported.

- ❌ All browsers and native SDK are not supported.

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) ![iOS](../../icons/ios.png) Scenario supported.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

More details about issues [here](issues.md).
