# Script for backing up Docker project (step 1 of transfer)
# Saves images, source code, and volumes to backup folder.

param(
    [switch]$StopContainers,
    [switch]$SkipVolumes,
    [string]$BackupDir = "backup"
)

$ErrorActionPreference = "Stop"

Write-Host "=== Docker Project Backup ===" -ForegroundColor Cyan

# 1. Create backup folder
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
    Write-Host "Created folder '$BackupDir'" -ForegroundColor Green
} else {
    Write-Host "Folder '$BackupDir' already exists, cleaning old archives..." -ForegroundColor Yellow
    Remove-Item "$BackupDir\*.tar", "$BackupDir\*.tar.gz", "$BackupDir\*.zip" -Force -ErrorAction SilentlyContinue
}

# 2. Stop containers if flag is set
if ($StopContainers) {
    Write-Host "Stopping containers..." -ForegroundColor Yellow
    docker-compose down
} else {
    Write-Host "Containers are not stopped (use -StopContainers to stop)" -ForegroundColor Yellow
}

# 3. Save Docker images
Write-Host "Saving Docker images..." -ForegroundColor Green

$images = @(
    @{ Name = "course_full_lab_lab_next"; File = "lab_next.tar" },
    @{ Name = "course_full_lab_playwright"; File = "playwright.tar" },
    @{ Name = "postgres:18-alpine"; File = "postgres.tar" }
)

foreach ($img in $images) {
    $imageName = $img.Name
    $fileName = $img.File
    $outputPath = Join-Path $BackupDir $fileName

    Write-Host "  Checking image $imageName ..." -ForegroundColor Gray
    if (docker image inspect $imageName 2>$null) {
        Write-Host "  Saving $imageName -> $fileName" -ForegroundColor Yellow
        docker save -o $outputPath $imageName
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    Success" -ForegroundColor Green
        } else {
            Write-Host "    Error saving $imageName" -ForegroundColor Red
        }
    } else {
        Write-Host "  Image $imageName not found, skipping." -ForegroundColor DarkYellow
    }
}

# 4. Archive source code (excluding unnecessary folders)
Write-Host "Archiving source code..." -ForegroundColor Green

$sourceArchive = Join-Path $BackupDir "project_source.tar.gz"
$excludePatterns = @(
    "node_modules",
    "backup",
    "*.tar",
    "*.tar.gz",
    "*.zip",
    ".git",
    ".next",
    "out",
    "coverage",
    "dist",
    "tmp"
)

# Create temporary exclude file
$excludeFile = Join-Path $env:TEMP "exclude_patterns.txt"
$excludePatterns | Out-File -FilePath $excludeFile -Encoding UTF8

try {
    # Use tar via WSL or installed tar (if available)
    $tarAvailable = $false
    if (Get-Command tar -ErrorAction SilentlyContinue) {
        $tarAvailable = $true
    } elseif (Get-Command wsl -ErrorAction SilentlyContinue) {
        $tarAvailable = $true
        $tarCommand = "wsl tar"
    }

    if ($tarAvailable) {
        # tar command with exclusions
        $excludeArgs = $excludePatterns | ForEach-Object { "--exclude=$_" }
        $tarArgs = @("-czf", $sourceArchive, $excludeArgs + ".")
        & tar @tarArgs
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  Source code saved to $sourceArchive" -ForegroundColor Green
        } else {
            Write-Host "  Failed to create tar archive, using Compress-Archive" -ForegroundColor Yellow
            $tarAvailable = $false
        }
    }

    if (-not $tarAvailable) {
        # Fallback: use built-in Compress-Archive (may not exclude folders properly)
        Write-Host "  Using Compress-Archive (exclusions may not apply)..." -ForegroundColor Yellow
        $tempDir = Join-Path $env:TEMP "project_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        New-Item -ItemType Directory -Path $tempDir | Out-Null
        # Copy all files except excluded patterns (simple method)
        Get-ChildItem -Path . -Exclude $excludePatterns | Copy-Item -Destination $tempDir -Recurse -Force
        Compress-Archive -Path "$tempDir\*" -DestinationPath $sourceArchive -Force
        Remove-Item $tempDir -Recurse -Force
        Write-Host "  Source code saved to $sourceArchive (via Compress-Archive)" -ForegroundColor Green
    }
} finally {
    Remove-Item $excludeFile -Force -ErrorAction SilentlyContinue
}

# 5. Save volumes unless -SkipVolumes is specified
if (-not $SkipVolumes) {
    Write-Host "Saving Docker volumes..." -ForegroundColor Green

    $volumes = @("postgres_data", "lab_next_node_modules", "playwright_node_modules")
    foreach ($vol in $volumes) {
        $backupFile = Join-Path $BackupDir "${vol}_backup.tar.gz"
        Write-Host "  Volume $vol -> $(Split-Path $backupFile -Leaf)" -ForegroundColor Yellow
        $backupPath = (Join-Path (Get-Location) $BackupDir)
        docker run --rm -v "${vol}:/source" -v "${backupPath}:/backup" alpine tar czf "/backup/${vol}_backup.tar.gz" -C /source .
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    Success" -ForegroundColor Green
        } else {
            Write-Host "    Error saving volume $vol" -ForegroundColor Red
        }
    }
} else {
    Write-Host "Volumes are not saved (used -SkipVolumes)" -ForegroundColor Yellow
}

# 6. Summary
Write-Host "`n=== Backup completed ===" -ForegroundColor Cyan
Write-Host "Copy the following files to the target computer:" -ForegroundColor White
Write-Host "  - The entire folder '$BackupDir' (contains images, source archive, volume backups)" -ForegroundColor White
Write-Host "  - docker-compose.yml (if not included in archive)" -ForegroundColor White
Write-Host "  - .env (if used)" -ForegroundColor White
Write-Host "`nUse restore-project.ps1 script for restoration." -ForegroundColor White