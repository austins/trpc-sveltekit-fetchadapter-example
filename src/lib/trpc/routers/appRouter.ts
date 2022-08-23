import { t } from "../server";
import todoRouter from "./todoRouter";

const appRouter = t.router({
    todo: todoRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
