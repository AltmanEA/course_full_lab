# Руководство по переносу Docker-проекта на другой компьютер

Данное руководство описывает процесс переноса работающего набора контейнеров (Next.js приложение, Playwright тесты, PostgreSQL) с одного компьютера на другой **без пересборки образов**. Вы сохраните Docker-образы в архив, скопируете исходный код и тома данных, а затем восстановите окружение на целевой машине.

## Предварительные требования

- На исходном компьютере установлены Docker и Docker Compose.
- На целевом компьютере также установлены Docker и Docker Compose (версии должны быть совместимы).
- Достаточно свободного места для сохранения образов (около 6 ГБ).
- Сетевой доступ или внешний носитель для передачи файлов.

## Шаг 1: Подготовка на исходном компьютере

Выполните следующие команды в PowerShell в корне проекта.

### Сохраните Docker-образы

```powershell
docker save -o lab_next.tar course_full_lab_lab_next
docker save -o playwright.tar course_full_lab_playwright
docker save -o postgres.tar postgres:18-alpine
```

### Сохраните исходный код

Архив исходного кода содержит все файлы проекта (конфигурации, исходники, тесты), необходимые для работы контейнеров и дальнейшей разработки. Исключены только тяжёлые или временные папки.

```powershell
tar -czf project_source.tar.gz --exclude=node_modules --exclude=backup --exclude=*.tar .
```

> **Зачем это нужно:** Docker-образы уже содержат собранное приложение, но исходный код требуется для монтирования тома (`.:/app`), внесения изменений, запуска тестов и работы с конфигурационными файлами.

### Сохраните тома (рекомендуется)

Тома содержат данные PostgreSQL и зависимости Playwright. Если вы хотите сохранить состояние базы данных и избежать повторной установки зависимостей, выполните:

```powershell
docker run --rm -v postgres_data:/source -v "${PWD}:/backup" alpine tar czf /backup/postgres_data_backup.tar.gz -C /source .
docker run --rm -v playwright_node_modules:/source -v "${PWD}:/backup" alpine tar czf /backup/playwright_node_modules_backup.tar.gz -C /source .
```

> **Примечание:** Том `lab_next_node_modules` больше не используется, так как зависимости Next.js приложения теперь включены в образ `lab_next`.

Если вы готовы начать с пустой базы данных и переустановить зависимости Playwright, этот шаг можно пропустить.

### Создайте папку backup и переместите архивы

```powershell
mkdir -Force backup
Move-Item lab_next.tar, playwright.tar, postgres.tar, project_source.tar.gz, *_backup.tar.gz -Destination backup -ErrorAction SilentlyContinue
```

## Шаг 2: Перенос файлов на целевой компьютер

Скопируйте всю папку `backup` на целевой компьютер (через USB, сеть, облако и т.д.). Также скопируйте файлы конфигурации, которые не попали в архив:

- `docker-compose.yml` (или `docker-compose.transfer.yml` для использования готовых образов)
- `.env` (если используется, убедитесь, что он не содержит секретов в открытом виде)

Рекомендуется скопировать папку `backup` целиком, так как она содержит все необходимые архивы.

## Шаг 3: Восстановление на целевом компьютере

На целевом компьютере создайте рабочую директорию (например, `d:\courses\course_full_lab`) и поместите туда содержимое проекта (исходный код, если не был распакован), папку `backup` и файлы `docker-compose.yml`, `.env`.

### Загрузите Docker-образы

```powershell
docker load -i backup/lab_next.tar
docker load -i backup/playwright.tar
docker load -i backup/postgres.tar   # если файл есть
```

### Восстановите тома (если сохраняли)

Если вы сохранили тома на шаге 1, выполните:

```powershell
docker volume create postgres_data
docker volume create playwright_node_modules

docker run --rm -v postgres_data:/target -v "${PWD}/backup:/backup" alpine tar xzf /backup/postgres_data_backup.tar.gz -C /target
docker run --rm -v playwright_node_modules:/target -v "${PWD}/backup:/backup" alpine tar xzf /backup/playwright_node_modules_backup.tar.gz -C /target
```

> **Примечание:** Том `lab_next_node_modules` больше не используется, так как зависимости Next.js приложения теперь включены в образ `lab_next`. Восстанавливать его не нужно.

Если тома не сохранялись, они будут созданы автоматически при запуске контейнеров (база данных будет пустой, зависимости Playwright установятся заново).

### Запустите контейнеры

```powershell
docker-compose up -d
```

Если вы хотите использовать уже загруженные образы без сборки, выполните:

```powershell
docker-compose -f docker-compose.transfer.yml up -d
```

## Шаг 4: Проверка работоспособности

- Приложение доступно по адресу [http://localhost:3000](http://localhost:3000)
- База данных доступна на localhost:5432
- Playwright контейнер готов к запуску тестов:

```powershell
docker exec course_full_lab_playwright_1 npx playwright test --list
```

## Альтернатива: использование скриптов

Для автоматизации процесса в проекте предусмотрены два скрипта:

- **`scripts/backup-project.ps1`** – выполняет весь шаг 1 (подготовка на исходном компьютере).
- **`scripts/restore-project.ps1`** – выполняет весь шаг 3 (восстановление на целевом компьютере).

Использование скриптов значительно упрощает процесс и минимизирует ручные операции. Запустите их в PowerShell:

```powershell
.\scripts\backup-project.ps1
.\scripts\restore-project.ps1
```

---

*Последнее обновление: 2026-04-03*