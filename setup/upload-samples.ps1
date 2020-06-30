. ".\common.ps1"

$tokenDRMPolicy = az ams content-key-policy list `
--resource-group $config.ResourceGroup `
--account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq  $config.CKP.encryptionToken.name}
if (!$tokenDRMPolicy) {
  $setup =  Read-Host -Prompt "Basic setup is required to upload samples. Execute? (Y/n)"
  If ($setup -ne "n") {
    ./setup.ps1
  } else {
    Write-Output "Basic setup is required. Script ended."
    exit
  }
}
ActivityMessage "Enabling static website hosting ..."
$enabling = az storage blob service-properties update `
--account-name $config.StorageAccount `
--static-website `
--index-document "index.html"
SuccessMessage "Static website hosting enabled."

function uploadFile ($typeFile) {
$samplesPath = "..\\src\\"
ActivityMessage "Uploading files from $($samplesPath) ..."
az storage blob upload-batch `
--source $samplesPath `
--destination '$web' `
--pattern $typeFile `
--account-name $config.StorageAccount
SuccessMessage "Upload completed."
}
uploadFile "*.css"
uploadFile "*.js"
uploadFile "*.png"
uploadFile "*.html"
uploadFile "*.vtt"
uploadFile "*.json"

if ($config.FairPlayPublicCertPath -and (Test-Path -Path $config.FairPlayPublicCertPath)){
  uploadFile $config.FairPlayPublicCertPath
}

ActivityMessage "Getting URL ..."
$storageAccountURL = az storage account show `
--name $config.StorageAccount `
--resource-group $config.ResourceGroup `
--query "primaryEndpoints.web" `
--output tsv
SuccessMessage "URL: $($storageAccountURL)"
