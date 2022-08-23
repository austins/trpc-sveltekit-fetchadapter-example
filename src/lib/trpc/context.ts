import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const trpcPathBase = "/api/trpc";

// You can extend the Context to add things such as PrismaClient and a user session.
export type Context = FetchCreateContextFnOptions;

export function createContext(context: Context): Context {
    return context;
}
