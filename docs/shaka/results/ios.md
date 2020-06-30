# Test results for Shaka on IOS v13.5.1+

References:

- ✔️ All browsers are supported.

- ❌ None browser supported. More details [here](issues.md).

- ![safari](../../icons/safari.png) ![chrome](../../icons/chrome.png) Scenario supported in the given browser.

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ❌(#2) | Not applicable | Not applicable | Not tested | ❌(#2) | ✔️ |
| HLS CMAF  | ✔️ | ❌(#4) | ❌(#2) | ❌(#4) | Not applicable | Not tested | ❌(#2) | ✔️ |
| DASH CMAF | ❌(#4) | Not applicable | ❌(#2) | Not applicable | Not applicable | Not applicable | ❌(#2) | ❌(#4) |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable | ❌(#2) | Not applicable | Not applicable | Not tested | ❌(#2) | ❌(#12) |
| HLS CMAF  | ✔️ | ❌(#4) | ❌(#2) | ❌(#4) | Not applicable | Not tested | ❌(#2) | ❌(#12) |
| DASH CMAF | ❌(#4) | Not applicable | ❌(#2) | Not applicable | Not applicable | Not applicable | ❌(#2) | ❌(#12) |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | Not applicable | ❌(#2) | Not applicable | Not applicable | Not tested | ❌(#2) |
| HLS CMAF  | ✔️ | ❌(#4) | ❌(#2) | ❌#4) | Not applicable | Not tested | ❌(#2) |
| DASH CMAF | ❌(#4) | Not applicable | ❌(#2) | Not applicable | Not applicable | Not applicable | ❌(#2) |
