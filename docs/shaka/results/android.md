# Test results for Shaka on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ❌([#2](issues.md#issue-2)) | Not applicable | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#2](issues.md#issue-2)) | ❌([#1](issues.md#issue-1)) | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#2](issues.md#issue-2)) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ❌([#2](issues.md#issue-2)) | Not applicable | Not applicable | Not applicable| ❌([#2](issues.md#issue-2)) | ❌([#12](issues.md#issue-12)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#2](issues.md#issue-2)) | ❌([#1](issues.md#issue-1)) | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) | ❌([#12](issues.md#issue-12)) |
| DASH CMAF | ✔️ | ![chrome](../../icons/chrome.png) | ❌([#2](issues.md#issue-2)) | ![chrome](../../icons/chrome.png) | Not applicable| Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |

More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ❌([#2](issues.md#issue-2)) | Not applicable | Not applicable | Not applicable| ❌([#2](issues.md#issue-2)) | ✔️ |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#2](issues.md#issue-2)) | ❌([#1](issues.md#issue-1)) | Not applicable |Not applicable | ❌([#2](issues.md#issue-2)) |
| DASH CMAF | ✔️ |![chrome](../../icons/chrome.png) | ❌([#2](issues.md#issue-2)) | ![chrome](../../icons/chrome.png) | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) |

More details about issues [here](issues.md).
