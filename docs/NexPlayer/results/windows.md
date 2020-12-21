# Test results for NexPlayer on Windows 10 v2004

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) ![edge](../../icons/edge.png) ![edge-new](../../icons/edge-new.png) ![safari](../../icons/safari.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear  | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️  | ✔️ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | ❌ | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"
PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ❌ |
| HLS CMAF  | ✔️ | ✔️ | ❌ | Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | ❌ | ✔️ |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"
PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | ❌ |  Not applicable | ❌ |
| DASH CMAF | ✔️ | ✔️ | ✔️ |  Not applicable | ❌ |

More details about issues [here](issues.md).
