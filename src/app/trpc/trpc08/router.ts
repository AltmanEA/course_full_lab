import { router, publicProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

// TODO:
// 1. Создайте middleware, проверяющее ctx.requestId
// 2. Если requestId отсутствует — выбросьте ошибку
// 3. Добавьте query-процедуру "info", использующую middleware