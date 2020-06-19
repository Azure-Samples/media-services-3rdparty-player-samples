. ".\common.ps1"

verifyAndActivateCDNInEndpoint
ActivityMessage "Starting Streaming Endpoint..."
$null = az ams streaming-endpoint start `
--name default `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount
SuccessMessage "Streaming Endpoint started"
