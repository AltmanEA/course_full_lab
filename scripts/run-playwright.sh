#!/bin/bash

# Скрипт для запуска Playwright тестов из контейнера lab_next
# Использование: ./scripts/run-playwright.sh [аргументы playwright]

set -e

CONTAINER_NAME="playwright"
SERVICE_NAME="course_full_lab-playwright-1"

# Проверяем, запущен ли контейнер playwright
if ! docker ps --filter "name=$SERVICE_NAME" --format "{{.Names}}" | grep -q "$SERVICE_NAME"; then
    echo "Контейнер playwright не запущен. Запускаем..."
    docker-compose up -d playwright
    # Ждём, пока контейнер станет здоровым (не обязательно)
    sleep 2
fi

# Выполняем команду playwright test с переданными аргументами
docker exec -it "$SERVICE_NAME" npx playwright test "$@"