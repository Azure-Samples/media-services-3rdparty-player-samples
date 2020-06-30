# Test results for Video.js on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ None browser supported. More details [here](issues.md).

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ![firefox](../../icons/firefox.png) | ❌(#5) | ❌(#3) | ❌(#5) | Not applicable | Not applicable | ❌(#3) | ![chrome](../../icons/chrome.png) |
| DASH CMAF | ✔️ | ✔️ | ❌(#3) | ✔️ | Not applicable | Not applicable | ❌(#3) | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ❌(#7) |
| HLS CMAF  | ❌(#6) | ❌(#5) | ❌(#3) | ❌(#5) | Not applicable | Not applicable | ❌(#3) | ❌(#7) |
| DASH CMAF | ![firefox](../../icons/firefox.png) | ![firefox](../../icons/firefox.png) | ❌(#3) | ![firefox](../../icons/firefox.png) | Not applicable | Not applicable | ❌(#3) | ❌(#7) |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  | ❌(#6) | ❌(#5) | ❌(#3) | ❌(#5) | Not applicable | Not applicable | ❌(#3) |
| DASH CMAF | ❌(#1) | ❌(#1) | ❌(#3) | ❌(#1) | Not applicable | Not applicable | ❌(#3) |
