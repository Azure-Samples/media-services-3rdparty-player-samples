# Test results for ExoPlayer on Android v8+

References:

- ✔️ All are supported.

- ❌ None is supported.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ |       ✔️        | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌([#1](issues.md#issue-1)) | ✔️ | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌([#1](issues.md#issue-1)) | ✔️ | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  |   ✔️   | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌([#1](issues.md#issue-1)) | ✔️ | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) |
