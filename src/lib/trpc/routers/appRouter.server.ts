import type { Context } from "../context.server";
import { router } from "../trpc.server";
import { todoRouter } from "./todoRouter.server";

export const appRouter = router({
    todo: todoRouter,
});

export type AppRouter = typeof appRouter;

export function trpcSsr(context: Context) {
    return appRouter.createCaller(context);
}
