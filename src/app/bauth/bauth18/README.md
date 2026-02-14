# bauth18 — Разделение UNAUTHORIZED и FORBIDDEN

## Цель

Реализовать корректную семантику ошибок авторизации:

- UNAUTHORIZED — пользователь отсутствует
- FORBIDDEN — прав недостаточно

---

## Тип задачи

architecture / errors

---

## Задание

В файле `bauth18.ts` необходимо:

1. Создать функцию checkAccess.
2. Принять:
   - userId (string | null)
   - hasPermission (boolean)
3. Если userId отсутствует — выбросить UNAUTHORIZED.
4. Если hasPermission === false — выбросить FORBIDDEN.
5. Иначе вернуть true.

---

## Ограничения

- Нельзя объединять ошибки.
- Нельзя выбрасывать обычный Error.
- Нельзя проверять текст сообщения.
- Нельзя использовать глобальное состояние.

---

## Проверяемые требования

- userId = null → UNAUTHORIZED.
- hasPermission = false → FORBIDDEN.
- Успешный сценарий возвращает true.
