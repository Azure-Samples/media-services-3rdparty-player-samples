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
2. Once you've set up your Live and VOD test content, you can opt between the players tested in this repository:

- [Video.js](/src/video.js)  or
- [Shaka Player](/src/shaka)

## Contents

| File/folder         | Description                                |
|---------------------|--------------------------------------------|
| `.github`           | Folder with github workflows               |
| `src`               | Folder with players samples                |
| `docs`               | Folder with players configuration files and test results|
| `setup`             | Folder with AMS setup scripts.             |
| `.gitignore`        | Define what to ignore at commit time.      |
| `CHANGELOG.md`      | List of changes to the sample.             |
| `CONTRIBUTING.md`   | Guidelines for contributing to the sample. |
| `LICENSE`           | The license for the sample.                |
| `README.md`         | This README file.                          |

## Prerequisites

To run the setup scripts you need to install the following tools

- [Azure CLI 2.8.0+](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
- [PowerShell 5.1+](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7)

## Setup

To setup these samples first you need to run the setup scripts. For a detailed guide on how to run them go to [Setup](/setup).

## Running the sample

Once you have created all the content in Azure Media Services continue with our guides for each Player:

- [Video.js](/src/video.js)  or
- [Shaka Player](/src/shaka)

## Key concepts

This project uses Azure CLI in PowerShell scripts to generate content in Azure Media Services, it also provides HTML/JS sample implementations to test this content and test results for each combination of browser, format and content.

For test results plase check


- [Video.js](/docs/video.js#test-results)
- [Shaka Player](/docs/shaka#test-results)

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
