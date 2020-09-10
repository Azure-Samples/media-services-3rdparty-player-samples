# Media Services 3rd Party Player Samples - THEOplayer

- [Overview](#overview)
- [Implementing the player](#implementing-the-player)
  - [Setup captions](#setup-captions)
  - [Setup advertisement](#setup-advertisement)
  - [Setup AES-128 encryption](#setup-aes-128-encryption)
  - [Setup DRM protection](#setup-drm-protection)
- [Implementation reference](#implementation-reference)
- [Test results](#test-results)

## Overview

THEOplayer is a Universal Video Player solution, that enables online media companies and enterprises worldwide to quickly bring a consistent video playback experience across any device or platform through its feature-rich SDKs and a wide variety of video ecosystem pre-integrations.

Its official documentation can be found [here](https://docs.portal.theoplayer.com/ "THEOplayer documentation").

There is also a THEOplayer [landing page](https://azure.microsoft.com/en-us/blog/azure-media-services-announces-new-collaboration-with-theoplayer/ "Azure Media Services collaboration with THEOplayer") for Azure Media Services customers to help you get started. Here you can insert the streaming URLs you get from the Microsoft Azure Management portal and see them in action.

------------

## Implementing the player

In this user guide we will guide you through the process of setting up THEOplayer on your website. There’s only a few things you need to get started, most of which you will already have available if you are building a website.

A webserver - This will host your webpages.
A domain name - For example `www.theoplayer.com`.
A THEOplayer license - This gives you access to the THEOplayer library and allows you to use it on the aforementioned domain.
One or more URI's to HLS stream manifests (.m3u8), or MPEG-DASH stream manifests (.mpd), of the video streams that you want to show on your website.

In this guide, we'll start from a basic HTML file, with no reference to THEOplayer. In the second step, we'll explain what the THEOplayer library is, and how you can include it, together with the default THEOplayer UI. In the third step, we'll describe how you add a THEOplayer powered video to a web page. In the fourth and final step, we'll give a final overview.


##### Setup an HTML file.

When THEOplayer is used as a web video player, we will need a webpage to put the video on.

Keep in mind that whilst .html-files can easily be opened from your local computer, this will not work with THEOplayer as THEOplayer licenses are locked to a specific domain.

From this point on, you should assume that if a piece of script is shown, it is hosted on a page in the domain of the THEOplayer license that is being used.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>THEOplayer 2.X: Getting Started</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div class="theoplayer-container video-js theoplayer-skin"></div>
    </body>
</html>
```

##### Including the THEOplayer library

THEOplayer is a lean, mean, video machine. The easiest and simplest way to use it requires just a licensed THEOplayer library for the domain you want to use THEOplayer on.

All that you need to do, is include the following line of code on your website to reference the THEOplayer library:

```javascript
<script type='text/javascript'
    src='/path/to/THEOplayer.js'>
</script>
```

Script tags are used to add code to a web page. In this case we used it to include the THEOplayer library. The two properties of the element are:

- `src` this is the URI of the THEOplayer library that you wish to use. This could be something like: /path/to/THEOplayer.js, where the url is a link to the THEOplayer.js file you received for your domain.
- `type` designates the contents of the included script to be JavaScript. While this is optional in many browsers these days, it is nonetheless advisable to put it in there anyway.

To add the THEOplayer UI, you need to reference the THEOplayer CSS file:

```css
<link rel="stylesheet" type="text/css" href='/path/to/ui.css'>
```

Link tags are used to add a CSS file to a web page.

##### The video

For THEOplayer to start playing video, it will need a manifest. In this basic guide we will display how you can set a HLS source, or a MPEG-DASH source.

Here’s the one that we will be using as an example:

```javascript
<script>
var element = document.querySelector('.theoplayer-container') // fetch THEOplayer container div

var player = new THEOplayer.Player(element, { // instantiates video player
  libraryLocation : '/path/to/your-theoplayer-folder/' // references folder containing your THEOplayer library files (theoplayer.p.js, THEOplayer.js, ...)
});

// DASH
// player.source = {
//     sources : [{
//         src : '//amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=mpd-time-csf)', // sets DASH source
//         type : 'application/dash+xml' // sets type to MPEG-DASH
//     }]
// };

// HLS
player.source = {
  sources : [{
    src : '//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8', // sets HLS source
    type : 'application/x-mpegurl' // sets type to HLS
  }]
};
</script>
```

To use a DASH source instead of a HLS source, you have to provide a DASH source to the src property, and set type to 'application/dash+xml'.

Instead of setting the UI to fluidly fit the container (or body) around it, you can also configure it with a width and height property:

```css
ui : {
  width: '800px',
  height: '500px'
}
```

##### The result

Save your `.html`, put it on a running web server and browse to it to see your video playing in THEOplayer.

------------

### Setup captions

##### Copy and paste the below function:
&nbsp;
```javascript
textTracks: [{
    "default": true, //optional
    "kind": "captions", //optional - find other values at https://support.theoplayer.com/hc/en-us/articles/214350425#TextTrackDescription
    "label": "English subs", //optional - this will appear in your UI
    "src": "transcript.vtt", //path/to/your-subs-track1.vtt
    "srclang": "en"
}]
```

2. Call the function using the language label (or 3-letter-language code if you change x.label to x.language)
&nbsp;

### Setup advertisement

##### Copy and paste the below array:
&nbsp;
```javascript
ads: [{
    "sources": "//cdn.theoplayer.com/demos/preroll.xml",
    "timeOffset": "start",
    "skipOffset": 2
}]
```

------------

### Setup AES-128 encryption

THEOplayer supports decryption and playback of HLS streams with AES-128 content protection out of the box, without extra configuration in the player. In order to play AES-128 content protected streams, the decryption key and an optional initialization vector have to be provided in the manifest. When configured correctly, THEOplayer allows playback of AES-128 content protected streams on all supported devices in real time. It allows for the usage of a single key, or a rotating key.

In order to make sure THEOplayer can decrypt the stream, make sure the following information is correct in the manifest:

If a decryption key is specified, it is relevant for all following media segments. This allows you to specify a key for each segment or one for the whole manifest
The decryption key can be hosted externally (by referencing the key URL) or embedded in the manifest file (by key value).

An example manifest of a 44 second long VOD stream protected with AES-128 content protection - each media segment has its own key.
```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-ALLOWCACHE:1
#EXT-X-KEY:METHOD=AES-128,URI="segment-00000.key"
#EXTINF:4.458667,
segment-00000.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00001.key"
#EXTINF:4.010000,
segment-00001.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00002.key"
#EXTINF:4.468667,
segment-00002.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00003.key"
#EXTINF:3.893000,
segment-00003.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00004.key"
#EXTINF:4.007333,
segment-00004.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00005.key"
#EXTINF:3.292667,
segment-00005.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00006.key"
#EXTINF:4.011667,
segment-00006.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00007.key"
#EXTINF:4.001000,
segment-00007.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00008.key"
#EXTINF:4.011667,
segment-00008.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00009.key"
#EXTINF:4.001000,
segment-00009.ts.enc
#EXT-X-KEY:METHOD=AES-128,URI="segment-00010.key"
#EXTINF:4.011667,
segment-00010.ts.enc
#EXT-X-TARGETDURATION:5
#EXT-X-ENDLIST
```

------------

### Setup DRM protection

THEOplayer supports Fairplay, PlayReady and Widevine by default. To connect to such a DRM system, developers can use a ContentProtectionDescription (or DRMConfiguration, depending on the SDK). However, more often than not, developers are working with a multi-DRM vendor. These vendors take care of their DRM needs. The last challenge for developers is to integrate the provided DRM solution in a video player. THEOplayer is partnered with many multi-DRM vendors to lighten this burden. In our partnerships, we validate the compatibly and often provide integrations. 

1. Configure Microsoft Azure DRM with THEOplayer by copying and pasting the below code into your `index.html` file:

```javascript
  var element = document.querySelector('.theoplayer-container') // fetch THEOplayer container div
  var player = new THEOplayer.Player(element, { // instantiates video player
    libraryLocation : '/path/to/your-theoplayer-folder/' // references folder containing your THEOplayer library files (theoplayer.p.js, THEOplayer.js, ...)
  });

  // DASH
  // player.source = {
  //     sources : [{
  //         src : '//amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=mpd-time-csf)', // sets DASH source
  //         type : 'application/dash+xml' // sets type to MPEG-DASH
  //     }]
  // };

  // HLS
  player.source = {
    sources : [{
      src : '//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8', // sets HLS source
      type : 'application/x-mpegurl' // sets type to HLS
    }]
  };
```
#### Using tokenized DRM

Add a JavaScript file with the following code:

```javascript
<script>
if (HLS) {
    let drmConfiguration = {
        "integration": "azure",
        "token": "AZURE_TOKEN>",
        "fairplay": {
            "licenseAcquisitionURL": "<LICENSE_KEY_URL_FAIRPLAY>",
            "certificateURL": "CERTIFICATE_URL>"
        }
    };
    player.source = {
        "sources": {
            "src": "<HLS_STREAM_URL>",
            "type": "application/x-mpegurl",
            "contentProtection": drmConfiguration
        }
    }
} else if (DASH) {
    let drmConfiguration = {
        "integration": "azure",
        "token": "<AZURE_TOKEN>",
        "playready": {
            "licenseAcquisitionURL": "<LICENSE_KEY_URL_PLAYREADY>"
        },
        "widevine": {
            "licenseAcquisitionURL": "<LICENSE_KEY_URL_WIDEVINE>"
        }
    };
    player.source = {
        "sources": {
            "src": "<DASH_STREAM_URL>",
            "type": "application/dash+xml",
            "contentProtection": drmConfiguration
        }
    }
}
</script>
```

------------

## Implementation reference

For an implementation reference sample please check the following [link](../../src/THEOplayer) which contains a complete basic implementation of THEOplayer.

------------

## Test results

References:

- ✔️ All scenarios are supported in all tested browsers with both VOD and Live content (including Live Transcription and Low Latency).

- ⚠️ Some scenarios may not be supported (for more information, click more details at the bottom).

- ❌ No scenario is supported.

### Windows 10 v2004

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![safari](../icons/safari.png) Safari (v77.0.1+)
- ![newedge](../icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
- ![edge](../icons/edge.png) Edge (v44.18362.449.0+)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/windows.md)

### macOS Catalina v10.15.6

Tested on:

- ![chrome](../icons/chrome.png) Chrome (v83.0.4103.97+)
- ![firefox](../icons/firefox.png) Firefox (v77.0.1+)
- ![safari](../icons/safari.png) Safari (v77.0.1+)

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | ✔️ | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/macOS.md)

### Android v9

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/android.md)

### AndroidTV v9

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/androidTV.md)

### iOS v13.6

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/ios.md)

### tvOS v13.4.8

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ❌([#6](issues.md#issue-6)) | Not applicable | Not applicable | ❌([#6](issues.md#issue-6))  | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ❌([#6](issues.md#issue-6)) | Not  applicable | Not applicable | ❌([#6](issues.md#issue-6))  | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/tvOS.md)

### ipadOS v13.6

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | ✔️  | Not applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | ✔️ | Not  applicable | Not applicable | ✔️ | ✔️ | ✔️ |
| DASH CMAF | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable | Not applicable |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/ipadOS.md)

### webOS v3.0

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#3](issues.md#issue-3)) | Not applicable  | Not applicable | Not applicable | Not applicable | ❌([#3](issues.md#issue-3)) | ✔️ |
| HLS CMAF  | ❌([#3](issues.md#issue-3)) | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/webOS.md)

### tizen v4.0

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#5](issues.md#issue-5)) | Not  applicable  | Not applicable | Not applicable | Not applicable  | ❌([#5](issues.md#issue-5)) | ✔️ |
| HLS CMAF  | ❌([#5](issues.md#issue-5)) | Not  applicable | Not  applicable | Not applicable | Not applicable  | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/tizen.md)

### ubuntu

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :------: | :------: | :------: |
| HLS TS    | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) |
| HLS CMAF  | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) |
| DASH CMAF | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar captions |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :------: | :------: | :------: |
| HLS TS    | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) |
| HLS CMAF  | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) |
| DASH CMAF | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) | ❌([#2](issues.md#issue-2)) |

[More details](./results/ubuntu.md)

### chromecast v2.0

##### VOD and Live content

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Sidecar caption |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ✔️ | Not applicable  | Not applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| HLS CMAF  | ✔️ | Not applicable | Not  applicable | Not applicable | Not applicable | ✔️ | ✔️ |
| DASH CMAF | ✔️ | ✔️ | ✔️ | Not applicable | Not applicable | Not applicable | ✔️ |

##### Low Latency Live Streaming

| Format | Clear | DRM Token | Widevine | PlayReady | FairPlay | AES-128 | Live Transcription |
| --------- | :---: | :---: | :----------------------------------------------------------: | :------: | :----------------------------------------------------------: | :------: | :------: |
| HLS TS    | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| HLS CMAF  | ✔️ | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) | ❌([#1](issues.md#issue-1)) |
| DASH CMAF | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

[More details](./results/chromecast.md)