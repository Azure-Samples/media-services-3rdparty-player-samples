# Test results on Windows 10 - v1909+

Tested on ![newedge](../../icons/edge-new.png)Edge (Chromium-based v83.0.478.50+), ![edge](../../icons/edge.png)Edge(v44.18362.449.0), ![firefox](../../icons/firefox.png) Firefox (v77.0.1), and  ![chrome](../../icons/chrome.png) Chrome(v83.0.4103.97).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![edge](../../icons/edge-new.png)![edge](../../icons/edge.png)![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) Only supported for these browsers

## VOD

Preset: "AdaptiveStreaming"

| Format    | Clear | DRM Token | AES-128 Token |                           Widevine                           |                          PlayReady                           | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :-------: | :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :-----: | :--------------: |
| HLS TS    |   ✔️   |     ❌     |       ✔️       |                              ❌                               |                              ❌                               |    ❌     |    ✔️    |        ✔️         |
| HLS CMAF  |   ✔️   |     ✔️     |       ❌       | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) |             ![newedge](../../icons/edge-new.png)             |    ❌     |    ❌    |        ✔️         |
| DASH CMAF |   ✔️   |     ✔️     |       ❌       | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ![newedge](../../icons/edge-new.png)![edge](../../icons/edge.png) |    ❌     |    ❌    |        ✔️         |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ✔️ | ❌ | ❌ | Not tested | ✔️ | ![edge](../../icons/edge-new.png)![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) |
| HLS CMAF  | ✔️ | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ❌ | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) | ❌ | Not tested | ❌ | ❌ |
| DASH CMAF | ![newedge](../../icons/edge-new.png)![edge](../../icons/edge.png) | ❌ | ❌ | ❌ | ![edge](../../icons/edge.png) | Not tested | ❌ | ❌ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format    |             Clear             |                          DRM Token                           |                        AES-128 Token                         |                           Widevine                           |           PlayReady           |  FairPlay  | AES-128 |
| --------- | :---------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :---------------------------: | :--------: | :-----: |
| HLS TS    |               ✔️               |                              ❌                               | ![chrome](../../icons/chrome.png)![newedge](../../icons/edge-new.png)![firefox](../../icons/firefox.png) |                              ❌                               |               ❌               | Not tested |    ✔️    |
| HLS CMAF  |               ✔️               | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) |                              ❌                               | ![firefox](../../icons/firefox.png)![chrome](../../icons/chrome.png) |               ❌               | Not tested |    ❌    |
| DASH CMAF | ![edge](../../icons/edge.png) |                ![edge](../../icons/edge.png)                 |                              ❌                               |                              ❌                               | ![edge](../../icons/edge.png) | Not tested |    ❌    |
