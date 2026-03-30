# Руководство по переносу Docker-проекта на другой компьютер

Данное руководство описывает процесс переноса работающего набора контейнеров (Next.js приложение, Playwright тесты, PostgreSQL) с одного компьютера на другой **без пересборки образов**. Вы сохраните Docker-образы в архив, скопируете исходный код и тома данных, а затем восстановите окружение на целевой машине.

## Предварительные требования

- На исходном компьютере установлены Docker и Docker Compose.
- На целевом компьютере также установлены Docker и Docker Compose (версии должны быть совместимы).
- Достаточно свободного места для сохранения образов (около 6 ГБ).
- Сетевой доступ или внешний носитель для передачи файлов.

## Автоматизация с помощью PowerShell скриптов

Для удобства в проекте предусмотрены два скрипта:

- **`scripts/backup-project.ps1`** – выполняет весь шаг 1 (подготовка на исходном компьютере). Сохраняет образы, исходный код и тома в папку `backup`.
- **`scripts/restore-project.ps1`** – выполняет весь шаг 3 (восстановление на целевом компьютере). Загружает образы, восстанавливает тома и запускает контейнеры.

**Копии скриптов также помещаются в папку `backup`** при каждом выполнении резервного копирования, чтобы их можно было использовать на целевой машине без дополнительного копирования.

Использование скриптов значительно упрощает процесс и минимизирует ручные операции.

## Шаг 1: Подготовка на исходном компьютере

### 1.1. Остановите работающие контейнеры (опционально)

Чтобы избежать изменений во время копирования, можно остановить контейнеры:

```bash
docker-compose down
```

### 1.2. Запустите скрипт резервного копирования

В корне проекта выполните PowerShell-скрипт:

```powershell
.\scripts\backup-project.ps1
```

По умолчанию скрипт:
- Создаёт папку `backup` (если её нет).
- Сохраняет Docker-образы (`lab_next.tar`, `playwright.tar`, `postgres.tar`) в папку `backup`.
- Архивирует исходный код (исключая `node_modules`, `backup`, временные файлы) в `backup/project_source.tar.gz`.
- **Сохраняет тома** (`postgres_data`, `lab_next_node_modules`, `playwright_node_modules`) в `backup/` (архивы `*_backup.tar.gz`).
- **Не** останавливает контейнеры (если нужно, используйте флаг `-StopContainers`).
- **Не** создаёт общий zip-архив (только папку `backup`).

#### Параметры скрипта

- `-StopContainers` – перед сохранением остановить контейнеры.
- `-SkipVolumes` – **не** сохранять тома (по умолчанию тома сохраняются).
- `-BackupDir <путь>` – указать другую папку для резервных копий (по умолчанию `backup`).

Пример с остановкой контейнеров и пропуском томов:

```powershell
.\scripts\backup-project.ps1 -StopContainers -SkipVolumes
```

### 1.3. Ручное резервное копирование (если скрипт не используется)

Если вы предпочитаете выполнять шаги вручную, выполните следующие команды:

#### Сохраните Docker-образы

```bash
docker save -o lab_next.tar course_full_lab_lab_next
docker save -o playwright.tar course_full_lab_playwright
docker save -o postgres.tar postgres:18-alpine
```

#### Сохраните исходный код

Создайте архив проекта, исключив ненужные папки:

```bash
tar -czf project_source.tar.gz --exclude=node_modules --exclude=backup --exclude=*.tar .
```

#### Сохраните тома (опционально)

```bash
docker run --rm -v postgres_data:/source -v $(pwd):/backup alpine tar czf /backup/postgres_data_backup.tar.gz -C /source .
docker run --rm -v lab_next_node_modules:/source -v $(pwd):/backup alpine tar czf /backup/lab_next_node_modules_backup.tar.gz -C /source .
docker run --rm -v playwright_node_modules:/source -v $(pwd):/backup alpine tar czf /backup/playwright_node_modules_backup.tar.gz -C /source .
```

На Windows замените `$(pwd)` на `%cd%` или укажите полный путь.

## Шаг 2: Перенос файлов на целевой компьютер

Скопируйте следующие файлы на целевой компьютер (через USB, сеть, облако и т.д.):

1. **Всю папку `backup`** (содержит образы, исходный код, тома и копии скриптов).
2. Файлы конфигурации, которые не попали в архив (если нужно):
   - `docker-compose.yml`
   - `.env` (если используется, убедитесь, что он не содержит секретов в открытом виде)

Рекомендуется скопировать папку `backup` целиком, так как она содержит все необходимые архивы.

## Шаг 3: Восстановление на целевом компьютере

### 3.1. Подготовка рабочей директории

Создайте на целевом компьютере рабочую директорию (например, `d:\courses\course_full_lab`) и поместите туда:
- содержимое проекта (исходный код, если не был распакован);
- папку `backup` (или распакуйте общий архив);
- файлы `docker-compose.yml`, `.env` (если есть).

### 3.2. Запустите скрипт восстановления

В корне проекта выполните:

```powershell
.\scripts\restore-project.ps1
```

Если скрипт `restore-project.ps1` отсутствует в `scripts/`, его можно найти в папке `backup` и запустить оттуда:

```powershell
.\backup\restore-project.ps1
```

По умолчанию скрипт:
- Загружает Docker-образы из папки `backup`.
- Проверяет наличие образов.
- **Автоматически распаковывает архив исходного кода** (`project_source.tar.gz`) в текущую директорию.
- **Не** восстанавливает тома (используйте `-RestoreVolumes`, если нужно).
- Запускает контейнеры (`docker-compose up -d`).

#### Параметры скрипта

- `-BackupDir <путь>` – указать другую папку с резервными копиями (по умолчанию `backup`).
- `-RestoreVolumes` – восстановить данные томов из архивов.
- `-StartContainers:$false` – не запускать контейнеры автоматически.

Пример с восстановлением томов:

```powershell
.\scripts\restore-project.ps1 -RestoreVolumes
```

### 3.3. Ручное восстановление (если скрипт не используется)

#### Загрузите Docker-образы

```bash
docker load -i backup/lab_next.tar
docker load -i backup/playwright.tar
docker load -i backup/postgres.tar   # если файл есть
```

#### Восстановите тома (если нужно)

```bash
docker volume create postgres_data
docker volume create lab_next_node_modules
docker volume create playwright_node_modules

docker run --rm -v postgres_data:/target -v $(pwd)/backup:/backup alpine tar xzf /backup/postgres_data_backup.tar.gz -C /target
docker run --rm -v lab_next_node_modules:/target -v $(pwd)/backup:/backup alpine tar xzf /backup/lab_next_node_modules_backup.tar.gz -C /target
docker run --rm -v playwright_node_modules:/target -v $(pwd)/backup:/backup alpine tar xzf /backup/playwright_node_modules_backup.tar.gz -C /target
```

#### Запустите контейнеры

```bash
docker-compose up -d
```

### 3.4. Проверка работоспособности

- Приложение доступно по адресу [http://localhost:3000](http://localhost:3000)
- База данных доступна на localhost:5432
- Playwright контейнер готов к запуску тестов:

```bash
docker exec course_full_lab_playwright_1 npx playwright test --list
```

## Шаг 4: Дополнительные настройки

### Изменение портов

Если на целевом компьютере порты 3000 или 5432 заняты, отредактируйте `docker-compose.yml` и измените маппинг портов:

```yaml
ports:
  - "3001:3000"   # вместо 3000:3000
```

### Обновление исходного кода

Если вы продолжите разработку на целевом компьютере, изменения в исходном коде будут автоматически подхватываться благодаря монтированию тома (`.:/app`). Однако изменения в `package.json` потребуют пересборки образа или переустановки зависимостей внутри контейнера.

## Устранение неполадок

### Ошибка «No such image»

Убедитесь, что образы загружены и имеют правильные имена. Проверьте:

```bash
docker images | grep course_full_lab
```

Если образы отсутствуют, выполните `docker load` повторно.

### Ошибка «port is already allocated»

Измените порты в `docker-compose.yml` или освободите занятый порт.

### Ошибка «volume not found»

Тома будут созданы автоматически при первом запуске `docker-compose up`. Если нужно сохранить данные, предварительно создайте тома, как описано выше.

### Ошибка «permission denied» при монтировании томов на Linux

На Linux могут быть проблемы с правами на запись в тома, созданные из архива. Решение: запустить контейнер с правильным пользователем или изменить владельца тома.

### Скрипт не выполняется из-за политики выполнения

На Windows может быть запрещено выполнение PowerShell скриптов. Разрешите выполнение:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Или запустите скрипт с флагом:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\backup-project.ps1
```

## Заключение

Вы успешно перенесли Docker-проект на другой компьютер без пересборки образов. Теперь вы можете продолжить разработку и тестирование в новом окружении.

Для дальнейших обновлений можно повторять шаги 1–3, либо использовать реестр Docker (например, Docker Hub) для централизованного хранения образов.

---
*Последнее обновление: 2026-03-27*