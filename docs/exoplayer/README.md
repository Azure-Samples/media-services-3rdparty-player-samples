# How to use the ExoPlayer player with Azure Media Services

- [Overview](#overview)
- [Implementation reference sample](#implementation-reference-sample)
- [Test results](https://github.com/Azure-Samples/media-services-3rdparty-player-samples/tree/master/docs/video.js#test-results)

## Overview

ExoPlayer is an application level media player for Android. It provides an alternative to Android’s MediaPlayer API for playing audio and video both locally and over the Internet. ExoPlayer supports features not currently supported by Android’s MediaPlayer API, including DASH and SmoothStreaming adaptive playbacks.

Its official documentation can be found [here](https://exoplayer.dev/ "ExoPlayer documentation").

For detailed instructions on how to implement the player, see [How to use ExoPlayer with Azure Media Services](how-to-use-exoplayer.md).

------

## Implementation reference sample

For an implementation reference sample please check the following [link](https://github.com/Azure-Samples/media-services-3rdparty-player-samples/blob/master/src/exoplayer) which contains a complete implementation of a ExoPlayer.

------

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).
- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).
- ❌ No scenario is supported.

## Android - v8+

| Format    | Clear | Token | Widevine | PlayReady | FairPlay | AES-128 | Captions | Live Transcriptions | Low Latency |
| --------- | :---: | :---: | :------: | :-------: | :------: | :-----: | :------: | :-----------------: | :---------: |
| HLS TS    |   ✔️   |  NAP  |   NAP    |    NAP    |   NAP    |    ✔️    |    ✔️     |          ✔️          |      ✔️      |
| HLS CMAF  |   ✔️   |   ✔️   |    ✔️     |    NAP    |   NAP    |    ✔️    |    ✔️     |          ✔️          |      ✔️      |
| DASH CMAF |   ✔️   |   ✔️   |    ✔️     |    NAP    |   NAP    |    ❌([#1](results/issues.md#issue-1))    |    ✔️     |          ✔️          |      ✔️      |

[More details](./results/android.md)
