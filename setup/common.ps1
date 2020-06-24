function ActivityMessage ($message) {
  Write-Host -ForegroundColor White $message
}

function WarningMessage ($message) {
  Write-Host -ForegroundColor Yellow $message
}

function ErrorMessage ($message) {
  Write-Host -ForegroundColor Red $message
}

function SuccessMessage ($message) {
  Write-Host -ForegroundColor Green $message
}

if (!(Test-Path "config.json" -PathType leaf)) {
  WarningMessage "The config file does not exist. Creating a new one with the config.json.example data."
  Copy-Item -Path "config.json.example" -Destination "config.json"
}
$config = Get-Content -Raw -Path "config.json" | ConvertFrom-Json

if (!(Test-Path "output.json" -PathType leaf)) {
  WarningMessage "The output file does not exist. Creating a new one with the output.json.example data."
  Copy-Item -Path "output.json.example" -Destination "output.json"
}
$output = Get-Content -Raw -Path "output.json" | ConvertFrom-Json

function verifyAndActivateCDNInEndpoint()
{
  $endpoint = az ams streaming-endpoint show `
  --name default --account-name $config.MediaServiceAccount  `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  if (!$endpoint.cdnEnabled) {
    ActivityMessage "Configuring CDN to endpoint..."
    $updateEndpoint = az ams streaming-endpoint update `
    --cdn-profile StandardVerizon `
    --name default `
    --account-name $config.MediaServiceAccount `
    --resource-group $config.ResourceGroup
    $endpoint = az ams streaming-endpoint show `
    --name default `
    --account-name $config.MediaServiceAccount `
    --resource-group $config.ResourceGroup | ConvertFrom-Json
    if ($endpoint.cdnEnabled) {
      SuccessMessage "CDN configured"
    } else {
      ErrorMessage "Error configuring CDN."
      exit
    }
  }
}

function SaveOutputInJsonFile () {
  $output | ConvertTo-Json -depth 100 | Out-File "output.json"
}

function validateBasicConfig () {
  $resourceGroup = az group list `
  --query "[?location=='$($config.Location)']" | ConvertFrom-Json | Where-Object { $_.name -eq $config.ResourceGroup}
  if (!$resourceGroup) {
    $setup =  Read-Host -Prompt "Basic setup is required. Execute? (Y/n)"
    If ($setup -ne "n") {
      ./setup.ps1
    } else {
      Write-Output "Basic setup is required. Script ended."
      exit
    }
  }
  $tokenDRMPolicy = az ams content-key-policy list `
  --resource-group $config.ResourceGroup `
  --account-name $config.MediaServiceAccount | ConvertFrom-Json | Where-Object { $_.name -eq $config.CKP.encryptionToken.name }
  if (!$tokenDRMPolicy) {
    $setup =  Read-Host -Prompt "Basic setup is required. Execute? (Y/n)"
    If ($setup -ne "n") {
      ./setup.ps1
    } else {
      Write-Output "Basic setup is required. Script ended."
      exit
    }
  }
}
function urlOutput ($urlTest) {
  $list = @()
  $urlTest| ForEach-Object -Process {
    if($_.streamingProtocol -eq 'Hls'){
      $encCenc = $_.url | Select-String -Pattern 'cenc'
      $cbcsAapl = $_.url | Select-String -Pattern 'cbcs-aapl'
      $HLSV4 = $_.url | Select-String -Pattern 'm3u8-aapl'
      $tipoHLS = if ($HLSV4) {"HLS TS"} else {"HLS CMAF"}
      $tipoEnc = if ($encCenc) {"CENC"} else {if($cbcsAapl){"CBCS"} else{""}}
      $list += @{"streamingProtocol"="$($tipoHLS) $($tipoEnc)";"url"=$_.url;}
      WarningMessage "Protocol: $($tipoHLS) $($tipoEnc)"
      SuccessMessage $_.url
    }
    if($_.streamingProtocol -eq 'Dash'){
      $DASHCMAF = $_.url | Select-String -Pattern 'mpd-time-cmaf'
      if ($DASHCMAF) {
        $encCenc = $_.url | Select-String -Pattern 'cenc'
        $cbcsAapl = $_.url | Select-String -Pattern 'cbcs-aapl'
        $tipoEnc = if ($encCenc) {"CENC"} else {if($cbcsAapl){"CBCS"} else{""}}
        $list += @{"streamingProtocol"="DASH-CMAF $($tipoEnc)";"url"=$_.url}
        WarningMessage "Protocol: DASH CMAF $($tipoEnc)"
        SuccessMessage $_.url
      }
    }
  }
  return $list
}

function generateURLs{
  ActivityMessage "Generating URLs for all protocols..."

  if ($output.VOD.clear) {
    ActivityMessage "Clear VOD Paths"
    $newVODClear = urlOutput $output.VOD.clear
    $output.VOD.clear = $newVODClear
  }

  if ($output.VOD.DRMOpen) {
    ActivityMessage "DRM Open VOD Paths"
    $newVODRMOpen = urlOutput $output.VOD.DRMOpen
    $output.VOD.DRMOpen = $newVODRMOpen
  }

  if ($output.VOD.DRMToken) {
    ActivityMessage "DRM with token VOD Paths"
    $newVODRMToken = urlOutput $output.VOD.DRMToken
    $output.VOD.DRMToken = $newVODRMToken
  }

  if ($output.VOD.encryptionOpen) {
    ActivityMessage "Encryption VOD Paths"
    $newVODEncOpen = urlOutput $output.VOD.encryptionOpen
    $output.VOD.encryptionOpen = $newVODEncOpen
  }

  if ($output.VOD.encryptionToken) {
    ActivityMessage "Encryption with token VOD Paths"
    $newVODEncToken = urlOutput $output.VOD.encryptionToken
    $output.VOD.encryptionToken = $newVODEncToken
  }

  if ($output.LiveStream.clear) {
    ActivityMessage "Clear Live Stream Paths"
    $newLiveStreamClear = urlOutput $output.LiveStream.clear
    $output.LiveStream.clear = $newLiveStreamClear
  }

  if ($output.LiveStream.DRMOpen) {
    ActivityMessage "DRM Open Live Stream Paths"
    $newLiveStreamDRMOpen = urlOutput $output.LiveStream.DRMOpen
    $output.LiveStream.DRMOpen = $newLiveStreamDRMOpen
  }

  if ($output.LiveStream.DRMToken) {
    ActivityMessage "DRM with token Live Stream Paths"
    $newLiveStreamRMToken = urlOutput $output.LiveStream.DRMToken
    $output.LiveStream.DRMToken = $newLiveStreamRMToken
  }

  if ($output.LiveStream.encryptionOpen) {
    ActivityMessage "Encryption Live Stream Paths"
    $newLiveStreamEncOpen = urlOutput $output.LiveStream.encryptionOpen
    $output.LiveStream.encryptionOpen = $newLiveStreamEncOpen
  }

  if ($output.LiveStream.encryptionToken) {
    ActivityMessage "Encryption with token Live Stream Paths"
    $newLiveStreamEncToken = urlOutput $output.LiveStream.encryptionToken
    $output.LiveStream.encryptionToken = $newLiveStreamEncToken
  }

  $output | ConvertTo-Json -Depth 10 | Out-File "..\players\output.json"
  SuccessMessage "All URLs saved in output.json"
}

function AddVODURLsToOutputJSON () {
  $endpoint = az ams streaming-endpoint show `
  --account-name $config.MediaServiceAccount `
  --name default `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  $hostName = $endpoint.hostName
  ActivityMessage "Retrieving VOD Paths..."
  $output.VOD.clear = @()
  Do {
    $pathsClear = az ams streaming-locator get-paths `
    --account-name $config.MediaServiceAccount `
    --resource-group $config.ResourceGroup `
    --name "clearvod" | ConvertFrom-Json
  } While (!$pathsClear.streamingPaths[0].paths)
  $pathsClear.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.VOD.clear += $obj
    }
  }

  $pathsOpenDRM = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "opendrmvod" | ConvertFrom-Json
  $output.VOD.DRMOpen = @()
  $pathsOpenDRM.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.VOD.DRMOpen += $obj
    }
  }
  $kidsOpenDRM = az ams streaming-locator list-content-keys `
  --account-name $config.MediaServiceAccount `
  --name "opendrmvod" `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  $kidsOpenDRM | ForEach-Object -Process {
    if ($_.type -eq "CommonEncryptionCenc") {
      $output.VOD.DRMOpenKIDCENC = $_.id
    } else {
      $output.VOD.DRMOpenKIDCBCS = $_.id
    }
  }

  $pathsTokenDRM = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "tokendrmvod" | ConvertFrom-Json
  $output.VOD.DRMToken = @()
  $pathsTokenDRM.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.VOD.DRMToken += $obj
    }
  }
  $kidsTokenDRM = az ams streaming-locator list-content-keys `
  --account-name $config.MediaServiceAccount `
  --name "tokendrmvod" `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  $kidsTokenDRM | ForEach-Object -Process {
    if ($_.type -eq "CommonEncryptionCenc") {
      $output.VOD.DRMTokenKIDCENC = $_.id
    } else {
      $output.VOD.DRMTokenKIDCBCS = $_.id
    }
  }

  $pathsOpenClearKey = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "openclearkeyvod" | ConvertFrom-Json
  $output.VOD.encryptionOpen = @()
  $pathsOpenClearKey.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.VOD.encryptionOpen += $obj
    }
  }

  $pathsTokenClearKey = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "tokenclearkeyvod" | ConvertFrom-Json
  $output.VOD.encryptionToken = @()
  $pathsTokenClearKey.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.VOD.encryptionToken += $obj
    }
  }

  $output.token = ""
  $token = generateJWTToken $config.token.issuer $config.token.audience $config.token.key $config.token.duration
  $output.token = $token

  SaveOutputInJsonFile
}

function AddLiveStreamURLsToOutputJSON () {
  $endpoint = az ams streaming-endpoint show `
  --account-name $config.MediaServiceAccount `
  --name default `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  $hostName = $endpoint.hostName
  ActivityMessage 'Retrieving Live Stream Paths...'
  $output.LiveStream.clear = @()
  $pathsClear = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "clearlivestream" | ConvertFrom-Json
  $pathsClear.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.LiveStream.clear += $obj
    }
  }

  $pathsOpenDRM = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "operdrmlivestream" | ConvertFrom-Json
  $output.LiveStream.DRMOpen = @()
  $pathsOpenDRM.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.LiveStream.DRMOpen += $obj
    }
  }
  $kidsOpenDRM = az ams streaming-locator list-content-keys `
  --account-name $config.MediaServiceAccount `
  --name "operdrmlivestream" `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  $kidsOpenDRM | ForEach-Object -Process {
    if ($_.type -eq "CommonEncryptionCenc") {
      $output.liveStream.DRMOpenKIDCENC = $_.id
    } else {
      $output.liveStream.DRMOpenKIDCBCS = $_.id
    }
  }

  $pathsTokenDRM = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "tokendrmlivestream" | ConvertFrom-Json
  $output.LiveStream.DRMToken = @()
  $pathsTokenDRM.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.LiveStream.DRMToken += $obj
    }
  }
  $kidsTokenDRM = az ams streaming-locator list-content-keys `
  --account-name $config.MediaServiceAccount `
  --name "tokendrmlivestream" `
  --resource-group $config.ResourceGroup | ConvertFrom-Json
  $kidsTokenDRM | ForEach-Object -Process {
    if ($_.type -eq "CommonEncryptionCenc") {
      $output.liveStream.DRMTokenKIDCENC = $_.id
    } else {
      $output.liveStream.DRMTokenKIDCBCS = $_.id
    }
  }

  $pathsOpenClearKey = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "openclearkeylivestream" | ConvertFrom-Json
  $output.LiveStream.encryptionOpen = @()
  $pathsOpenClearKey.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.LiveStream.encryptionOpen += $obj
    }
  }

  $pathsTokenClearKey = az ams streaming-locator get-paths `
  --account-name $config.MediaServiceAccount `
  --resource-group $config.ResourceGroup `
  --name "tokenclearkeylivestream" | ConvertFrom-Json
  $output.LiveStream.encryptionToken = @()
  $pathsTokenClearKey.streamingPaths | ForEach-Object -Process {
    $actual = $_
    $_.paths | ForEach-Object -Process {
      $obj = New-Object PSObject -Property @{
        url= "https://$($hostName)$($_)"
        streamingProtocol = $actual.streamingProtocol
      }
      $output.LiveStream.encryptionToken += $obj
    }
  }
  $output.LiveStream.mode = $config.liveStream.mode
  $output.token = @()
  $token = generateJWTToken $config.token.issuer $config.token.audience $config.token.key
  $output.token = $token
  Write-Output "Test token: $($token)"

  SaveOutputInJsonFile
}

Function Convert-HashtableToJsonBase64 {
  param (
      [Parameter(Mandatory)]
      [hashtable]
      $Hashtable
  )

  $json = $Hashtable | ConvertTo-Json -Compress
  $jsonbase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($json)).Split('=')[0].Replace('+', '-').Replace('/', '_')

  $jsonbase64
}

function generateJWTToken {
  param(
    [Parameter(Mandatory)][string] $Issuer,
    [Parameter(Mandatory)][string] $Audience,
    [Parameter(Mandatory)][string] $Key,
    [int] $Duration = 604800
  )
  $Encoder = New-Object System.Text.UTF8Encoding
  $HMACSecret = $Encoder.Getbytes($Key)
  $Exp = [int] (Get-Date -UFormat %s) + $Duration

  $Header = @{
      alg = 'HS256'
      typ = 'JWT'
  }

  $Payload = @{
      iss = $Issuer
      aud = $Audience
      exp = $Exp
  }

  $HeaderBase64 = Convert-HashtableToJsonBase64 -Hashtable $Header
  $PayloadBase64 = Convert-HashtableToJsonBase64 -Hashtable $Payload

  $ToBeSigned = $HeaderBase64 + "." + $PayloadBase64

  $SigningAlgorithm = New-Object System.Security.Cryptography.HMACSHA256
  $SigningAlgorithm.Key = $HMACSecret
  $Signature = [Convert]::ToBase64String(
      $SigningAlgorithm.ComputeHash(
          [System.Text.Encoding]::UTF8.GetBytes($ToBeSigned)
      )
  ).Split('=')[0].Replace('+', '-').Replace('/', '_')

  $Token = $ToBeSigned + "." + $Signature
  return $Token
}

function getLicenseURLs($manifestUrl){
  Write-Host $manifestUrl
  [xml]$doc = (New-Object System.Net.WebClient).DownloadString($manifestUrl)
  $licenseUrl = [System.Uri]$doc.MPD.Period.AdaptationSet.ContentProtection.laurl.licenseUrl[0]

  $output.WidevineLicenseURL = $licenseUrl.Scheme + "://" + $licenseUrl.Host + "/Widevine/"
  $output.PlayReadyLicenseURL = $licenseUrl.Scheme + "://" + $licenseUrl.Host + "/PlayReady/"
  $output.FairPlayLicenseURL = $licenseUrl.Scheme + "://" + $licenseUrl.Host + "/FairPlay/"
  if ($config.fairPlayCertificate){
    $output.FairPlayCertificate = Split-Path $config.fairPlayCertificate -leaf
  }
}

function updateLicenseURLs(){
  $output = Get-Content -Raw -Path "..\players\output.json" | ConvertFrom-Json

  if ($output.VOD.DRMOpen) {
    $output.VOD.DRMOpen | ForEach-Object -Process {
      $isDASH = $_.streamingProtocol | Select-String -Pattern 'DASH'
      if ($isDASH) {
        getLicenseURLs $_.url
      }
    } 
  }

  if ($output.LiveStream.DRMOpen) {
    $output.LiveStream.DRMOpen | ForEach-Object -Process {
      $isDASH = $_.streamingProtocol | Select-String -Pattern 'DASH'
      if ($isDASH) {
        getLicenseURLs $_.url
      }
    }
  }

  $output | ConvertTo-Json -Depth 10 | Out-File "..\players\output.json"
}
