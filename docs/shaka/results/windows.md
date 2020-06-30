# Test results for Shaka on Windows 10 v1909+

References:

- ✔️ All browsers are supported.

- ❌ None browser supported. More details [here](issues.md).

- ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ❌(#2) | Not applicable | Not applicable | Not applicable | ❌(#2) | ✔️ |
| HLS CMAF  | ✔️ | ❌(#1, #6) | ❌(#2) | ❌(#1) | ❌(#6) | Not applicable | ❌(#2) | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌(#2) | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![edge](../../icons/edge-new.png) ![edge](../../icons/edge.png) | Not applicable | ❌(#2) | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ❌(#2) | Not applicable | Not applicable | Not applicable| ❌(| ❌(#12) |
| HLS CMAF  | ✔️ | ❌(#1, #6) | ❌(#2) | ❌(#1) | ❌(#6) | Not applicable | ❌(#2) | ❌(#12) |
| DASH CMAF | ✔️ | ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌(#2) | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![edge](../../icons/edge.png) | Not applicable | ❌(#2) | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ❌(#2) | Not applicable | Not applicable | Not applicable| ❌(#2) | ✔️ |
| HLS CMAF  | ✔️ | ❌(#1, #6) | ❌(#2) | ❌(#1) | ❌(#6) |Not applicable | ❌(#2) | ❌(#2) |
| DASH CMAF | ✔️ | ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌(#2) | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![edge](../../icons/edge.png) | Not applicable | ❌(#2) |
