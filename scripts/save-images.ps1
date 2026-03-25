# Скрипт PowerShell для сохранения Docker образов в tar-архивы
# Использование: .\scripts\save-images.ps1

Write-Host "Сохранение образов..." -ForegroundColor Green

# Определяем имена образов (должны соответствовать именам в docker-compose)
$labNextImage = "course_full_lab-lab_next"
$playwrightImage = "course_full_lab-playwright"
$postgresImage = "postgres:18-alpine"

# Сохраняем образ lab_next
if (docker image inspect $labNextImage 2>$null) {
    Write-Host "Сохранение $labNextImage..." -ForegroundColor Yellow
    docker save -o lab_next.tar $labNextImage
} else {
    Write-Host "Образ $labNextImage не найден. Пропускаем." -ForegroundColor Red
}

# Сохраняем образ playwright
if (docker image inspect $playwrightImage 2>$null) {
    Write-Host "Сохранение $playwrightImage..." -ForegroundColor Yellow
    docker save -o playwright.tar $playwrightImage
} else {
    Write-Host "Образ $playwrightImage не найден. Пропускаем." -ForegroundColor Red
}

# Сохраняем образ postgres (если нужен)
if (docker image inspect $postgresImage 2>$null) {
    Write-Host "Сохранение $postgresImage..." -ForegroundColor Yellow
    docker save -o postgres.tar $postgresImage
} else {
    Write-Host "Образ $postgresImage не найден. Пропускаем." -ForegroundColor Red
}

Write-Host "Готово. Архивы: lab_next.tar, playwright.tar, postgres.tar (если были созданы)" -ForegroundColor Green