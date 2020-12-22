# Test results for NexPlayer on MacOS v10.15.5+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear  | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | ✔️ | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ❌ | ❌ | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ❌ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | ✔️ | ❌ | ❌ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ❌ | ❌ | ✔️ |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | ✔️ | ✔️ | ❌ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ❌ | ❌ |

More details about issues [here](issues.md).
