# Test results for hls.js on Android v8+

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | ❌([#2](issues.md#issue-2)) | ✔️ | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |

More details about issues [here](issues.md).

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ | ❌([#5](issues.md#issue-5)) |
| HLS CMAF  | ✔️ | ✔️ | ❌([#2](issues.md#issue-2)) | ✔️ | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) | ❌([#6](issues.md#issue-6)) |

More details about issues [here](issues.md).

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | ❌([#2](issues.md#issue-2)) | ✔️ | Not applicable | Not applicable | ❌([#2](issues.md#issue-2)) |

More details about issues [here](issues.md).
