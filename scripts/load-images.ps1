# Скрипт PowerShell для загрузки Docker образов из tar-архивов
# Использование: .\scripts\load-images.ps1

Write-Host "Загрузка образов..." -ForegroundColor Green

# Проверяем наличие архивов и загружаем
if (Test-Path "lab_next.tar") {
    Write-Host "Загрузка lab_next.tar..." -ForegroundColor Yellow
    docker load -i lab_next.tar
} else {
    Write-Host "Архив lab_next.tar не найден." -ForegroundColor Red
}

if (Test-Path "playwright.tar") {
    Write-Host "Загрузка playwright.tar..." -ForegroundColor Yellow
    docker load -i playwright.tar
} else {
    Write-Host "Архив playwright.tar не найден." -ForegroundColor Red
}

if (Test-Path "postgres.tar") {
    Write-Host "Загрузка postgres.tar..." -ForegroundColor Yellow
    docker load -i postgres.tar
} else {
    Write-Host "Архив postgres.tar не найден." -ForegroundColor Red
}

Write-Host "Готово." -ForegroundColor Green