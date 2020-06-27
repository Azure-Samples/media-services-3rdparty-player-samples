---
page_type: guide
languages:
- javascript
products:
- azure media services
description: "This repository contains samples, documentation and test results for different 3rd player frameworks using VOD and Live content from Azure Media Services (AMS)."
urlFragment: "media-services-3rdparty-player-samples"
---

# Media Services 3rd Party Player Samples

## Overview
This repository contains samples, documentation and platform/browser support matrix for using popular 3rd party player frameworks that support HLS and/or MPEG-DASH delivery from Azure Media Services (AMS).

This guidance also includes the steps needed to configure and play Live and VOD content from Azure Media Services with several 3rd party video players. There are two main components to this repository:

1. The [setup scripts](/setup) will help you generating Live and VOD content with Azure Media Services for testing in the players.
2. Once you've set up your Live and VOD test content, you can opt between the two players tested in this repository:

- [Video.js](/players/video.js)  or
- [Shaka Player](/players/shaka)

## Contents

Outline the file contents of the repository. It helps users navigate the codebase, build configuration and any related assets.

| File/folder         | Description                                |
|---------------------|--------------------------------------------|
| `.github`           | Folder with github workflows               |
| `players`           | Folder with players samples                |
| `setup`             | Folder with AMS setup scripts.             |
| `.gitignore`        | Define what to ignore at commit time.      |
| `CHANGELOG.md`      | List of changes to the sample.             |
| `CONTRIBUTING.md`   | Guidelines for contributing to the sample. |
| `LICENSE`           | The license for the sample.                |
| `README.md`         | This README file.                          |


## Index
  * Web players
    + [Video.js](./players/video.js "videojs")
    + [Shaka Player](./players/shaka "shaka-player")
