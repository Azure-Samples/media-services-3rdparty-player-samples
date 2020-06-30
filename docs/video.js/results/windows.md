# Test results for Video.js on Windows 10 v1909+

References:

- ✔️ All browsers are supported.

- ❌ None browser supported. More details [here](issues.md).

- ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format    | Clear | DRM Token | AES-128 Token |                           Widevine                           |                          PlayReady                           | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :-------: | :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :-----: | :--------------: |
| HLS TS    |   ✔️   |     Not applicable     |       ✔️       | Not applicable  |  Not applicable |   Not applicable  |    ✔️    |        ✔️         |
| HLS CMAF  |   ✔️   |     ✔️     |       ❌(#3)       | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |             ![newedge](../../icons/edge-new.png)             | Not applicable | ❌(#3) |        ✔️         |
| DASH CMAF |   ✔️   |     ✔️     |       ❌(#3)       | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) |    Not applicable    |    ❌(#3)   |        ✔️         |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ![edge](../../icons/edge-new.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |
| HLS CMAF  | ✔️ | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌(#3) | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌(#5) | Not applicable | ❌(#3) | ❌(#7) |
| DASH CMAF | ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) | ❌(#5) | ❌(#3) | ❌(#1) | ![edge](../../icons/edge.png) | Not applicable | ❌(#3) | ❌(#7) |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format    |             Clear             |                          DRM Token                           |                        AES-128 Token                         |                           Widevine                           |           PlayReady           |  FairPlay  | AES-128 |
| --------- | :---------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :---------------------------: | :--------: | :-----: |
| HLS TS    |               ✔️               |                              Not applicable                               | ![newedge](../../icons/edge-new.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png)|  Not applicable  | Not applicable | Not applicable |    ✔️    |
| HLS CMAF  |               ✔️               | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |                              ❌(#3)                               | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |               ❌(#5)               | Not applicable |    ❌(#3)    |
| DASH CMAF | ![edge](../../icons/edge.png) |  ![edge](../../icons/edge.png)                 |                              ❌(#3)                               |                              ❌(#1)                               | ![edge](../../icons/edge.png) | Not applicable |    ❌(#3)    |
