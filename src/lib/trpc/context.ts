import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

// You can extend the Context to add things such as PrismaClient and a user session.
export type Context = FetchCreateContextFnOptions;
