# Test results for NexPlayer on macOS v10.15.6+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) ![edge-new](../../icons/edge-new.png) ![safari](../../icons/safari.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Captions |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | ![safari](./assets/safari.png) | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ![chrome](./assets/chrome.png) ![firefox](./assets/firefox.png) ![newedge](./assets/edge-new.png) | Not applicable | ![safari](./assets/safari.png) | Not tested | ✔️ |
| DASH CMAF | ![chrome](./assets/chrome.png) ![firefox](./assets/firefox.png) ![newedge](./assets/edge-new.png) | ![chrome](./assets/chrome.png) ![firefox](./assets/firefox.png) ![newedge](./assets/edge-new.png) | Not applicable | Not applicable | Not applicable | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | ![safari](./assets/safari.png) | ✔️ | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ![chrome](./assets/chrome.png) ![firefox](./assets/firefox.png) ![newedge](./assets/edge-new.png) | Not applicable | ![safari](./assets/safari.png) | Not tested | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ![chrome](./assets/chrome.png) ![firefox](./assets/firefox.png) ![newedge](./assets/edge-new.png) | ![chrome](./assets/chrome.png) ![firefox](./assets/firefox.png) ![newedge](./assets/edge-new.png) | Not applicable | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) |


More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: |
| HLS TS    | ✔️ | Not tested | Not applicable | Not tested | Not tested | 
| HLS CMAF  | ✔️ | Not tested | Not applicable | Not tested | Not tested | 
| DASH CMAF | ✔️ | Not tested | Not applicable | Not applicable | Not applicable | 

More details about issues [here](issues.md).