# Media Services v3 Player Frameworks Tests - Content Setup with Azure CLI PowerShell scripts

## Table of contents

- [Azure Media Services test content setup - Azure CLI PowerShell scripts](#azure-media-services-test-content-setup---azure-cli-powershell-scripts)
  * [Table of contents](#table-of-contents)
  * [Overview](#overview)
  * [Requirements](#requirements)
  * [Steps to setup and start the streams](#steps-to-setup-and-start-the-streams)
  * [Configuration](#configuration)
    + [Options of the Content Key Policy](#options-of-the-content-key-policy)
    + [setup.ps1](#setupps1)
      - [What this script does](#what-this-script-does)
      - [Requirements](#requirements-1)
      - [Run](#run)
    + [setup-vod.ps1](#setup-vodps1)
      - [What this script does](#what-this-script-does-1)
      - [Requirements](#requirements-2)
      - [Run](#run-1)
    + [setup-live.ps1](#setup-liveps1)
      - [What this script does](#what-this-script-does-2)
      - [Requirements](#requirements-3)
      - [Run](#run-2)
    + [start-live.ps1](#start-liveps1)
      - [What this script does](#what-this-script-does-3)
      - [Requirements](#requirements-4)
      - [Run](#run-3)
    + [stop-live.ps1](#stop-liveps1)
      - [What this script does](#what-this-script-does-4)
      - [Requirements](#requirements-5)
      - [Run](#run-4)
    + [start-endpoint.ps1](#start-endpointps1)
      - [What this script does](#what-this-script-does-5)
      - [Requirements](#requirements-6)
      - [Run](#run-5)
    + [stop-endpoint.ps1](#stop-endpointps1)
      - [What this script does](#what-this-script-does-6)
      - [Requirements](#requirements-7)
      - [Run](#run-6)
    + [delete.ps1](#deleteps1)
      - [What this script does](#what-this-script-does-7)
      - [Requirements](#requirements-8)
      - [Run](#run-7)
    + [upload-samples.ps1](#upload-samplesps1)
      - [What this script does](#what-this-script-does-8)
      - [Requirements](#requirements-9)
      - [Run](#run-8)

## Overview
This file documents the scripts used to setup test content in Azure Media Services. It aids with the creation of the needed resources and provides the user with playback and ingest URLs.

## Requirements
- Azure CLI: [link](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
- PowerShell 5.1+:  [link](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7)

## Steps to setup and start the streams

### Common configuration

1. Clone the repository
```powershell
git clone https://github.com/Azure-Samples/media-services-3rdparty-player-samples.git
```
2. Launch a PowerShell terminal 

3. Login into your Azure account
```powershell
az login
```
3. Select a subscription
```powershell
az account set --subscription "subscription name"
```
5. Navigate to the `setup` folder in the cloned directory
```powershell
cd .\media-services-3rdparty-player-samples\setup
```
7. Copy the example configuration

Configuration without FairPlay:
```powershell
Copy-Item .\config.json.example .\config.json
```
Configuration with FairPlay (This configuration requires a FairPlay Private key and public certificate):
```powershell
Copy-Item .\config.json.fairplay.example .\config.json
```
8. Configuration

Open the `config.json` and update the names of the resources you'll use. If these don't exist, the script will create them:
```json
"ResourceGroup": "amsplayerresource",
"StorageAccount": "amsplayerstorage",
"MediaServiceAccount": "amsplayeraccount"
```
Additional configurations [here](#configuration)

if you are configuring Fairplay replace in the `config.json` the folowing values:  
  - `fairplay.pfx` with the path of your private key.
  - `fairplay.cer` with the path of your public certificate.
  - `ask-32-chars-hex-string` with the key that must be used as FairPlay Application Secret Key, which is a 32 character hex string.
  - `fairPlayPfxPassword` with the password encrypting FairPlay certificate in PKCS 12 (pfx) format.

9. Run Setup scripts. More information [here](#setupps1)
```powershell
.\setup.ps1
.\setup-vod.ps1
.\setup-live.ps1   
```

### Start VOD
1. Run Start Endpoint script. More information [here](#start-endpointps1)
```powershell
.\start-endpoint.ps1   
```

### Start Live
1. Run Start Live script. More information [here](#start-liveps1)
```powershell
.\start-live.ps1
```
2. The script shows the ingest URLs
3. Copy the ingest URL in your streaming software 
4. Start streaming in your software
5. When streaming is started press enter in the terminal

### Upload Samples
1. Run Stop Live script. More information [here](#upload-samplesps1)
```powershell
.\upload-samples.ps1
```
This script prints the URL to access the samples online.

### Stop VOD
1. Run Stop Endpoint script. More information [here](#stop-vodps1)
```powershell
.\stop-endpoint.ps1   
```

### Stop Live
1. Run Stop Live script. More information [here](#stop-liveps1)
```powershell
.\stop-live.ps1
```

## Configuration
The resource creation process can be configured through a `config.json` file, an example is uploaded [here](config.json.example).
*If we run a script and there is no config.json, it will create it from the example.*

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
  "preset": "H264MultipleBitrate1080p" // Encode option for the transform (https://docs.microsoft.com/en-us/azure/media-services/latest/encoding-concept#builtinstandardencoderpreset)
},
"liveStream": {
  "liveEventName": "liveeventname", // The name for the Live Event to be created.
  "assetName": "liveassetname", // The asset where the Live Encoding will save the output to be streamed
  "encodingType": "Standard", // The encoding type for live event. This value is specified at creation time and cannot be updated. Allowed values: Basic, None, Standard.
  "presetName": "Default720p", // The encoding preset name. This value is specified at creation time and cannot be updated.
  "liveOutputName": "liveoutput", // The name of the live event.
  "mode": "default" // Allowed values: default, transcription, lowLatency
},
"FairPlayCertificate": "" // Path to Public FairPlay Certificate
```

#### Options of the Content Key Policy

The Content Key policies can have more than one option.
Each option must have the fields

- `name`: Name of the option
- `type`: Parameter to configure the DRM or encryption option (--widevine-template /--play-ready-template / -fair-play-pfx / --clear-key-configuration)
- `typeValue`: Value of the type, a path to the json license file, json string (Widevine works with an empty json), empty for encryption or the filepath to a FairPlay certificate file in PKCS 12 (pfx) format (including private key).
- `ask`: The key that must be used as FairPlay Application Secret Key, which is a 32 character hex string.
- `fairPlayPfxPassword`: The password encrypting FairPlay certificate in PKCS 12 (pfx) format.
- `rentalAndLeaseKeyType`: The rental and lease key type. Available values: Undefined, DualExpiry, PersistentUnlimited, PersistentLimited.
- `rentalDuration`: The rental duration. Must be greater than or equal to 0.

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
In the Setup directory there is a playreadylicense.json already created with the default template.
In the config.json.example there is an extra parameter called "disabled-options" in the first Content Key Policy for a FairPlay sample. It won't be used in the scripts.

------

### setup.ps1

#### What this script does
1. Creates (if they don't exist) a **Resource Group**, a **Storage Account** and an **Azure Media Services Account** with the names specified in the `config.json` file
2. Creates (if they don't exist) the **Content Key Policies** with the options specified in the `CKP` section of the `config.json` for:
    - Open DRM
    - Tokenized DRM
    - Open ClearKey
    - Tokenized ClearKey

#### Requirements
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

#### Run
```powershell
.\setup.ps1
```

------

### setup-vod.ps1

#### What this script does
1. Creates asset
2. Uploads the file
3. Creates the transform
4. Runs a new job to transform the created asset and saves the result into an output asset
5. Generates the streaming locators for:
    - Clear VOD
    - Open MultiDRM VOD
    - Tokenized MultiDRM VOD
    - Open ClearKey VOD
    - Tokenized ClearKey VOD
6. Gets all the URLs from the streaming locators and saves them into `output.json` file
7. Ask whether the user wants to start the default streaming endpoint

#### Requirements
- `setup.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
    - `ResourceGroup`
    - `StorageAccount`
    - `MediaServiceAccount`
    - `VOD`
        - `filePath`
        - `preset`

#### Run
```powershell
.\setup-vod.ps1
```

------

### setup-live.ps1

##### What this script does
1. Creates the live event with the name specified in the `config.json` file

##### Requirements
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
##### Run
```powershell
.\setup-live.ps1
```

------

### start-live.ps1

#### What this script does
1. Creates a new asset
2. Creates a new live output
3. Generates the streaming locators for:
    - Clear Live stream
    - Open DRM Live stream
    - Tokenized DRM Live stream
    - Open ClearKey Live stream
    - Tokenized ClearKey Live stream
4. Starts the default streaming endpoint
5. Starts the live event
6. Saves the ingest URLs. These are to be used in your streaming software of choice, were you'll need to provide them in order to start livestreaming. If your software awaits for a password, enter `default`
7. The script now waits for the user to connect to an ingest URL
8. Saves the playback URLs in the `output.json` file

#### Requirements
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

##### Run
```powershell
.\start-live.ps1
```

------

### stop-live.ps1

#### What this script does
1. Stops the live event
2. Deletes the live output
3. Deletes the asset
4. Removes the ingest URLs and the playback URLs from the `output.json` file

#### Requirements
- `setup.ps1` executed beforehand
- `setup-live.ps1` executed beforehand
- `start-live.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
    - `ResourceGroup`
    - `StorageAccount`
    - `MediaServiceAccount`
    - `liveStream`
        - `liveEventName`
        - `assetName`
        - `liveOutputName`
        - `liveTranscription`

#### Run
```powershell
.\stop-live.ps1
```

------

### start-endpoint.ps1

#### What this script does
1. Starts the default streaming endpoint

#### Requirements
- `setup.ps1` executed beforehand
- `setup-vod.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
    - `ResourceGroup`
    - `StorageAccount`
    - `MediaServiceAccount`

#### Run
```powershell
.\start-endpoint.ps1
```

------

### stop-endpoint.ps1

#### What this script does
1. Stops the Live Event if running
2. Stops the default Streaming Endpoint

#### Requirements
- `setup.ps1` executed beforehand
- `setup-vod.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
    - `ResourceGroup`
    - `StorageAccount`
    - `MediaServiceAccount`

#### Run
```powershell
.\stop-endpoint.ps1
```

------

### delete.ps1

#### What this script does
1. Deletes the resource group indicated in the `config.json` file

#### Requirements
- `setup.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
    - `ResourceGroup`

#### Run
```powershell
.\delete.ps1
```

------

### upload-samples.ps1

#### What this script does
1. Enables the storage account specified in `config.json` file to host static website
2. Uploads to the blob storage the samples
3. Prints the URL to access the static website.
4. Extracts license URLs from manifest. To extract them, it performs the following steps:
   - Downloads the DASH DRM protected manifest from the generated URL 
   - Opens the manifest and finds the XPath /MPD/Period/AdaptationSet/ContentProtection/laurl/licenseUrl. This node contains the license URL for Widevine
   - The license URLs for PlayReady are generated with the host of Widevine’s license URL, plus /PlayReady/
   - The license URLs for FairPlay are generated with the host of Widevine’s license URL, plus /FairPlay/

#### Requirements
- `setup.ps1` executed beforehand
- The following fields must be filled in the `config.json` file:
    - `ResourceGroup`
    - `StorageAccount`
    - `FairPlayCertificate` Only if FairPlay is configured

#### Run
```powershell
.\upload-samples.ps1
```
