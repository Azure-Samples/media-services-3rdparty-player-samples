. ".\common.ps1"

validateBasicConfig

./stop-live

ActivityMessage "Starting Live Event setup..."
$liveEvent = az ams live-event list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.liveStream.liveEventName }
if ($liveEvent) {
  WarningMessage "Deleting live event ..."
  az ams live-event delete `
  --name $config.liveStream.liveEventName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount
}

WarningMessage "Creating new live event..."
if ($config.liveStream.mode -eq "transcription") {
  $accountData = az account show | ConvertFrom-Json
  $eventData = Get-Content -Raw -Path "payload\livetranscription.json" | ConvertFrom-Json
  $eventData.properties.encoding.encodingType = $config.liveStream.encodingType
  $eventData.properties.encoding.presetName = $config.liveStream.presetName
  $eventData = $eventData | ConvertTo-Json -depth 100
  $eventData | Out-File "payload\livetranscription.json"
  $auth = Get-Content -Raw -Path "$HOME\.azure\accessTokens.json" | ConvertFrom-Json
  $tokenString = $auth[-1].accessToken
  $url = "https://management.azure.com/subscriptions/$($accountData.id)/resourceGroups/$($config.ResourceGroup)/providers/Microsoft.Media/mediaServices/$($config.MediaServiceAccount)/liveEvents/$($config.liveStream.liveEventName)?api-version=2019-05-01-preview"
  $headers = @{
    'authorization' = "Bearer $($tokenString)"
  }
  $null = Invoke-RestMethod -Uri $url -Method Put -Body $eventData -ContentType "application/json" -Headers $headers
} else {
  $streamOption = "Default"
  if ($config.liveStream.mode -eq "lowLatency") {
      $streamOption = "lowLatency"
  }
  $null = az ams live-event create --name $config.liveStream.liveEventName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --streaming-protocol RTMP `
  --ips AllowAll `
  --preview-ips AllowAll `
  --encoding-type $config.liveStream.encodingType `
  --preset-name $config.liveStream.presetName `
  --stream-options $streamOption `
  --vanity-url true
}

$output.LiveStream.mode = $config.liveStream.mode
SaveOutputInJsonFile

SuccessMessage "Created $($config.liveStream.liveEventName) Live Event"
SuccessMessage "Live Event ready to start"
