## Issue #1

Video reproduces for 30 secs and then stops. The video cannot be resumed, but continues if the browser is refreshed.

- This is a [known issue](https://github.com/videojs/http-streaming/issues/256) and it hasn't been solved yet

- There is also a mention [here](https://github.com/videojs/http-streaming#dash-assets-with-time-interpolation-and-segmenttimelines-with-no-t)

------

## Issue #3

An error was detected while reproducing a video in DASH CMAF or HLS CMAF in Video.js with encryption (AES-128 with token and without token). 

- We [reported the issue](https://github.com/videojs/video.js/issues/6717).

------

## Issue #4

DAHS.js (the library this plugin adapts) only works on MSE supported browsers, and iOS is not supported.The issues is detailed  
[here](https://github.com/videojs/videojs-contrib-dash/issues/136)


------

## Issue #5
We did not find an issues on Video.js GitHub.

------

## Issue #6

Video.js not playing on Android, more details [here](https://github.com/videojs/videojs-contrib-hls/issues/1058).

------

## Issue #7

Video.js doesn't show subtitles in live streams with DASH CMAF or HLS CMAF. Also in all browsers, we detected that HLS TS is not working. 

- The error was mentioned in two issues GitHub but it was never fixed: [GitHub Issue #1](https://github.com/videojs/video.js/issues/4300), [GitHub Issue #2](https://github.com/videojs/video.js/issues/5804)

------
