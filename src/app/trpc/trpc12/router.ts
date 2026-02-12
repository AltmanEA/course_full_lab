import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

// TODO:
// 1. Создайте appRouter
// 2. Добавьте mutation "createUser"
// 3. Используйте ctx.dataAccess.createUser
// 4. Верните { id }