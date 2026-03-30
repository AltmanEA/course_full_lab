# Script for restoring Docker project on target computer (step 3 of transfer)
# Loads images, restores volumes, and starts containers.

param(
    [string]$BackupDir = "backup",
    [switch]$RestoreVolumes,
    [switch]$StartContainers = $true
)

$ErrorActionPreference = "Stop"

Write-Host "=== Docker Project Restoration ===" -ForegroundColor Cyan

# 1. Check if backup folder exists
if (-not (Test-Path $BackupDir)) {
    Write-Host "Folder '$BackupDir' not found." -ForegroundColor Red
    Write-Host "Provide correct path to backup folder." -ForegroundColor Yellow
    exit 1
}

# 2. Load Docker images
Write-Host "Loading Docker images..." -ForegroundColor Green

$imageFiles = @(
    @{ File = "lab_next.tar"; ExpectedName = "course_full_lab_lab_next" },
    @{ File = "playwright.tar"; ExpectedName = "course_full_lab_playwright" },
    @{ File = "postgres.tar"; ExpectedName = "postgres:18-alpine" }
)

foreach ($img in $imageFiles) {
    $fileName = $img.File
    $imageName = $img.ExpectedName
    $filePath = Join-Path $BackupDir $fileName

    if (Test-Path $filePath) {
        Write-Host "  Loading $fileName ..." -ForegroundColor Yellow
        docker load -i $filePath
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    Success" -ForegroundColor Green
        } else {
            Write-Host "    Error loading $fileName" -ForegroundColor Red
        }
    } else {
        Write-Host "  File $fileName not found, skipping." -ForegroundColor DarkYellow
    }
}

# 3. Verify loaded images
Write-Host "`nVerifying loaded images..." -ForegroundColor Gray
docker images --filter "reference=course_full_lab*" --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}"
docker images --filter "reference=postgres:18-alpine" --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}"

# 4. Restore volumes if flag is set
if ($RestoreVolumes) {
    Write-Host "`nRestoring Docker volumes..." -ForegroundColor Green

    $volumes = @("postgres_data", "lab_next_node_modules", "playwright_node_modules")
    foreach ($vol in $volumes) {
        $backupFile = Join-Path $BackupDir "${vol}_backup.tar.gz"
        if (Test-Path $backupFile) {
            Write-Host "  Restoring volume $vol ..." -ForegroundColor Yellow
            # Create volume if it doesn't exist
            docker volume inspect $vol 2>$null
            if ($LASTEXITCODE -ne 0) {
                docker volume create $vol
            }
            $backupPath = (Join-Path (Get-Location) $BackupDir)
            docker run --rm -v "${vol}:/target" -v "${backupPath}:/backup" alpine tar xzf "/backup/${vol}_backup.tar.gz" -C /target
            if ($LASTEXITCODE -eq 0) {
                Write-Host "    Success" -ForegroundColor Green
            } else {
                Write-Host "    Error restoring volume $vol" -ForegroundColor Red
            }
        } else {
            Write-Host "  Backup for volume $vol not found, skipping." -ForegroundColor DarkYellow
        }
    }
} else {
    Write-Host "Volumes are not restored (use -RestoreVolumes to restore)" -ForegroundColor Yellow
}

# 5. Extract source code if archive exists
$sourceArchive = Join-Path $BackupDir "project_source.tar.gz"
if (Test-Path $sourceArchive) {
    Write-Host "`nSource code archive detected. Extracting..." -ForegroundColor Green
    tar -xzf $sourceArchive -C .
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Source code extracted successfully." -ForegroundColor Green
    } else {
        Write-Host "Error extracting source code." -ForegroundColor Red
    }
} else {
    Write-Host "`nSource code archive not found. Ensure project files are already in place." -ForegroundColor Yellow
}

# 6. Start containers if flag is set
if ($StartContainers) {
    Write-Host "`nStarting containers..." -ForegroundColor Green
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Containers started successfully." -ForegroundColor Green
    } else {
        Write-Host "Error starting containers." -ForegroundColor Red
    }
} else {
    Write-Host "Container startup skipped (use -StartContainers to start automatically)." -ForegroundColor Yellow
}

# 7. Summary
Write-Host "`n=== Restoration completed ===" -ForegroundColor Cyan
Write-Host "Check container status:" -ForegroundColor White
Write-Host "  docker-compose ps" -ForegroundColor Gray
Write-Host "Application should be available at http://localhost:3000" -ForegroundColor Gray
Write-Host "Database - localhost:5432" -ForegroundColor Gray
Write-Host "" -ForegroundColor Gray
Write-Host "To run Playwright tests:" -ForegroundColor Gray
Write-Host "  docker exec course_full_lab_playwright_1 npx playwright test --list"