# How to use the AVPlayer with Azure Media Services

- [Overview](#overview)
- [Implementation reference sample](#implementation-reference-sample)
- [Test results](https://github.com/Azure-Samples/media-services-3rdparty-player-samples/tree/master/docs/video.js#test-results)

## Overview

AVPlayer is a controller object used to manage the playback and timing of a media asset on iOS. You can use an AVPlayer to play local and remote file-based media, such as QuickTime movies and MP3 audio files, as well as audiovisual media served using HTTP Live Streaming.

Its official documentation can be found [here](https://developer.apple.com/documentation/avfoundation/avplayer "AVPlayer documentation").

For detailed instructions on how to implement the player, see [How to use AVPlayer with Azure Media Services]().

------

## Implementation reference sample

For an implementation reference sample please check the following [link](../../src/avplayer) which contains a complete implementation of a AVPlayer.

------

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).
- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).
- ❌ No scenario is supported.

## iOS - 13.5.1+

| Format    | Clear | Token | FairPlay | AES-128 | Captions | Live Transcriptions | Low Latency |
| --------- | :---: | :---: | :------: | :-------: | :------: | :-----: | :------: |
| HLS TS    | ✔️ |  ✔️   |          |   ✔️     |      ❌   |                ✔️    |          ✔️  |
| HLS CMAF  | ✔️      |  ✔️     |          |   ✔️      |    ❌     |                  ✔️  |          ✔️  |

[More details](./results/ios.md)
