# Test results for NexPlayer on PlayStation5

References:

- ✔️ SDK is supported.

- ❌ SDK is not supported.

- ![PS5](../../icons/ps5.png) Scenario supported.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not applicable | Not applicable | Not tested | ✔️ |
| DASH CMAF | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | Not applicable | Not applicable | Not applicable | Not tested | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ❌([#2](issues.md#issue-2)) | Not applicable | Not applicable | Not applicable | Not tested |
| HLS CMAF  | ❌([#2](issues.md#issue-2)) | Not applicable | Not applicable | Not applicable | Not tested |
| DASH CMAF | ❌([#2](issues.md#issue-2)) | Not applicable | Not tested | Not applicable | Not applicable |

More details about issues [here](issues.md).