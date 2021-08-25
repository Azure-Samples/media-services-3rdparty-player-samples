# Test results for NexPlayer on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![chrome](../../icons/chrome.png) ![firefox](../../icons/firefox.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not applicable | Not applicable | Not tested | ✔️ |
| DASH CMAF | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not applicable | ✔️ | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ✔️ | Not applicable | Not applicable | Not tested | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not applicable | Not tested |
| HLS CMAF  | ✔️ | Not tested | Not applicable | Not applicable | Not tested |
| DASH CMAF | ✔️ | Not tested | Not applicable | Not applicable | Not applicable |

More details about issues [here](issues.md).