. ".\common.ps1"

$liveEvent = az ams live-event list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.liveStream.liveEventName }
if ($liveEvent) {
  $output = Get-Content -Raw -Path "output.json" | ConvertFrom-Json
  ActivityMessage "Stopping Live Event..."
  $liveEventData = az ams live-event stop `
  --name $config.liveStream.liveEventName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount | ConvertFrom-Json
  SuccessMessage "Live Event Stoped"
  ActivityMessage "Deleting Live output..."
  az ams live-output delete --name $config.liveStream.liveOutputName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount `
  --live-event-name $config.liveStream.liveEventName
  SuccessMessage "Live output deleted"
  ActivityMessage "Deleting Asset..."
  az ams asset delete --name $config.liveStream.assetName `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount
  SuccessMessage "Live asset deleted"
  ActivityMessage "Clearing output.json..."
  $output.LiveStream.clear = @()
  $output.LiveStream.DRMOpen = @()
  $output.LiveStream.DRMToken = @()
  $output.LiveStream.encryptionOpen = @()
  $output.LiveStream.encryptionToken = @()
  SaveOutputInJsonFile
  $playerOutput = Get-Content -Raw -Path "..\players\output.json" | ConvertFrom-Json
  $playerOutput.LiveStream.clear = @()
  $playerOutput.LiveStream.DRMOpen = @()
  $playerOutput.LiveStream.DRMToken = @()
  $playerOutput.LiveStream.encryptionOpen = @()
  $playerOutput.LiveStream.encryptionToken = @()
  $playerOutput | ConvertTo-Json -Depth 10 | Out-File "..\players\output.json"
  SuccessMessage "output.json updated"
}

