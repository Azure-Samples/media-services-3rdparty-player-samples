# Test results for NexPlayer on Windows 10 v1909+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) ![edge](../../icons/edge.png) ![edge-new](../../icons/edge-new.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | Not tested | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested  | Not applicable | Not applicable | ✔️ | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | Not tested | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not applicable | Not tested |
| HLS CMAF  | ✔️ | Not tested | Not applicable | Not applicable | Not tested |
| DASH CMAF | ✔️ | Not tested | Not tested | Not applicable | Not applicable |

More details about issues [here](issues.md).