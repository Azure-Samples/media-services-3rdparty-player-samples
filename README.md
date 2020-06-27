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
3rd Party Player Framework Testing with Azure Media Services (AMS)

These guides document the steps needed to configure and play Live and OnDemand video streams via Azure Media Services with several 3rd party video players.

The [setup scripts](/setup) will help you generating a VOD or a live stream for testing in the players.

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
