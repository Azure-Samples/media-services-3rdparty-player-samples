# Test results for THEOplayer on Ubuntu v18.04.4 LTS (L3: Chrome & Chromium with Widevine CDM)

References:

- ✔️ All browsers are supported.

- ❌ No browser is supported.

- ![chrome](../../icons/chrome.png) ![edge-new](../../icons/edge-new.png) Scenario supported in the given browser.

## VOD

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |

## Live Stream

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |

## Live Stream with Low Latency

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ❌([#2](issues.md#issue-2)) | Not applicable | ❌([#2](issues.md#issue-2)) | ✔️ |
