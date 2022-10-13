import { router } from "../server";
import { todoRouter } from "./todoRouter";

export const appRouter = router({
    todo: todoRouter,
});

export type AppRouter = typeof appRouter;
