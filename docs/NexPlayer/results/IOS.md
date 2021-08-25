# Test results for NexPlayer on iOS v13.5.1+

References:

- ✔️ All browsers are supported,

- ❌ ❌ No browser is supported.

- ![chrome](../../icons/chrome.png) ![safari](../../icons/safari.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | ![safari](../../icons/safari.png) | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | Not applicable | ![safari](../../icons/safari.png) | Not tested  | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | ![safari](../../icons/safari.png) | ✔️ | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ![chrome](../../icons/chrome.png) | Not applicable | ![safari](../../icons/safari.png) | Not tested  | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not tested | Not tested |
| HLS CMAF  | ✔️ | Not tested | Not applicable | Not tested | Not tested |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

More details about issues [here](issues.md).