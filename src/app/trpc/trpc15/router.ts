import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

// TODO:
// 1. Создайте appRouter
// 2. Добавьте mutation "deleteUser"
// 3. Используйте ctx.dataAccess.deleteUser
// 4. Верните { success }