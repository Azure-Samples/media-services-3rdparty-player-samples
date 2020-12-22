# Test results for NexPlayer on iOS v13.5.1+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear  | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | ❌ | Not applicable | Not applicable | ❌ | ❌ | ❌ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | ✔️ | ✔️ | ❌ |
| HLS CMAF  | ✔️ | Not applicable | Not applicable | ✔️ | ❌ | ❌ |
| DASH CMAF | ❌ | Not applicable | Not applicable | ❌ | ❌ | ❌ |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not applicable | ✔️ | ❌ |
| DASH CMAF | ❌ | Not applicable | Not applicable | ❌ | ❌ |

More details about issues [here](issues.md).
