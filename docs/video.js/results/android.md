# Test results for Video.js on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ None browsers supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ![firefox](../../icons/firefox.png) | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ![chrome](../../icons/chrome.png) |
| DASH CMAF | ✔️ | ✔️ | ❌ | ✔️ | Not applicable | Not applicable | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ❌ |
| HLS CMAF  | ❌ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ❌ |
| DASH CMAF | ![firefox](../../icons/firefox.png) | ![firefox](../../icons/firefox.png) | ❌ | ![firefox](../../icons/firefox.png) | Not applicable | Not applicable | ❌ | ❌ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  | ❌ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ |
| DASH CMAF | ❌ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ |
