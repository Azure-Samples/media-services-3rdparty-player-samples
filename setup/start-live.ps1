. ".\common.ps1"

validateBasicConfig

ActivityMessage "Starting Live Event..."

$asset = az ams asset list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount `
| ConvertFrom-Json | Where-Object { $_.name -eq  $config.liveStream.assetName }
$liveEvent = az ams live-event list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount `
| ConvertFrom-Json | Where-Object { $_.name -eq $config.liveStream.liveEventName }

if (!$liveEvent) {
  $setupLiveStream =  Read-Host -Prompt "Setup is required to start Live Event. Execute? (Y/n)"
  If ($setupLiveStream -ne "n") {
    ./setup-live.ps1
  } else {
    Write-Output "Setup is required to start Live Event. Script ended."
    exit
  }
}

if ($asset) {
  WarningMessage "The Asset already exists. Ignoring..."
} else {
  $null = az ams asset create `
  --name $config.liveStream.assetName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount
  SuccessMessage "Created Asset with name '$($config.liveStream.assetName)'"
 }

 $liveOutput = az ams live-output list `
 --resource-group $config.ResourceGroup `
 --account-name $config.MediaServiceAccount `
 --live-event-name $config.liveStream.liveEventName | ConvertFrom-Json | Where-Object { $_.name -eq  $config.liveStream.liveOutputName }
 if ($liveOutput) {
  WarningMessage "The live-output already exists - ignoring..."
 } else {
  if ($config.liveStream.mode -eq "lowLatency") {
    $null = az ams live-output create `
    --name $config.liveStream.liveOutputName `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount `
    --live-event-name $config.liveStream.liveEventName `
    --asset-name $config.liveStream.assetName `
    --archive-window-length PT8H `
    --fragments-per-ts-segment 1
  } else {
    $null = az ams live-output create `
    --name $config.liveStream.liveOutputName `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount `
    --live-event-name $config.liveStream.liveEventName `
    --asset-name $config.liveStream.assetName `
    --archive-window-length PT8H
  }
  SuccessMessage "Created Live Output with name '$($config.liveStream.liveOutputName)'"
}

ActivityMessage "Creating streaming locators..."
$streamingLocators =  az ams streaming-locator list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json

$clearLocatorName = "clearlivestream"
$clearLocator = $streamingLocators | Where-Object { $_.name -eq $clearLocatorName }
if($clearLocator){
  WarningMessage "Clear Live Stream locator already exists. Ignoring..."
}else{
  $clearLocator = az ams streaming-locator create `
  --name $clearLocatorName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --asset-name $config.liveStream.assetName `
  --streaming-policy-name "Predefined_ClearStreamingOnly"
  SuccessMessage "Clear Live Stream locator created."
}

$openDRMLocatorName = "operdrmlivestream"
$openDRMLocator = $streamingLocators | Where-Object { $_.name -eq $openDRMLocatorName }
if ($openDRMLocator) {
  WarningMessage "DRM Open Live Stream locator already exists. Ignoring..."
} else {
  $openDRMLocator = az ams streaming-locator create `
  --name $openDRMLocatorName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --asset-name $config.liveStream.assetName `
  --streaming-policy-name "Predefined_MultiDrmCencStreaming" `
  --content-key-policy-name $config.CKP.DRMOpen.name
  SuccessMessage "DRM Open Live Stream locator created."
}

$tokenDRMLocatorName = "tokendrmlivestream"
$tokenDRMLocator = $streamingLocators | Where-Object { $_.name -eq $tokenDRMLocatorName }
if ($tokenDRMLocator) {
  WarningMessage "DRM Token Live Stream locator already exists. Ignoring..."
} else {
  $tokenDRMLocator = az ams streaming-locator create `
  --name $tokenDRMLocatorName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --asset-name $config.liveStream.assetName `
  --streaming-policy-name "Predefined_MultiDrmCencStreaming" `
  --content-key-policy-name $config.CKP.DRMToken.name
  SuccessMessage "DRM Token Live Stream locator created."
}

$openClearKeyLocatorName = "openclearkeylivestream"
$openClearKeyLocator = $streamingLocators | Where-Object { $_.name -eq $openClearKeyLocatorName }
if ($openClearKeyLocator) {
  WarningMessage "Encryption open Live Stream locator already exists. Ignoring..."
} else {
  $openClearKeyLocator = az ams streaming-locator create `
  --name $openClearKeyLocatorName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --asset-name $config.liveStream.assetName `
  --streaming-policy-name "Predefined_ClearKey" `
  --content-key-policy-name $config.CKP.encryptionOpen.name
  SuccessMessage "Encryption open Live Stream locator created."
}

$tokenClearKeyLocatorName = "tokenclearkeylivestream"
$tokenClearKeyLocator = $streamingLocators | Where-Object { $_.name -eq $tokenClearKeyLocatorName }
if ($tokenClearKeyLocator) {
  WarningMessage "Encryption Token Live Stream locator already exists. Ignoring..."
} else {
  $tokenClearKeyLocator = az ams streaming-locator create `
  --name $tokenClearKeyLocatorName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --asset-name $config.liveStream.assetName `
  --streaming-policy-name "Predefined_ClearKey" `
  --content-key-policy-name $config.CKP.encryptionToken.name
  SuccessMessage "Encryption Token Live Stream locator created."
}

verifyAndActivateCDNInEndpoint

SuccessMessage "Starting Streaming Endpoint and Live Event..."

$streamingEndpointData = az ams streaming-endpoint start `
--name default `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json
$liveEventData = az ams live-event start `
--name $config.liveStream.liveEventName `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json

$liveEventData.input.endpoints | ForEach-Object -Process {
  SuccessMessage ("Ingest URL: " + $_.url)
  $output.LiveStream.ingestURLs += $_.url
}

$null = Read-Host -Prompt "Start streaming to an Ingest URL and press enter to get the playback URLs"

AddLiveStreamURLsToOutputJSON

generateURLs

SuccessMessage "Live Stream started"
