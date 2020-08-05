---
page_type: guide
languages:
- javascript
products:
- azure media services
description: "This repository contains samples, documentation and test results for different 3rd party player frameworks using VOD and Live content from Azure Media Services (AMS)."
urlFragment: "media-services-3rdparty-player-samples"
---

# Media Services 3rd Party Player Samples

## Overview

This repository contains samples, documentation, and platform/browser feature tables for using popular 3rd party player frameworks that support HLS and/or MPEG-DASH delivery from Azure Media Services (AMS). This guide also includes the steps needed to configure VOD and Live content from Azure Media Services to facilitate the testing of each 3rd party player.

These are the main components of this repository:

1. [Setup](#setup)

2. [Samples](#samples)

3. [Test results](#test-results)

4. [How to setup your player](#how-to-setup-your-player)

## Setup

This project uses PowerShell [setup](/setup) scripts to generate content (VOD and Live) in Azure Media Services, and provides tools to test the 3rd party players in different combinations of features, streaming formats, and content protection.

For example, this is the _Index_ page generated after running the setup scripts. It contains the playback endpoints for all the features, formats, and content protection options available in Azure Media Services along with links to test them on each 3rd party player sample:

![Index](docs/images/index.jpg)

For a detailed guide on how to run them, please check the [Setup](/setup) section.

## Samples

The repository contains a sample implementation of each player. The sample is a minimal player implementation using captioning and content protection (DRM and Encryption).

To see the sample code, please check:

- [Video.js](/src/video.js)
- [Shaka Player](/src/shaka)
- [THEOplayer](/src/THEOplayer)

## Test results
  
The samples were tested with VOD and Live content generated with the [Setup](/setup) in the following browsers:

- Windows 10 v1909+
  - ![chrome](docs/icons/chrome.png) Chrome (v83.0.4103.97+)
  - ![firefox](docs/icons/firefox.png) Firefox (v77.0.1+)
  - ![newedge](docs/icons/edge-new.png) Edge Chromium-based (v83.0.478.50+)
  - ![edge](docs/icons/edge.png) Edge (v44.18362.449.0+)
- macOS v10.15.5+
  - ![chrome](docs/icons/chrome.png) Chrome (v83.0.4103.97+)
  - ![safari](docs/icons/safari.png) Safari (v13.1.1+)
- Ubuntu v18.04.3 LTS+
  - ![chrome](docs/icons/chrome.png) Chrome (v79.0.3945.130+)
  - ![firefox](docs/icons/firefox.png) Firefox (v76.0.1+)
- Android v8+
  - ![chrome](docs/icons/chrome.png) Chrome (v83.0.4103.97+)
  - ![firefox](docs/icons/firefox.png) Firefox (v68.9+)
- iOS v13.5.1+
  - ![chrome](docs/icons/chrome.png) Chrome (v83.0.4103.88+)
  - ![safari](docs/icons/safari.png) Safari (v13.1+)

To see the test results, please check:
  
- [Video.js](/docs/video.js#test-results)
- [Shaka Player](/docs/shaka#test-results)

## How to set up your player

The documentation contains instructions on how to implement your own player, covering the following items:

- Implementing the player
- Set up captions
- Set up token authentication
- Set up AES-128 encryption
- Set up DRM protection

To see the documentation, please check:

- [Video.js](/docs/video.js)
- [Shaka Player](/docs/shaka)
- [THEOplayer](/docs/THEOplayer)

## Root contents

| File/folder         | Description                                |
|---------------------|--------------------------------------------|
| `src`               | Folder with 3rd party player samples                |
| `docs`              | Folder with 3rd party player documentation and test results|
| `setup`             | Folder with AMS setup scripts             |
| `.gitignore`        | Define what to ignore at commit time      |
| `CHANGELOG.md`      | List of changes to the sample             |
| `CONTRIBUTING.md`   | Guidelines for contributing to the sample |
| `LICENSE`           | The license for the sample                |
| `README.md`         | This README file                          |

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.opensource.microsoft.com>.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
