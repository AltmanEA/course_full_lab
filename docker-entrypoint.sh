#!/bin/sh
set -e

# Если отсутствует исходный код (src/app), копируем содержимое из /app_backup
if [ ! -d "/app/src/app" ]; then
    echo "Source code not found in /app, copying from /app_backup..."
    cp -r /app_backup/. /app/
    echo "Content copied."
fi

# Инициализируем git репозиторий в /app, если его ещё нет
if [ ! -d "/app/.git" ]; then
    echo "Initializing git repository in /app..."
    cd /app && git init
    # Настраиваем глобальную конфигурацию git для возможности коммита
    git config --global user.email "container@example.com"
    git config --global user.name "Container User"
    # Добавляем все файлы и делаем первый коммит
    git add .
    git commit -m "Initial commit from container"
    echo "Git repository initialized and first commit created."
fi

# Выполняем оригинальную команду
exec "$@"