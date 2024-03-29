# Media Services 3rd Party Player Samples - Shaka Player

- [Overview](#overview)
- [How to use](#how-to-use)
  - [Set up development environment](#set-up-development-environment)
  - [Using sample player](#using-sample-player)
  - [Sample details](#sample-details)

## Overview

Shaka Player is an open-source JavaScript library for adaptive media. It plays adaptive media formats (such as DASH and HLS) in a browser, without using plugins or Flash. Instead, Shaka Player uses the open web standards MediaSource Extensions and Encrypted Media Extensions.

Documentation on how to implement your own player and test results with different formats and browsers [here](../../docs/shaka).

## How to use

### Set up development environment

- Install [NodeJS v8+](https://nodejs.org/en/download/ "NodeJS v8+").

### Using sample player

1. Clone this repository.
2. Navigate through the console to the example's folder (src/) and run `npx http-server`. (*)
3. Open the browser of your choice and go to `http://localhost:8080/`.
4. Copy the link to your manifest URL and paste it in the `Manifest URL` field and click `Load Stream`.

(*) Alternatively, you can run the [script](../../setup#upload-samplesps1) to host your player in a static website using your Azure account.

**Your video is now loaded.**

### Sample details

This player sample contains different options that you can set using query strings or manually set them once it's loaded.

- Manifest: Endpoint URL to the Azure Media Service content which is different for each case depending on the protocol and encryption method used.
- Captions: URL for the video .vtt file needed to display captions.
- Token: JWT authentication token needed when using an encryption method (DRM or AES-128).
- Widevine License: URL for Widevine license. This field is not required if the manifest contains the license URL.
- PlayReady License: URL for PlayReady license. This field is not required if the manifest contains the license URL.
- FairPlay Certificate: URL to the FairPlay Certificate to use for playing FairPlay content.
- Auto Play: checked as default, will play the video as soon as it's loaded. The video will be muted due to browser requirement.
- Log Level: Choose the type of log you want to see in "Player Events" such as INFORMATION, WARNING, ERROR, V1 and V2.
  - INFORMATION: This log is for messages to the user about what is happening. For example, when we update a manifest.
  - WARNING: This log is for possible errors or things that may be surprising to a user. For example, if we work around unusual or bad content, we should warn that they should fix their content. Deprecation messages and messages the app shouldn't ignore should use alwaysWarn instead.
  - DEBUG: This log is to aid *users* in debugging their content. This should be for logs about the content and what we do with it. For example, when we change streams or what we are choosing.
  - V1: This log is for debugging Shaka Player itself. This may be logs about internal states or events. This may also be for more verbose logs about content, such as for segment appends.
  - V2: This log is for tracing and debugging Shaka Player. These logs will happen a lot, for example, logging every segment append or every update check. These are mostly used for tracking which calls happen through the code.

![Shaka Player Sample](../../docs/images/shaka.jpg)
