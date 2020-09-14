# Test results for dash.js on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#1](issues.md#issue-1)) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#1](issues.md#issue-1)) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) | ✔️ |

More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#1](issues.md#issue-1)) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌([#1](issues.md#issue-1)) | ✔️ |

More details about issues [here](issues.md).
