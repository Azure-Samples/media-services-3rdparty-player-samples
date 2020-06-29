# Test results on Windows 10 - v1909+

Tested on ![newedge](../../icons/edge-new.png)Edge (Chromium-based v83.0.478.50+), ![edge](../../icons/edge.png)Edge(v44.18362.449.0), ![firefox](../../icons/firefox.png) Firefox (v77.0.1), and  ![chrome](../../icons/chrome.png) Chrome(v83.0.4103.97).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![edge](../../icons/edge-new.png)![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Only supported for these browsers

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌ | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ![edge](../../icons/edge-new.png)![edge](../../icons/edge.png) | Not applicable | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ❌ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ | ❌ |Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ | ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌ | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ![edge](../../icons/edge.png) | Not applicable | ❌ | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | ❌ |Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ | ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌ | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![edge](../../icons/edge.png) | Not applicable | ❌ |
