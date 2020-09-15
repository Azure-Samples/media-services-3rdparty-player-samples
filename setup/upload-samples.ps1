$output = $false
$sources = $false

for ($i=0; $i -lt $args.length; $i++) {
  if ($args[$i] -eq "--output") {
    $output = $true
  }

  if ($args[$i] -eq "--sources") {
    $sources = $true
  }
}

if ($output -eq $false -and $sources -eq $false) {
  $output = $true
  $sources = $true
}

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
$null = az storage blob service-properties update `
--account-name $config.StorageAccount `
--static-website `
--auth-mode login `
--index-document "index.html"
SuccessMessage "Static website hosting enabled."

function uploadFile ($typeFile) {
  $samplesPath = "../src/"
  ActivityMessage "Uploading $($typeFile) files from $($samplesPath) ..."
  $null = az storage blob upload-batch `
  --source $samplesPath `
  --destination '$web' `
  --pattern $typeFile `
  --account-name $config.StorageAccount
  SuccessMessage "Upload completed."
}

if ($output) {
  uploadFile "output.json"
}

if ($sources) {
  uploadFile "css/*.css"
  uploadFile "js/*.js"
  uploadFile "images/*.png"
  uploadFile "index.html"
  uploadFile "transcript.vtt"
  uploadFile "shaka/*.js"
  uploadFile "shaka/*.html"
  uploadFile "video.js/*.js"
  uploadFile "video.js/*.html"
  uploadFile "hls.js/*.js"
  uploadFile "hls.js/*.html"
  uploadFile "dash.js/*.js"
  uploadFile "dash.js/*.html"

  if ($config.FairPlayPublicCertPath -and (Test-Path -Path $config.FairPlayPublicCertPath)){
    uploadFile $config.FairPlayPublicCertPath
  }  
}

ActivityMessage "Getting URL ..."
$storageAccountURL = az storage account show `
--name $config.StorageAccount `
--resource-group $config.ResourceGroup `
--query "primaryEndpoints.web" `
--output tsv
SuccessMessage "URL: $($storageAccountURL)"
