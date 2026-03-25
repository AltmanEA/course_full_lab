#!/usr/bin/env node

/**
 * Скрипт для запуска Playwright тестов в контейнере playwright из контейнера lab_next.
 * Использование: node scripts/run-playwright.js [аргументы playwright]
 */

import { execSync } from 'child_process';

const SERVICE_NAME = 'course_full_lab-playwright-1';

function runCommand(cmd) {
  console.log(`> ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    return { success: true };
  } catch (error) {
    console.error(`Команда завершилась с ошибкой: ${error.status}`);
    process.exit(error.status || 1);
  }
}

function ensureContainerRunning() {
  console.log('Проверка контейнера playwright...');
  try {
    execSync(`docker ps --filter "name=${SERVICE_NAME}" --format "{{.Names}}" | grep "${SERVICE_NAME}"`, { stdio: 'pipe' });
    console.log('Контейнер playwright запущен.');
  } catch (e) {
    console.log('Контейнер playwright не запущен. Запускаем...');
    runCommand('docker-compose up -d playwright');
    // Дадим контейнеру немного времени на запуск
    setTimeout(() => {}, 2000);
  }
}

function main() {
  const args = process.argv.slice(2).join(' ');
  ensureContainerRunning();
  console.log(`Запуск playwright test с аргументами: ${args || '(без аргументов)'}`);
  runCommand(`docker exec -it ${SERVICE_NAME} npx playwright test ${args}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}