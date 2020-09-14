. ".\common.ps1"
$liveEvent = az ams live-event list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.liveStream.liveEventName -and $_.resourceStatus -eq "Running" }
if ($liveEvent) {
  .\stop-live.ps1
}

ActivityMessage "Stopping Streaming Endpoint..."
$null = az ams streaming-endpoint stop `
--name default `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount
SuccessMessage "Streaming Endpoint stopped"

