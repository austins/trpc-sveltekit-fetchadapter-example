import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";
import { ZodError } from "zod";
import appRouter from "./routers/appRouter";

export const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === "BAD_REQUEST" && error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export function trpcSsr(req: Request) {
    return appRouter.createCaller({ req });
}
