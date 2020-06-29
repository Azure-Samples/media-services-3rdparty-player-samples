# Test results for Video.js on Ubuntu (v18.04.3 LTS)

Tested on ![chrome](../../icons/chrome.png)Chrome(v79.0.3945.130) and ![firefox](../../icons/firefox.png)Firefox (v76.0.1).

References: 

✔️ All tested browsers are supported 

❌ Not supported by any tested browsers

![firefox](../../icons/firefox.png) ![chrome](../../icons/chrome.png) Only supported for these browsers

## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ❌ | ✔️ | Not applicable | Not applicable | ❌ | ✔️ |

## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ❌ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable | Not applicable | ❌ | ❌ | ❌ |
| DASH CMAF | ✔️ | ✔️ | ❌ | ✔️ | Not applicable| Not applicable | ❌ | ✔️ |

## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | Widevine | PlayReady | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| HLS TS    | ✔️ | ❌ | ❌ | Not applicable | Not applicable | Not applicable| ❌ | ✔️ |
| HLS CMAF  | ✔️ | ❌ | ❌ | ❌ | Not applicable |Not applicable | ❌ | ❌ |
| DASH CMAF | ✔️ |✔️ | ❌ | ✔️ | Not applicable | Not applicable | ❌ |
