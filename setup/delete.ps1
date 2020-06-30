. ".\common.ps1"

$deleteRG =  Read-Host -Prompt "The $($config.ResourceGroup) Resource Group will be deleted. Continue? (y/n)"
If ($deleteRG -eq "y") {
    WarningMessage "Deleting Resource Group..."
    az group delete --name $config.ResourceGroup -y
    SuccessMessage "Resource Group was successfully deleted"
}