# Test results for THEOplayer on webOS v3.0

References:

- ✔️ SDK is supported.

- ❌ SDK is not supported.

- ![webOS](../../icons/webos.png) Scenario supported.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#3](issues.md#issue-3)) | Not applicable  | Not applicable | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ✔️ |
| HLS CMAF  | ❌([#3](issues.md#issue-3)) | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#3](issues.md#issue-3)) | Not applicable  | Not applicable | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ✔️ |
| HLS CMAF  | ❌([#3](issues.md#issue-3)) | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |


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
