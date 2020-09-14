# Test results for AVPlayer on iOS v13.5.1+ emulator

References:

- ✔️ All are supported.

- ❌ None is supported.


## VOD

Preset: "AdaptiveStreaming"

| Format | Clear | DRM Token | AES-128 Token | FairPlay | AES-128 | Sidecar caption |
| ------ | :---: | :-------: | :-----------: | :------: | :-----: | :-------------: |
| HLS TS |  ✔️    |           |      ✔️       |          |    ✔️      | ❌        |
| HLS CMAF |  ✔️  |           |    ✔️         |          |     ✔️     |   ❌      |



## Live Stream

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :---: | :---: |
| HLS TS    |  ✔️    |           |     ✔️        |          |     ✔️    | ✔️      |
| HLS CMAF  |  ✔️   |           |      ✔️      |          |  ✔️      |   ✔️     |



## Live Stream with Low Latency

EncodingType: "Standard"

PresetName: "Default720p"

| Format | Clear | DRM Token | AES-128 Token | FairPlay | AES-128 |
| --------- | :---: | :---: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------: |
| HLS TS    |   ✔️   |           |      ✔️        |          |    ✔️     |
| HLS CMAF  |   ✔️   |           |      ✔️        |          |    ✔️     |
