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


### Сохраните тома (рекомендуется)

Тома содержат данные PostgreSQL, зависимости Playwright и исходный код приложения. Если вы хотите сохранить состояние базы данных, зависимости и исходный код, выполните:

```powershell
docker run --rm -v postgres_data:/source -v "${PWD}:/backup" postgres:18-alpine tar czf /backup/postgres_data_backup.tar.gz -C /source .
docker run --rm -v playwright_node_modules:/source -v "${PWD}:/backup" postgres:18-alpine tar czf /backup/playwright_node_modules_backup.tar.gz -C /source .
docker run --rm -v app_source:/source -v "${PWD}:/backup" postgres:18-alpine tar czf /backup/app_source_backup.tar.gz -C /source .
```

Если вы готовы начать с пустой базы данных, переустановить зависимости Playwright и скопировать исходный код из образа (при первом запуске том будет автоматически заполнен), этот шаг можно пропустить.

### Создайте папку backup и переместите архивы

```powershell
mkdir -Force backup
Move-Item lab_next.tar, playwright.tar, postgres.tar, *_backup.tar.gz -Destination backup -ErrorAction SilentlyContinue
```

## Шаг 2: Перенос файлов на целевой компьютер

Скопируйте всю папку `backup` на целевой компьютер (через USB, сеть, облако и т.д.). Также скопируйте файлы конфигурации, которые не попали в архив:

- `docker-compose.yml` (или `docker-compose.transfer.yml` для использования готовых образов)
- `.env` (если используется, убедитесь, что он не содержит секретов в открытом виде)

Рекомендуется скопировать папку `backup` целиком, так как она содержит все необходимые архивы.

## Шаг 3: Восстановление на целевом компьютере

На целевом компьютере создайте рабочую директорию (например, `d:\courses\course_full_lab`) и поместите туда папку `backup` и файлы `docker-compose.yml`, `.env`.

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
docker volume create app_source

docker run --rm -v postgres_data:/target -v "${PWD}/backup:/backup" postgres:18-alpine tar xzf /backup/postgres_data_backup.tar.gz -C /target
docker run --rm -v playwright_node_modules:/target -v "${PWD}/backup:/backup" postgres:18-alpine tar xzf /backup/playwright_node_modules_backup.tar.gz -C /target
docker run --rm -v app_source:/target -v "${PWD}/backup:/backup" postgres:18-alpine tar xzf /backup/app_source_backup.tar.gz -C /target
```

Если тома не сохранялись, они будут созданы автоматически при запуске контейнеров (база данных будет пустой, зависимости Playwright установятся заново, а исходный код будет скопирован из образа `lab_next`).

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

### Запуск конкретного теста

Если вы хотите запустить конкретный тест, укажите полный путь относительно корня проекта (внутри контейнера это `/app`). Например, для теста `nextjs01`:

```powershell
docker exec course_full_lab_playwright_1 npx playwright test src/app/nextjs/nextjs01/nextjs01.spec.ts
```

**Примечание:** Команда `docker exec course_full_lab_playwright npx playwright test nextjs01/nextjs01.spec` приведёт к ошибке "No tests found", потому что Playwright ищет тесты в директории `src/app` (как указано в `playwright.config.ts`), и путь должен быть либо `src/app/nextjs/nextjs01/nextjs01.spec.ts`, либо `nextjs/nextjs01/nextjs01.spec.ts` (относительно `src/app`).

Чтобы использовать короткий путь `nextjs01/nextjs01.spec`, можно создать симлинк в корне проекта внутри контейнера:

```powershell
docker exec course_full_lab_playwright_1 ln -sf /app/src/app/nextjs/nextjs01 /app/nextjs01
```

После этого команда `docker exec course_full_lab_playwright_1 npx playwright test nextjs01/nextjs01.spec` будет работать.

---


*Последнее обновление: 2026-04-09*