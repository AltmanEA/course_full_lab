#!/bin/sh
set -e

INIT_MARKER="/app/.initialized"
FORCE_INIT="${FORCE_INIT:-0}"

# Если маркер существует и не принудительная инициализация, пропускаем
if [ -f "$INIT_MARKER" ] && [ "$FORCE_INIT" != "1" ]; then
    echo "Container already initialized. Skipping initialization."
    echo "To force re-initialization, set environment variable FORCE_INIT=1"
    echo "Executing command: $@"
    exec "$@"
fi

echo "Cleaning /app directory (preserving node_modules)..."
cd /app
# Удаляем всё, кроме node_modules (включая скрытые файлы)
find . -maxdepth 1 ! -name '.' ! -name '..' ! -name 'node_modules' -exec rm -rf {} + 2>/dev/null || true

echo "Cloning repository from GitHub..."
# Клонируем во временную директорию
git clone https://github.com/AltmanEA/course_full_lab /tmp/repo
# Перемещаем содержимое временной директории в /app
cd /tmp/repo
find . -maxdepth 1 ! -name '.' ! -name '..' -exec cp -r {} /app \;
cd /app
rm -rf /tmp/repo

echo "Installing dependencies..."
npm install

echo "Installing vitest globally..."
npm install -g vitest

# Создаём маркер, что инициализация выполнена
touch "$INIT_MARKER"
echo "Initialization completed. Marker created at $INIT_MARKER"

echo "Entrypoint finished, executing command: $@"

# Выполняем оригинальную команду
exec "$@"