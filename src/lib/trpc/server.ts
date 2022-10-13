import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";
import { appRouter } from "./routers/appRouter";

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export function trpcSsr(req: Request) {
    return appRouter.createCaller({ req });
}
