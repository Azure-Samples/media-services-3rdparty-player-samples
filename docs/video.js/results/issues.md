# Issues

## Issue #1

30 secs and then stops

The video is reproduced for around 30 secs and then it freezes. The video can not be resumed, but continues if the browser is refreshed.

- The issue is reported [here](https://github.com/videojs/http-streaming/issues/256) and it hasn't been solved yet. Also it's mentioned [here](https://github.com/videojs/http-streaming#dash-assets-with-time-interpolation-and-segmenttimelines-with-no-t).

------

## Issue #3

DASH CMAF or HLS CMAF in Video.js

An error was detected while reproducing a video in DASH CMAF or HLS CMAF in Video.js with encryption (AES-128 with token and without token).

- The issue is reported [here](https://github.com/videojs/video.js/issues/6717).

------

## Issue #4

DASH on iOS

DAHS.js (the library this plugin adapts) only works on MSE supported browsers, and iOS is not supported.

- The issue is reported [here](https://github.com/videojs/videojs-contrib-dash/issues/136).

------

## Issue #5

HLS CMAF with Widevine and PlayReady

Video.js does not reproduce HLS CMAF with Widevine and PlayReady using Azure Media Services.

- The issue is reported [here](https://github.com/videojs/video.js/issues/6733).

------

## Issue #6

Clear Live with Android

Video.js does not reproduce live stream and low latency on Android.

- The issue is reported [here](https://github.com/videojs/videojs-contrib-hls/issues/1058).

------

## Issue #7

Live streams with IMSC1 in MP4 fragments

Video.js doesn't show subtitles in live streams with DASH CMAF using IMSC1 in Mp4 fragments. The feature is not currently supported. 
Video.js will play back content that uses HLS v3 or v4 with VTT text tracks in MP4 fragments, so you can still use a live transcription feed from Azure Media Service as long as you use the /manifest(format=m3u8-aapl) version of the format tag on your streaming locator URL.

- The issue was reported [here](https://github.com/videojs/video.js/issues/6353) but has recently been closed.

------
