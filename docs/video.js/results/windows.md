# Test results for Video.js on Windows 10 v1909+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format    | Clear | DRM Token | AES-128 Token |                           Widevine                           |                          PlayReady                           | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :-------: | :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :-----: | :--------------: |
| HLS TS    |   ✔️   |     Not applicable     |       ✔️       | Not applicable  |  Not applicable |   Not applicable  |    ✔️    |        ✔️         |
| HLS CMAF  |   ✔️   |     ✔️     |       ❌([#3](issues.md#issue-3))       | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |             ![newedge](../../icons/edge-new.png)             | Not applicable | ❌([#3](issues.md#issue-3)) |        ✔️         |
| DASH CMAF |   ✔️   |     ✔️     |       ❌([#3](issues.md#issue-3))       | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ![newedge](../../icons/edge-new.png) ![edge](../../icons/edge.png) |    Not applicable    |    ❌([#3](issues.md#issue-3))   |        ✔️         |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ![edge](../../icons/edge-new.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |
| HLS CMAF  | ✔️ | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌([#3](issues.md#issue-3)) | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) | ❌([#5](issues.md#issue-5)) | Not applicable | ❌([#3](issues.md#issue-3)) | ❌([#7](issues.md#issue-7)) |
| DASH CMAF | ❌([#1](issues.md#issue-1)) | ❌([#5](issues.md#issue-5)) | ❌([#3](issues.md#issue-3)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | Not applicable | ❌([#3](issues.md#issue-3)) | ❌([#7](issues.md#issue-7)) |

More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format    |             Clear             |                          DRM Token                           |                        AES-128 Token                         |                           Widevine                           |           PlayReady           |  FairPlay  | AES-128 |
| --------- | :---------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :---------------------------: | :--------: | :-----: |
| HLS TS    |               ✔️               |                              Not applicable                               | ![newedge](../../icons/edge-new.png) ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png)|  Not applicable  | Not applicable | Not applicable |    ✔️    |
| HLS CMAF  |               ✔️               | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |                             ❌ ([#3](issues.md#issue-3))                               | ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) |               ❌([#5](issues.md#issue-5))               | Not applicable |    ❌([#3](issues.md#issue-3))    |
| DASH CMAF | ❌([#1](issues.md#issue-1)) |  ❌([#1](issues.md#issue-1))                 |                             ❌ ([#3](issues.md#issue-3))                               |                              ❌([#1](issues.md#issue-1))                               | ❌([#1](issues.md#issue-1)) | Not applicable |    ❌([#3](issues.md#issue-3))    |

More details about issues [here](issues.md).
