# bauth20 — Полный защищённый mutation-flow

## Цель

Реализовать защищённую mutation,
объединяющую RBAC и ownership
с корректным разделением router и access-layer.

---

## Тип задачи

router + access-layer composition

---

## Задание

В файле `bauth20.ts` необходимо:

1. Реализовать функцию updateUser.
2. Принять:
   - ctx (с user)
   - targetUserId
   - operation
3. Реализовать следующую модель:

   Router-level:
     - если user отсутствует → UNAUTHORIZED
     - если роль не ADMIN → FORBIDDEN

   Access-level:
     - если user.id !== targetUserId → FORBIDDEN

4. При успешной проверке выполнить operation.

---

## Ограничения

- Нельзя дублировать проверки.
- Нельзя обращаться к БД.
- Нельзя использовать глобальный auth.
- Нельзя объединять ошибки.
- Нельзя менять порядок проверок.

---

## Проверяемые требования

- Нет user → UNAUTHORIZED.
- USER → FORBIDDEN.
- ADMIN + не владелец → FORBIDDEN.
- ADMIN + владелец → успех.
