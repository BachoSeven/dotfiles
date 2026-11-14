param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("edge", "chrome", "brave")]
    [string]$browser
)

$regPath = switch ($browser) {
    "edge"		{ "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallAllowlist" }
    "chrome"	{ "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist" }
    "brave"		{ "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Policies\BraveSoftware\Brave\ExtensionInstallAllowlist" }
}

$valueData = "lkbebcjgcmobigpeffafkodonchffocl"

if (Test-Path $regPath) {
	
	$values = Get-ItemProperty $regPath
	
} else {
	
    New-Item -Path $regPath -ItemType RegistryKey -Force
	
}

if ($values | Where-Object { $_.PSObject.Properties.Value -eq $valueData} ) {

	Write-Host "The value already exists."

} else {
	$newValueName = 1
	while ($values | Where-Object { $_.PSObject.Properties.Name -eq $newValueName.ToString()} ) {
		$newValueName++
	}

	New-ItemProperty -Path $regPath -Name $newValueName -Value $valueData -PropertyType String

	Write-Host "A new value has been added with the name '$newValueName'."

}
