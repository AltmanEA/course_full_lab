# Docker-инфраструктура для запуска Playwright тестов

Данный проект использует Docker Compose для изолированного запуска Next.js приложения и end-to-end тестов Playwright. Инфраструктура состоит из трёх сервисов:

- **postgres** — база данных PostgreSQL 18 (для работы приложения)
- **lab_next** — контейнер с Next.js приложением (сборка на основе `node:20-alpine`)
- **playwright** — контейнер с Playwright для запуска e2e-тестов (основан на официальном образе Playwright)

## Быстрый старт

1. Убедитесь, что установлены Docker и Docker Compose.
2. В корне проекта выполните:
   ```bash
   docker-compose up -d
   ```
   Это соберёт образы (если нужно) и запустит все три сервиса в фоновом режиме.

3. После запуска приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000), база данных — на localhost:5432.

4. Для запуска Playwright тестов внутри контейнера `playwright` используйте команду:
   ```bash
   npm run test:e2e:docker
   ```
   или напрямую:
   ```bash
   docker exec course_full_lab_playwright_1 npx playwright test [опции]
   ```

## Структура файлов

- `Dockerfile.lab_next` — сборка основного приложения
- `Dockerfile.playwright` — сборка контейнера с Playwright
- `docker-compose.yml` — конфигурация сервисов, сетей и томов
- `.devcontainer/devcontainer.json` — конфигурация Dev Container для VSCode
- `scripts/save-images.ps1` и `scripts/load-images.ps1` — PowerShell скрипты для переноса образов между компьютерами

## Настройка

### Контейнер lab_next
- Основан на `node:20-alpine`
- Установлены Git и Docker CLI (для выполнения `docker exec` изнутри контейнера)
- Весь исходный код монтируется в `/app` (режим разработки)
- Зависимости устанавливаются через `npm ci`
- Запускается командой `npx next dev` (сервер на порту 3000)
- Для корректной работы Hot Module Replacement в Docker окружении настроены переменные среды:
  - `CHOKIDAR_USEPOLLING=true`, `CHOKIDAR_INTERVAL=1000`
  - `WATCHPACK_POLLING=true`
  - `NEXT_WEBPACK_USEPOLLING=1`
  - `TURBO=0` (отключение Turbo режима)

### Контейнер playwright
- Основан на `mcr.microsoft.com/playwright:v1.58.2-jammy`
- Установлены только `@playwright/test` и `playwright` (без лишних зависимостей)
- Исходный код монтируется в `/app` (только для чтения)
- По умолчанию контейнер держится активным (`tail -f /dev/null`), чтобы можно было выполнять команды

### Сеть
Сервисы объединены в сеть `lab_network`, что позволяет обращаться к контейнерам по именам сервисов:
- `lab_next:3000` — Next.js приложение
- `postgres:5432` — база данных

## Запуск тестов

### Прямой вызов через docker exec
```bash
docker exec course_full_lab_playwright_1 npx playwright test [путь_к_тесту] [опции]
```

Примеры:
```bash
docker exec course_full_lab_playwright_1 npx playwright test src/app/nextjs/nextjs01/nextjs01.spec.ts
docker exec course_full_lab_playwright_1 npx playwright test --grep "nextjs01"
docker exec course_full_lab_playwright_1 npx playwright test --ui
docker exec course_full_lab_playwright_1 npx playwright test --headed
```

### Конфигурация Playwright
Настройки находятся в `playwright.config.ts`:
- `baseURL: 'http://lab_next:3000'` — базовый URL для относительных путей
- `outputDir: '/tmp/playwright-output'` — директория для артефактов (том монтируется)
- `webServer` отключён, так как приложение уже запущено в отдельном контейнере

## Разработка внутри контейнера (Dev Container)

Проект настроен для использования VSCode Dev Containers. При открытии в VSCode с установленным расширением «Remote – Containers» можно подключиться к контейнеру `lab_next` и работать в изолированной среде.

Конфигурация Dev Container включает:
- Автоматический запуск сервисов (postgres, lab_next, playwright)
- Установку расширений VSCode (включая Examenator)
- Настройки для удобной разработки

## Перенос образов между компьютерами

Для экономии времени на повторную сборку образов можно сохранить их в архив и загрузить на другом компьютере.

### Сохранение образов
Выполните PowerShell скрипт (на Windows):
```powershell
.\scripts\save-images.ps1
```
Или вручную:
```bash
docker save -o lab_next.tar course_full_lab_lab_next
docker save -o playwright.tar course_full_lab_playwright
docker save -o postgres.tar postgres:18-alpine
```

### Загрузка образов
```powershell
.\scripts\load-images.ps1
```
Или вручную:
```bash
docker load -i lab_next.tar
docker load -i playwright.tar
docker load -i postgres.tar
```

## Устранение неполадок

### Ошибка «Cannot find package 'vitest'»
Playwright пытается запустить unit-тесты, которые используют Vitest. Игнорируйте эти ошибки или запускайте тесты с фильтром по конкретному пути.

### Ошибка «ERR_CONNECTION_REFUSED» при запуске тестов
Тесты используют `http://localhost:3000`, но внутри контейнера playwright localhost не указывает на lab_next. Пока эта проблема не решена (пользователь перепишет тесты в другой сессии). Временное решение — использовать `extra_hosts` (нестабильно) или изменить тесты на относительные пути.

### Ошибка «invalid IP address in add-host»
Возникает при некорректном формате `extra_hosts`. Убедитесь, что в `docker-compose.yml` нет ошибочных записей.

### Ошибка «client version 1.52 is too new. Maximum supported API version is 1.41»
Возникает при несовместимости версии Docker CLI внутри контейнера `lab_next` с Docker демоном на хосте. Решение:
- В `Dockerfile.lab_next` установлена фиксированная версия Docker CLI 28.0.0, совместимая с Docker Engine 28.4.0.
- Убедитесь, что образ пересобран (`docker-compose build lab_next`).
- Если ошибка сохраняется, проверьте версию Docker Engine на хосте и при необходимости обновите её.

### Контейнеры не запускаются из-за конфликта портов
Убедитесь, что порты 3000 и 5432 свободны. Измените маппинг портов в `docker-compose.yml` при необходимости.

### Проблема: Dev server не обновляет страницу после изменения файлов
При работе в Docker на Windows (или при использовании монтированных томов) Next.js dev server может не обнаруживать изменения файлов, из-за чего Playwright тесты получают устаревшее содержимое страницы.

**Решение:**
В конфигурацию сервиса `lab_next` добавлены переменные окружения, включающие polling для отслеживания изменений файлов:
- `CHOKIDAR_USEPOLLING=true`
- `CHOKIDAR_INTERVAL=1000`
- `WATCHPACK_POLLING=true`
- `NEXT_WEBPACK_USEPOLLING=1`
- `TURBO=0` (отключает Turbo режим, который может конфликтовать с polling)

Также команда запуска изменена на `npx next dev` (без `--turbo`), чтобы гарантировать работу HMR.

После внесения этих изменений перезапустите контейнеры:
```bash
docker-compose down
docker-compose up -d
```

Проверьте, что при изменении файла `page.tsx` и последующем обращении к странице изменения отображаются.

## Остановка и очистка

Остановить все контейнеры:
```bash
docker-compose down
```

Удалить тома (включая node_modules и данные PostgreSQL):
```bash
docker-compose down -v
```

Удалить собранные образы:
```bash
docker rmi course_full_lab_lab_next course_full_lab_playwright
```

## Примечания

- Все зависимости (включая devDependencies) установлены в контейнере `lab_next`. Контейнер `playwright` содержит только Playwright.
- Для ускорения сборки используется кэширование node_modules через Docker volumes (`lab_next_node_modules`, `playwright_node_modules`).
- При изменении `package.json` необходимо пересобрать образы (`docker-compose build`).

---

Инфраструктура готова к использованию. Для детальной настройки под свои нужды отредактируйте соответствующие конфигурационные файлы.