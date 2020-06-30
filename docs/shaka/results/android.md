# Test results for Shaka on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ None browsers supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ❌ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ❌ | ❌ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | Not applicable| Not applicable | ❌ | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable |Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ |![chrome](../../icons/chrome.png) | ❌ | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌ |
