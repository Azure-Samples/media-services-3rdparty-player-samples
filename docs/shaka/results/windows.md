# Test results for Shaka on Windows 10 v1909+

References:

- ✔️ All browsers are supported.

- ❌ None browsers supported.

- ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable | ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌ | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ![edge](../../icons/edge-new.png)![edge](../../icons/edge.png) | Not applicable | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ❌ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ | ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌ | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ![edge](../../icons/edge.png) | Not applicable | ❌ | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ |Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ | ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌ | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![edge](../../icons/edge.png) | Not applicable | ❌ |
