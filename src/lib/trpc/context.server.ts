import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

// You can extend the Context to add things such a user session.
export type Context = FetchCreateContextFnOptions;
