import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

// TODO:
// 1. Создайте appRouter
// 2. Добавьте mutation-процедуру "setName"
// 3. name не должен быть пустой строкой
// 4. Возвращать { status: "ok", name }