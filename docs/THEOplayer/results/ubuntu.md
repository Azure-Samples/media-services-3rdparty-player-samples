# Test results for THEOplayer on Ubuntu

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) ![edge-new](../../icons/edge-new.png) Scenario supported in the given browser.

## VOD

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | Not applicable | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

## Live Stream

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | Not applicable | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | Not applicable | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

## Live Stream with Low Latency

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
