#!/bin/sh
set -e

# Если отсутствует исходный код (src/app), копируем содержимое из /app_backup
if [ ! -d "/app/src/app" ]; then
    echo "Source code not found in /app, copying from /app_backup..."
    cp -r /app_backup/. /app/
    echo "Content copied."
fi

# Выполняем оригинальную команду
exec "$@"