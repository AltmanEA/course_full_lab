param (
    [Parameter(Mandatory = $true)]
    [string]$Name
)

$folderPath = Join-Path (Get-Location) $Name

New-Item -ItemType Directory -Path $folderPath -Force | Out-Null

New-Item -ItemType File -Path (Join-Path $folderPath "README.md") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path $folderPath "$Name.ts") -Force | Out-Null
New-Item -ItemType File -Path (Join-Path $folderPath "$Name.spec.ts") -Force | Out-Null

Write-Host "Done! Folder '$Name' and files created."