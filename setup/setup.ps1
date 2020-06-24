. ".\common.ps1"

ActivityMessage "Configuring accounts..."
$resourceGroupsString = az group list --query "[?location=='$($config.Location)']"
$groups =  ConvertFrom-Json "{data: $($resourceGroupsString)}"
$resourceGroup = $groups.data | Where-Object { $_.name -eq $config.ResourceGroup}
if (!$resourceGroup) {
  WarningMessage "No Resource Group found with name $($config.ResourceGroup) in Location $($config.Location), creating one..."
  $resourceGroup = az group create `
  --name $config.ResourceGroup `
  --location $config.Location | ConvertFrom-Json
  if (!$resourceGroup) {
    exit
  }
  SuccessMessage "New Resource Group created in $($config.Location) with name: $($config.ResourceGroup)"
}

$saListString = az storage account list -g $config.ResourceGroup
$storageAccounts = ConvertFrom-Json "{data: $($saListString)}"
$storageAccount = $storageAccounts.data | Where-Object { $_.name -eq $config.StorageAccount}
if (!$storageAccount) {
  WarningMessage "No Storage Account found with name $($config.StorageAccount) in Resource Group $($config.ResourceGroup), creating one..."
  $storageAccount = az storage account create `
  --name $config.StorageAccount `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  if (!$storageAccount) {
    exit
  }
  SuccessMessage "New Storage Account created in $($config.ResourceGroup) with name: $($config.StorageAccount)"
}

$amsaListString = az ams account list -g $config.ResourceGroup
$msAccounts = ConvertFrom-Json "{data: $($amsaListString)}"
$mediaServiceAccount = $msAccounts.data | Where-Object { $_.name -eq $config.MediaServiceAccount}
if (!$mediaServiceAccount) {
  WarningMessage "No AMS account found with name $($config.MediaServiceAccount) in Resource Group $($config.ResourceGroup), creating one..."
  $mediaServiceAccount = az ams account create `
  --name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --storage-account $config.StorageAccount | ConvertFrom-Json
  if (!$mediaServiceAccount) {
    exit
  }
  SuccessMessage "New AMS account created in $($config.ResourceGroup) with name: $($config.MediaServiceAccount)"
}
SuccessMessage  "Accounts properly selected: $($config.ResourceGroup), $($config.StorageAccount), $($config.MediaServiceAccount)"

ActivityMessage "Setting up Streaming Policy..."
$streamingPolicies = az ams streaming-policy list `
--account-name $config.MediaServiceAccount `
--resource-group $config.ResourceGroup | ConvertFrom-Json
$allProtocolsAllDRMsPolicy = $streamingPolicies  | Where-Object { $_.name -eq "allProtocolsAllDRMsPolicy" }
if (!$allProtocolsAllDRMsPolicy) {
    $allProtocolsAllDRMsPolicy = az ams streaming-policy create `
    --account-name $config.MediaServiceAccount `
    --name allProtocolsAllDRMsPolicy `
    --resource-group $config.ResourceGroup `
    --cbcs-protocols HLS `
    --cenc-protocols Dash HLS
}
SuccessMessage "Streaming Policy configured"

ActivityMessage "Setting up Content Key Policies..."

#open DRM Policy
$config.CKP.DRMOpen.options | ForEach-Object {
  ActivityMessage "Consulting for Content Key Policy with name '$($config.CKP.DRMOpen.name)' and option '$($_.name)'"
  $DRMOpenPolicy = az ams content-key-policy list `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.DRMOpen.name }
  $ask = if ($_.ask) {"--ask"} else {""}
  $askValue = if ($_.ask) {$_.ask} else {""}
  $fairPlayPfxPassword = if ($_.fairPlayPfxPassword) {"--fair-play-pfx-password"} else {""}
  $fairPlayPfxPasswordValue = if ($_.fairPlayPfxPassword) {$_.fairPlayPfxPassword} else {""}
  $rentalAndLeaseKeyType = if ($_.rentalAndLeaseKeyType) {"--rental-and-lease-key-type"} else {""}
  $rentalAndLeaseKeyTypeValue = if ($_.rentalAndLeaseKeyType) {$_.rentalAndLeaseKeyType} else {""}
  $rentalDuration = if ($_.rentalDuration) {"--rental-duration"} else {""}
  $rentalDurationValue = if ($_.rentalDuration) {$_.rentalDuration} else {""}
  if (!$DRMOpenPolicy) {
    $DRMOpenPolicy = az ams content-key-policy create `
    --name $config.CKP.DRMOpen.name `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount `
    --policy-option-name $_.name $_.type $_.typeValue `
    $ask $askValue $fairPlayPfxPassword $fairPlayPfxPasswordValue `
    $rentalAndLeaseKeyType $rentalAndLeaseKeyTypeValue $rentalDuration $rentalDurationValue `
    --open-restriction | ConvertFrom-Json
    if ($DRMOpenPolicy) {
      SuccessMessage "Created '$($config.CKP.DRMOpen.name)' Content Key Policy with '$($_.name)' Option"
    } else {
      ErrorMessage "Content Key Policy unable to be created."
    }
  } else {
    $ckp = az ams content-key-policy list `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.DRMOpen.name }
    $curEl = $_
    $DRMOpenPolicy = $ckp.options | Where-Object { $_.name -eq $curEl.name}
    if (!$DRMOpenPolicy) {
      $DRMOpenPolicy = az ams content-key-policy option add `
      --name $config.CKP.DRMOpen.name `
      --resource-group $config.ResourceGroup `
      --account-name $config.MediaServiceAccount `
      --policy-option-name $_.name $_.type $_.typeValue `
      $ask $askValue $fairPlayPfxPassword $fairPlayPfxPasswordValue `
      $rentalAndLeaseKeyType $rentalAndLeaseKeyTypeValue $rentalDuration $rentalDurationValue `
      --open-restriction | ConvertFrom-Json
      if ($DRMOpenPolicy) {
        SuccessMessage "Created '$($_.name)' Option for '$($config.CKP.DRMOpen.name)' "
      } else {
        ErrorMessage "Option $($_.name) was not created"
      }
    } else {
      SuccessMessage "Content Key Policy exists"
    }
  }
}

#tokenized DRM Policy
$config.CKP.DRMToken.options | ForEach-Object {
  ActivityMessage "Consulting for Content Key Policy with name '$($config.CKP.DRMToken.name)' and option '$($_.name)'"
  $tokenDRMPolicy = az ams content-key-policy list `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.DRMToken.name }
  $ask = if ($_.ask) {"--ask"} else {""}
  $askValue = if ($_.ask) {$_.ask} else {""}
  $fairPlayPfxPassword = if ($_.fairPlayPfxPassword) {"--fair-play-pfx-password"} else {""}
  $fairPlayPfxPasswordValue = if ($_.fairPlayPfxPassword) {$_.fairPlayPfxPassword} else {""}
  $rentalAndLeaseKeyType = if ($_.rentalAndLeaseKeyType) {"--rental-and-lease-key-type"} else {""}
  $rentalAndLeaseKeyTypeValue = if ($_.rentalAndLeaseKeyType) {$_.rentalAndLeaseKeyType} else {""}
  $rentalDuration = if ($_.rentalDuration) {"--rental-duration"} else {""}
  $rentalDurationValue = if ($_.rentalDuration) {$_.rentalDuration} else {""}
  if (!$tokenDRMPolicy) {
    $tokenDRMPolicy = az ams content-key-policy create `
    --name $config.CKP.DRMToken.name `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount `
    --policy-option-name $_.name $_.type $_.typeValue  `
    $ask $askValue $fairPlayPfxPassword $fairPlayPfxPasswordValue `
    $rentalAndLeaseKeyType $rentalAndLeaseKeyTypeValue $rentalDuration $rentalDurationValue `
    --token-type $config.token.type `
    --token-key-type $config.token.keyType `
    --token-key $config.token.key `
    --issuer $config.token.issuer `
    --audience $config.token.audience | ConvertFrom-Json
    SuccessMessage "Created '$($config.CKP.DRMToken.name)' Content Key Policy with '$($_.name)' Option"
  } else {
    $ckp = az ams content-key-policy list `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.DRMToken.name }
    $curEl = $_
    $tokenDRMPolicy = $ckp.options | Where-Object { $_.name -eq $curEl.name}
    if (!$tokenDRMPolicy) {
      $tokenDRMPolicy = az ams content-key-policy option add `
      --name $config.CKP.DRMToken.name `
      --resource-group $config.ResourceGroup `
      --account-name $config.MediaServiceAccount `
      --policy-option-name $_.name $_.type $_.typeValue `
      $ask $askValue $fairPlayPfxPassword $fairPlayPfxPasswordValue `
      $rentalAndLeaseKeyType $rentalAndLeaseKeyTypeValue $rentalDuration $rentalDurationValue `
      --token-type $config.token.type `
      --token-key-type $config.token.keyType `
      --token-key $config.token.key `
      --issuer $config.token.issuer `
      --audience $config.token.audience | ConvertFrom-Json
      if ($tokenDRMPolicy) {
        SuccessMessage "Created '$($_.name)' Option for '$($config.CKP.DRMToken.name)' "
      } else {
        ErrorMessage "Option $($_.name) was not created"
      }
    } else {
      SuccessMessage "Content Key Policy exists"
    }
  }
}

#open Clear Key policy
$config.CKP.encryptionOpen.options | ForEach-Object {
  ActivityMessage "Consulting for Content Key Policy with name '$($config.CKP.encryptionOpen.name)' and option '$($_.name)'"
  $openClerKeyPolicy = az ams content-key-policy list `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.encryptionOpen.name }
  if (!$openClerKeyPolicy) {
    $openClerKeyPolicy = az ams content-key-policy create `
    --name $config.CKP.encryptionOpen.name `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount `
    --policy-option-name $_.name $_.type $_.typeValue `
    --open-restriction | ConvertFrom-Json
    SuccessMessage "Created '$($config.CKP.encryptionOpen.name)' Content Key Policy with '$($_.name)' Option"
  } else {
    SuccessMessage "Content Key Policy exists"
  }
}

#tokenized Clear Key Policy
$config.CKP.encryptionToken.options | ForEach-Object {
  ActivityMessage "Consulting for Content Key Policy with name '$($config.CKP.encryptionToken.name)' and option '$($_.name)'"
  $tokenDRMPolicy = az ams content-key-policy list `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.encryptionToken.name }
  if (!$tokenDRMPolicy) {
    $tokenDRMPolicy = az ams content-key-policy create `
    --name $config.CKP.encryptionToken.name `
    --resource-group $config.ResourceGroup `
    --account-name $config.MediaServiceAccount `
    --policy-option-name $_.name $_.type $_.typeValue `
    --token-type $config.token.type `
    --token-key-type $config.token.keyType `
    --token-key $config.token.key `
    --issuer $config.token.issuer `
    --audience $config.token.audience | ConvertFrom-Json
    SuccessMessage "Created '$($config.CKP.encryptionToken.name)' Content Key Policy with '$($_.name)' Option"
  } else {
    SuccessMessage "Content Key Policy exists"
  }
}
SuccessMessage "Content Key Policies configured"
