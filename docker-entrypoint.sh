#!/bin/sh
set -e

# Если директория /app пуста, копируем содержимое из /app_backup
if [ -z "$(ls -A /app)" ]; then
    echo "Directory /app is empty, copying initial content from /app_backup..."
    cp -r /app_backup/. /app/
    echo "Content copied."
fi

# Выполняем оригинальную команду
exec "$@"