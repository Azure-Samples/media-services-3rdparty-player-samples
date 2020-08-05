# Media Services 3rd Party Player Samples - Setup

## Table of contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Steps to set up and start the streams](#steps-to-set-up-and-start-the-streams)
  - [Common configuration](#common-configuration)
  - [Avoiding extra costs](#avoiding-extra-costs)
- [Documentation](#documentation)
  - [config.json](#configjson)
    - [Options of the Content Key Policy](#options-of-the-content-key-policy)
  - [output.json](#outputjson)
  - [setup.ps1](#setupps1)
  - [setup-vod.ps1](#setup-vodps1)
  - [setup-live.ps1](#setup-liveps1)
  - [start-live.ps1](#start-liveps1)
  - [stop-live.ps1](#stop-liveps1)
  - [start-endpoint.ps1](#start-endpointps1)
  - [stop-endpoint.ps1](#stop-endpointps1)
  - [delete.ps1](#deleteps1)
  - [upload-samples.ps1](#upload-samplesps1)

## Overview

This document contains the instructions for generating streaming content (both VOD and Live) in Azure Media Services so it can be used for testing the different 3rd party players. The different playback endpoints (HLS, DASH, DRM, etc.), ingest URLs, and license server URLs will be the output of this process. The output then is used to generate an index page with links to test all the content in each player. The scripts also deploy the samples (that will contain the output and the index page) to a static website hosted on an Azure storage blob container.

## Requirements

- [Azure CLI 2.8.0+](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
- [PowerShell 5.1+](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7)

## Steps to setup and start the streams

### Common configuration

1. Clone the repository.

    ```powershell
    git clone https://github.com/Azure-Samples/media-services-3rdparty-player-samples.git
    ```

2. Launch a PowerShell terminal.
3. Login into your Azure account.

    ```powershell
    az login
    ```

4. Select a subscription.

    ```powershell
    az account set --subscription "subscription name"
    ```

5. Navigate to the `setup` folder in the cloned directory.

    ```powershell
    cd .\media-services-3rdparty-player-samples\setup
    ```

6. Copy the example configuration.

    Configuration without FairPlay:

    ```powershell
    Copy-Item .\config.json.example .\config.json
    ```

    Configuration with FairPlay (This configuration requires a FairPlay Private key and public certificate):

    ```powershell
    Copy-Item .\config.json.fairplay.example .\config.json
    ```

    **Note:** If the `config.json` file doesn't exist, the script will automatically copy it from `config.json.example`. We suggest you to create your own `config.json` before running the script if you want to customize the configuration.

7. Update the configuration

    Open the `config.json` to select the names of the Azure resources that you'll use. **If these resources doesn't exist, the script will create them for you**:
    
    ```json
    "ResourceGroup": "amsplayerresource",
    "StorageAccount": "amsplayerstorage",
    "MediaServiceAccount": "amsplayeraccount"
    ```

    Configure the token by setting the `key` property in the `token` section:
      - `key`: Either a string (40 characters) for symmetric key, or a file path to a certificate (X509) or public key (RSA).

    See [here](#documentation) for additional configurations options.

    If you are configuring FairPlay complete the `config.json` with the following values:  
      - `typeValue`: with the path of your private key.
      - `ask`: with the key that must be used as FairPlay Application Secret Key, which is a 32-character hex string.
      - `fairPlayPfxPassword` with the password encrypting FairPlay certificate in PKCS 12 (pfx) format.
      - `FairPlayPublicCertPath` : with the path of your public certificate.

    This should be loaded both in `DRMOpen` and `DRMToken` sections of the Content Key Policies.

8. Set up the content

    After completing the required fields in the `config.json`, you can configure the basic Azure resources with:

    ```powershell
    .\setup.ps1
    .\setup-vod.ps1
    .\setup-live.ps1
    ```

    **Note:** Find detailed information of what each script does[below](#documentation).

    While running the `setup-vod.ps1` script, you'll be asked if you want to start the default streaming endpoint and, if you do, your content will be ready to be played. 
    
    **Note:** Keep in mind that once the streaming endpoint is started you will begin to be charged (more information in the [Avoiding extra costs](#Avoiding-extra-costs) section). You can always start the default streaming endpoint later by executing the following command:
    
    ```powershell
    .\start-endpoint.ps1
    ```
    After running the `setup-vod.ps1` script, an `output.json` file in the `src` folder will be generated, containing the VOD manifests URLs, a token (for testing), the license URLs, and the content keys IDs (one for the DRM open and one for the DRM with token protected content). More information about the `output.json` file can be found in the [Documentation](#outputjson) section.
    
    Also, a `transcript.vtt` file, generated using Video Indexer, will be downloaded into the `src` folder.

    Execute the following script to start a live stream:

    ```powershell
    .\start-live.ps1
    ```

    While running the `start-live.ps1`, you'll be asked to connect your live encoder to one of the ingest URLs provided. You can skip this but the script will try to get the manifests URLs anyway and they won't be completely generated until the encoder is correctly connected, so you will see just the host name of the manifests (obtained from the streaming endpoint) in the `output.json`. If you decided to skip it, you can re-run the `start-live.ps1` script once you have your encoder connected and this will complete the `output.json` with the live stream content (manifests and license URLs and content keys IDs).

    Keep in mind that once you run the `start-live.ps1` script, the default streaming endpoint and the live event will be running whether you connect the encoder or not, and this will generate costs. Please see the [Avoiding extra costs](#Avoiding-extra-costs) section for more information.

    The live streaming content is different from the VOD content since the manifest URLS (and, therefore, the content key IDs) will change every time you start and stop it. So the section for live stream in the `output.json` will change constantly.

    If you need to change the mode of the live stream to enable low latency or live transcription, you need to run the `setup-live.ps1` script. This will stop and delete any running resource and create a new live event so when you run the `start-live.ps1` it will use that mode. In this case, the ingest URLs will change.

9. Deploy a static web site.

    In the `src` folder there is an `index` page configured which generates links with the URLs and parameters needed in the player to reproduce the content. This data is loaded from the `output.json`.

    You can create a static website with the `index` and the players samples with:

    ```powershell
    .\upload-samples.ps1
    ```

    This script enables a static web site in the storage account selected in the `config.json` and uploads into its blob container, called `$web`, the entire `src` folder. It also configures the `index` and returns the URL to access it.

    ![Index](../docs/images/index.jpg)

    If you run this without previously executing the other scripts, the `index` will contain only a link to each player sample where you can test any manifest.

    If you change the live stream mode, run this script again so the `output.json` is updated and the links use the new URLs.

    Once you have completed all the tests, and if you won't use any of the content anymore, you can delete your resource group with the script `delete.ps1`.

    More technical details on what each file and script does and contains is [here](#documentation).

### Avoiding extra costs

There are three main cost-generators when you set up the content:
  - The `streaming endpoint` in running state.
  - The `live event` in running state.
  - The `blob storage`.

More information about Azure Media Services pricing is [here](https://azure.microsoft.com/en-us/pricing/details/media-services/). You can also find the encoding price for the VOD, but as the scripts use a short video to encode and as it's run just once, the cost should be negligible.

More information about `blob storage` pricing [here](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/).

The live stream content requires both `live event` and `streaming endpoint` to be running to work and the VOD just requires the `streaming endpoint`.

We recommend that once the live stream is not used anymore run:

```powershell
.\stop-live.ps1
```

This will stop the `live event` and will delete all the generated content, so the overall `blob storage` costs will be reduced. Take into account that this script won't stop the `streaming endpoint`, so the VOD content will continue to work. Once you start it again, all the live stream content from the `output.json` will be removed as it will change.

To stop the `streaming endpoint` run:

```powershell
.\stop-endpoint.ps1
```

## Documentation

### config.json

The resource creation process can be configured through a `config.json` file. An example is uploaded [here](config.json.example).
*If you run a script and there is no config.json, it will create it from the example.*

config.json

```javascript
"ResourceGroup": "amsplayerresource", // Name of the resource group
"StorageAccount": "amsplayerstorage", // Name of the storage account. Supports only lowercase letters between 4-40 characters
"MediaServiceAccount": "amsplayeraccount", // Name of the media service account. Supports only lowercase letters between 4-40 characters
"Location": "westus2", // Location where the script will verify and create the resources
"CKP": {
  "DRMOpen": {
    "name": "drmopen", // Name of the Content Key Policy
    "options": [] // Options of the Content Key Policy
  },
  "DRMToken": {
    "name": "drmtokenized", // Name of the Content Key Policy
    "options": [] // Options of the Content Key Policy
  },
  "encryptionOpen": {
    "name": "clearkeyopen", // Name of the Content Key Policy
    "options": [] // Options of the Content Key Policy
  },
  "encryptionToken": {
    "name": "clearkeytoken", // Name of the Content Key Policy
    "options": [] // Options of the Content Key Policy
  }
},
"token": {
  "type": "Jwt", // The type of token. Allowed values: Jwt, Swt
  "keyType": "Symmetric", // The type of the token key to be used for the primary verification key. Allowed values: Symmetric, RSA, X509
  "key": "{secure key}", // Either a string (40 characters) for symmetric key or a file path to a certificate (x509) or public key (rsa)
  "issuer": "randomissuer", // The token issuer for the token
  "audience": "randomaudience", // The audience for the token
  "duration": "604800" // The time in seconds that the token will work. A week is set by default
},
"VOD": {
  "video": "sample-vod.mp4", // Path to the file relative to the script location to be uploaded and encoded
  "preset": "adaptiveStreaming" // Encode option for the transform (https://docs.microsoft.com/en-us/azure/media-services/latest/encoding-concept#builtinstandardencoderpreset)
},
"liveStream": {
  "liveEventName": "liveeventname", // The name for the Live Event to be created.
  "assetName": "liveassetname", // The asset where the Live Encoding will save the output to be streamed
  "encodingType": "Standard", // The encoding type for live event. This value is specified at creation time and cannot be updated. Allowed values: Basic, None, Standard.
  "presetName": "Default720p", // The encoding preset name. This value is specified at creation time and cannot be updated.
  "liveOutputName": "liveoutput", // The name of the live event.
  "mode": "default" // Allowed values: default, transcription, lowLatency
},
"FairPlayPublicCertPath": "" // Path to Public FairPlay Certificate
```

#### Options of the Content Key Policy

The Content Key Policies can have more than one option. Each option can have the fields:

- `name`: Name of the option which is required for all Content Key Policies
- `type`: Parameter to configure the DRM or encryption option (--widevine-template /--play-ready-template / -fair-play-pfx / --clear-key-configuration) which is required for all Content Key Policies
- `typeValue`: Value of the type, a path to the json license file, json string (Widevine works with an empty json), empty for encryption or the file path to a FairPlay certificate file in PKCS 12 (pfx) format (including private key). This field is required for all Content Key Policies.
- `ask`: The key that must be used as FairPlay Application Secret Key which is a 32 character hex string and is required for FairPlay Content Key Policy
- `fairPlayPfxPassword`: The password encrypting FairPlay certificate in PKCS 12 (pfx) format which is required for FairPlay Content Key Policy
- `rentalAndLeaseKeyType`: The rental and lease key type using the available values: Undefined, DualExpiry, PersistentUnlimited, PersistentLimited
- `rentalDuration`: The rental duration which must be greater than or equal to 0

In this sample, the Content key Policy with DRM and token protection will be created with Widevine and PlayReady options:

```json
"DRMToken": {
  "name": "drmtokenized",
  "options": [
    {
      "name": "widevineopen",
      "type": "--widevine-template",
      "typeValue": "\"{}\""
    },
    {
      "name": "playreadyopen",
      "type": "--play-ready-template",
      "typeValue": "@payload/playreadylicense.json"
    },
    {
      "name": "fairplayopen",
      "type": "--fair-play-pfx",
      "typeValue": "@fairplay.pfx",
      "ask": "ask-32-chars-hex-string",
      "fairPlayPfxPassword": "pfxPassword",
      "rentalAndLeaseKeyType": "PersistentUnlimited",
      "rentalDuration": "5000"
    }
  ]
}
```

In the Setup directory there is a `playreadylicense.json` already created with the default template.

In the `config.json.example` there is an extra parameter called `disabled-options` in the first Content Key Policy for a FairPlay sample. It won't be used in the scripts.

------

### output.json

The output of each script will be saved in this file located in the `src` folder. The file will contain all the information required to test the different features on each players, including ingest URLs, manifest URLs, token, licence URLs, licence keys, and captions.

The file is also consumed by the index page of the sample player to generate the links to the different content. 

```json
{
  "VOD": {
    "clear": [],
    "DRMOpen": [],
    "DRMToken": [],
    "encryptionOpen": [],
    "encryptionToken": [],
    "subtitle": "",
    "DRMOpenKIDCENC": "",
    "DRMOpenKIDCBCS": "",
    "DRMTokenKIDCENC": "",
    "DRMTokenKIDCBCS": ""
  },
  "LiveStream": {
    "mode": "",
    "ingestURLs": [],
    "clear": [],
    "DRMOpen": [],
    "DRMToken": [],
    "encryptionOpen": [],
    "encryptionToken": [],
    "DRMOpenKIDCENC": "",
    "DRMOpenKIDCBCS": "",
    "DRMTokenKIDCENC": "",
    "DRMTokenKIDCBCS": ""
  },
  "WidevineLicenseURL": "",
  "PlayReadyLicenseURL": "",
  "FairPlayLicenseURL": "",
  "FairPlayPublicCertPath": "",
  "Token": ""
}
```

### setup.ps1

What this script does:

1. Creates (if they don't exist) a **Resource Group**, a **Storage Account** and an **Azure Media Services Account** with the names specified in the `config.json` file.
2. Creates (if it doesn't exist) a **Streaming policy** for using CENC encryption in DASH and HLS URLs and CBCS in HLS.
3. Creates (if they don't exist) the **Content Key Policies** with the options specified in the `CKP` section of the `config.json` for:
    - Open DRM
    - Tokenized DRM
    - Open ClearKey
    - Tokenized ClearKey

Requirements:

The following fields must be filled in the `config.json` file:

- `ResourceGroup`
- `StorageAccount`
- `MediaServiceAccount`
- `Location`
- `CKP`
- `token`
  - `type`
  - `keyType`
  - `key`
  - `issuer`
  - `audience`
  - `duration`

Run:

```powershell
.\setup.ps1
```

------

### setup-vod.ps1

What this script does:

1. Creates asset.
2. Uploads the file.
3. Creates the transform with the selected preset in the `config.json`.
4. Runs a new job to transform the created asset and saves the result into an output asset.
5. Creates a transform with the preset AudioAnalyzer.
6. Runs a new job with the AudioAnalyzer preset transform and downloads the generated `trancript.vtt` into the `src` folder.
7. Generates the streaming locators for:
    - Clear VOD
    - Open MultiDRM VOD
    - Tokenized MultiDRM VOD
    - Open ClearKey VOD
    - Tokenized ClearKey VOD
8. Gets all the URLs from the streaming locators and saves them into `output.json` file.
9. Extracts license URLs from the manifest. To extract them, it performs the following steps:
    - Downloads the DASH DRM protected manifest from the generated URL.
    - Opens the manifest and finds the XPath /MPD/Period/AdaptationSet/ContentProtection/laurl/licenseUrl. This node contains the license URL for Widevine.
    - The license URLs for PlayReady are generated with the host of Widevine’s license URL, plus /PlayReady/.
    - The license URLs for FairPlay are generated with the host of Widevine’s license URL, plus /FairPlay/.
10. Gets the content keys and saves their IDs into the `output.json`.
11. Ask whether the user wants to start the default streaming endpoint.

Requirements:

- `setup.ps1` executed beforehand.
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `MediaServiceAccount`
  - `VOD`
    - `filePath`
    - `preset`

Run:

```powershell
.\setup-vod.ps1
```

------

### setup-live.ps1

This script does creates the live event with the name specified in the `config.json` file.

Requirements:

- `setup.ps1` executed before
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `MediaServiceAccount`
  - `liveStream`
    - `liveEventName`
    - `encodingType`
    - `presetName`
    - `mode` (in order to change the mode, run `setup-live.ps1` again with the new configuration)

Run:

```powershell
.\setup-live.ps1
```

------

### start-live.ps1

What this script does:

1. Creates a new asset.
2. Creates a new live output.
3. Generates the streaming locators for:
    - Clear Live stream
    - Open DRM Live stream
    - Tokenized DRM Live stream
    - Open ClearKey Live stream
    - Tokenized ClearKey Live stream
4. Starts the default streaming endpoint.
5. Starts the live event.
6. Saves the ingest URLs which are to be used in your streaming software of choice, and where you'll need to provide them in order to start the live stream. If your software awaits for a password, enter `default`.
7. The script now waits for the user to connect to an ingest URL.
8. Saves the playback URLs in the `output.json` file.
9. Extracts license URLs from manifest. To extract them, it performs the following steps:
    - Downloads the DASH DRM protected manifest from the generated URL.
    - Opens the manifest and finds the XPath /MPD/Period/AdaptationSet/ContentProtection/laurl/licenseUrl. This node contains the license URL for Widevine.
    - The license URLs for PlayReady are generated with the host of Widevine’s license URL, plus /PlayReady/.
    - The license URLs for FairPlay are generated with the host of Widevine’s license URL, plus /FairPlay/.
10. Gets the content keys and save their IDs into the `output.json`.

Requirements:

- `setup.ps1` executed beforehand
- `setup-live.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `MediaServiceAccount`
  - `liveStream`
    - `liveEventName`
    - `assetName`
    - `encodingType`
    - `liveOutputName`
    - `mode`

Run:

```powershell
.\start-live.ps1
```

------

### stop-live.ps1

What this script does:

1. Stops the live event.
2. Deletes the live output.
3. Deletes the asset.
4. Removes the ingest URLs, the playback URLs and the content key IDs from the `output.json` file.

Requirements:

- `setup.ps1` executed beforehand.
- `setup-live.ps1` executed beforehand.
- `start-live.ps1` executed beforehand.
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `MediaServiceAccount`
  - `liveStream`
    - `liveEventName`
    - `assetName`
    - `liveOutputName`
    - `liveTranscription`

Run:

```powershell
.\stop-live.ps1
```

------

### start-endpoint.ps1

What this script does:

1. Starts the default streaming endpoint.

Requirements:

- `setup.ps1` executed beforehand.
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `MediaServiceAccount`

Run:

```powershell
.\start-endpoint.ps1
```

------

### stop-endpoint.ps1

What this script does:

1. Stops the Live Event if running.
2. Stops the default Streaming Endpoint.

Requirements:

- `setup.ps1` executed beforehand.
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `MediaServiceAccount`

Run:

```powershell
.\stop-endpoint.ps1
```

------

### delete.ps1

This script deletes the resource group indicated in the `config.json` file.

Requirements:

- `setup.ps1` executed beforehand.
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`

Run:

```powershell
.\delete.ps1
```

------

### upload-samples.ps1

What this script does:

1. Enables the storage account specified in `config.json` file to host a static website.
2. Uploads to the blob storage the samples.
3. Prints the URL to access the static website.

Requirements:

- `setup.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
  - `ResourceGroup`
  - `StorageAccount`
  - `FairPlayPublicCertPath` Only if FairPlay is configured.

Run:

```powershell
.\upload-samples.ps1
```
