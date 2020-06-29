. ".\common.ps1"

validateBasicConfig

ActivityMessage "Validating if video Asset already exists..."
$asset = az ams asset list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq  $config.VOD.video }
if ($asset) {
  WarningMessage "The video Asset already exists"
} else {
  ActivityMessage "Creating Video Asset..."
  $inputAsset = az ams asset create `
  --account-name $config.MediaServiceAccount `
  --name $config.VOD.video `
  --resource-group $config.ResourceGroup | ConvertFrom-Json

  SuccessMessage "Video Asset created"
  $assetData = az ams asset show `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name $config.VOD.video | ConvertFrom-Json
  $assetContainer = $assetData.container
  ActivityMessage "Uploading video file..."
  $upload = az storage blob upload `
  -c $assetContainer `
  -f $config.VOD.video `
  --name $config.VOD.video `
  --account-name $config.StorageAccount | ConvertFrom-Json
  SuccessMessage "Video file uploaded"

  $vtt = az ams transform create `
  --account-name $config.MediaServiceAccount `
  --name vtttransform `
  --preset AudioAnalyzer `
  --resource-group $config.ResourceGroup | ConvertFrom-Json

  $vttOutputAsset = az ams asset create `
  --account-name $config.MediaServiceAccount `
  --name "vttoutputasset" `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  SuccessMessage "vtt Output asset Created"
  ActivityMessage "Analyzing audio..."  
  $vttassetData = az ams asset show `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "vttoutputasset" | ConvertFrom-Json
  $vttJob = az ams job start `
  --output-assets "vttoutputasset=" `
  --account-name $config.MediaServiceAccount `
  --input-asset-name $config.VOD.video `
  --name vttjob `
  --resource-group $config.ResourceGroup `
  --transform-name vtttransform | ConvertFrom-Json
  SuccessMessage "VTT Generated"
  Do {
    $vttJob = az ams job show `
    --account-name $config.MediaServiceAccount `
    --name vttjob `
    --resource-group $config.ResourceGroup `
    --transform-name vtttransform | ConvertFrom-Json
  } While ($vttJob.state -ne "Finished")
  $vttFile = az storage blob download `
  --account-name $config.StorageAccount `
  --container-name $vttassetData.container `
  --name "transcript.vtt" `
  --file "..\src\transcript.vtt"
  SuccessMessage "VTT file downloaded"
}

ActivityMessage "Validating if output Asset already exists..."
$outputAsset = az ams asset list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq "defaultoutputasset" }
if ($outputAsset) {
  WarningMessage  "The output Asset already exists"
} else {
  $transform = az ams transform create `
  --account-name $config.MediaServiceAccount `
  --name defaulttransform `
  --preset $config.VOD.preset `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  ActivityMessage "Creating output Asset..."
  $outputAsset = az ams asset create `
  --account-name $config.MediaServiceAccount `
  --name "defaultoutputasset" `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  SuccessMessage "Output asset Created"
  ActivityMessage "Starting encode..."
  $job = az ams job start `
  --output-assets "defaultoutputasset=" `
  --account-name $config.MediaServiceAccount `
  --input-asset-name $config.VOD.video `
  --name defaultjob `
  --resource-group $config.ResourceGroup `
  --transform-name defaulttransform | ConvertFrom-Json
  SuccessMessage "File encoded"
}

$streamingLocators =  az ams streaming-locator list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json

ActivityMessage "Creating streaming locators..."
$clearLocator = $streamingLocators | Where-Object { $_.name -eq "clearvod" }
if (!$clearLocator) {
  $clearLocator = az ams streaming-locator create `
  --name "clearvod" `
  --asset-name defaultoutputasset `
  --streaming-policy-name "Predefined_ClearStreamingOnly" `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount
  SuccessMessage "Clear VOD locator created."
} else {
  WarningMessage "Clear VOD locator already exists."
}

$openDRMLocator = $streamingLocators | Where-Object { $_.name -eq "opendrmvod" }
if (!$openDRMLocator) {
  $openDRMLocator = az ams streaming-locator create `
  --name "opendrmvod" `
  --asset-name defaultoutputasset `
  --streaming-policy-name "allProtocolsAllDRMsPolicy" `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --content-key-policy-name $config.CKP.DRMOpen.name
  SuccessMessage "DRM Open VOD locator created."
} else {
  WarningMessage "DRM Open VOD locator already exists."
}

$tokenDRMLocator = $streamingLocators | Where-Object { $_.name -eq "tokendrmvod" }
if (!$tokenDRMLocator) {
  $tokenDRMLocator = az ams streaming-locator create `
  --name "tokendrmvod" `
  --asset-name defaultoutputasset `
  --streaming-policy-name "allProtocolsAllDRMsPolicy" `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --content-key-policy-name $config.CKP.DRMToken.name
  SuccessMessage "DRM Token VOD locator created."
} else {
  WarningMessage "DRM Token VOD locator already exists."
}

$openClearKeyLocator = $streamingLocators | Where-Object { $_.name -eq "openclearkeyvod" }
if (!$openClearKeyLocator) {
  $openClearKeyLocator = az ams streaming-locator create `
  --name "openclearkeyvod" `
  --asset-name defaultoutputasset `
  --streaming-policy-name "Predefined_ClearKey" `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --content-key-policy-name $config.CKP.encryptionOpen.name
  SuccessMessage "Encryption open VOD locator created."
} else {
  WarningMessage "Encryption open VOD locator already exists."
}

$tokenClearKeyLocator = $streamingLocators | Where-Object { $_.name -eq "tokenclearkeyvod" }
if (!$tokenClearKeyLocator) {
  $tokenClearKeyLocator = az ams streaming-locator create `
  --name "tokenclearkeyvod" `
  --asset-name defaultoutputasset `
  --streaming-policy-name "Predefined_ClearKey" `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --content-key-policy-name $config.CKP.encryptionToken.name
  SuccessMessage "Encryption Token VOD locator created."
} else {
  WarningMessage "Encryption Token VOD locator already exists."
}

SuccessMessage "Streaming locators created"

AddVODURLsToOutputJSON

generateURLs

SuccessMessage "VOD configured"

$setupVOD =  Read-Host -Prompt "Start default Streaming Endpoint? (Y/n)"
If ($setupVOD -ne "n") {
    ./start-endpoint.ps1
}
