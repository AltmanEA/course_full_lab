# trpc27 — Domain error normalization

## Цель задачи

Освоить нормализацию доменных ошибок на уровне API-процедуры.

Студент должен понять различие между:

- доменной ошибкой (EntityNotFoundError);
- API-ошибкой (TRPCError).

## Тип задачи

Функциональная (domain error → API error).

## Задание

Реализуйте процедуру `getItem`, которая:

- принимает input { id: string };
- если id === '1' — возвращает строку "item-1";
- если id !== '1' — выбрасывает EntityNotFoundError;
- затем перехватывает эту ошибку и преобразует её
  в createNotFoundError('Item').

Нельзя допускать утечки EntityNotFoundError наружу.

## Ограничения

- Не использовать TRPCError напрямую.
- Использовать EntityNotFoundError из _core/errors.
- Использовать createNotFoundError.
- Не использовать any.
- Не изменять _core.
- Не создавать middleware.

## Проверяемые требования

- id = '1' → возвращается "item-1".
- id ≠ '1' → выбрасывается TRPCError с code NOT_FOUND.
- EntityNotFoundError не выходит за пределы процедуры.