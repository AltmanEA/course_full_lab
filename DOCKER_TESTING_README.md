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

## Настройка

### Контейнер lab_next
- Основан на `node:20` (Debian)
- Установлены Git и Docker CLI версии 28.0.0 (для выполнения `docker exec` изнутри контейнера)
- Весь исходный код монтируется в `/app` (режим разработки)
- Зависимости устанавливаются через `npm install`
- Запускается командой `npx next dev` (сервер на порту 3000)
- Для корректной работы Hot Module Replacement в Docker окружении настроены переменные среды:
  - `CHOKIDAR_USEPOLLING=true`, `CHOKIDAR_INTERVAL=1000`
  - `WATCHPACK_POLLING=true`
  - `NEXT_WEBPACK_USEPOLLING=1`
  - `TURBO=0` (отключение Turbo режима)
- Использует entrypoint-скрипт `docker-entrypoint.sh`, который принудительно очищает папку `/app` (сохраняя `node_modules`), клонирует репозиторий из GitHub и устанавливает зависимости.

### Контейнер playwright
- Основан на `mcr.microsoft.com/playwright:v1.58.2-jammy`
- Установлены `@playwright/test@1.58.2` и `playwright@1.58.2`
- Исходный код монтируется в `/app`
- По умолчанию контейнер держится активным (`tail -f /dev/null`), чтобы можно было выполнять команды

### Сеть
Сервисы объединены в сеть `lab_network`, что позволяет обращаться к контейнерам по именам сервисов:
- `lab_next:3000` — Next.js приложение
- `postgres:5432` — база данных

## Запуск тестов

#### Прямой вызов через docker exec
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

### Обновление контейнеров при изменении исходных кодов

#### Обновление только контейнера lab_next (при изменениях в исходном коде)

При изменении файлов проекта (например, `page.tsx`, `README.md`, тестов) контейнер `lab_next` автоматически подхватывает изменения благодаря монтированию тома `app_source`. Однако для применения изменений в зависимостях или Docker-конфигурации требуется пересборка.

**Если изменился только исходный код (файлы в `src/`, `public/` и т.д.):**
- Контейнер `lab_next` автоматически отслеживает изменения благодаря polling-настройкам
- Пересборка не требуется — изменения применяются сразу

**Если изменились `package.json`, `Dockerfile.lab_next` или другие файлы сборки:**
```bash
# Остановить только контейнер lab_next
docker-compose stop lab_next

# Пересобрать образ lab_next без пересборки playwright
docker-compose build --no-cache lab_next

# Запустить контейнер заново
docker-compose start lab_next
```

Или проще — перезапустить один сервис:
```bash
docker-compose up -d --build lab_next
```

#### Обновление только контейнера playwright (при изменениях в тестах)

Если изменились только файлы тестов (`*.spec.ts`), контейнер `playwright` автоматически подхватит их через монтированный том. Пересборка не требуется.

**Если изменился `Dockerfile.playwright` или зависимости Playwright:**
```bash
# Пересобрать только контейнер playwright
docker-compose build playwright

# Перезапустить контейнер
docker-compose up -d playwright
```

#### Обновление обоих контейнеров

```bash
# Пересобрать оба контейнера
docker-compose build

# Запустить все сервисы
docker-compose up -d
```

#### Проверка актуальности контейнеров

Проверьте версии образов:
```bash
docker-compose images
```

Убедитесь, что контейнеры используют последние изменения:
```bash
docker-compose ps
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

```bash
docker save -o lab_next.tar course_full_lab_lab_next
docker save -o playwright.tar course_full_lab_playwright
docker save -o postgres.tar postgres:18-alpine
```

### Загрузка образов

```bash
docker load -i lab_next.tar
docker load -i playwright.tar
docker load -i postgres.tar
```

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