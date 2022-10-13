import { createTRPCProxyClient, loggerLink, httpBatchLink, TRPCClientError } from "@trpc/client";
import type { AppRouter } from "./routers/appRouter";
import type { LoadEvent } from "@sveltejs/kit";
import superjson from "superjson";
import { browser, dev } from "$app/environment";
import { trpcPathBase } from "./context";

export const trpc = (loadFetch?: LoadEvent["fetch"]) =>
    createTRPCProxyClient<AppRouter>({
        links: [
            loggerLink({ enabled: () => dev }),
            httpBatchLink({
                // The port isn't constant by default, so we have set it to 3000 in vite.config.js for tRPC server-side fetches.
                url: loadFetch || browser ? trpcPathBase : `http://localhost:3000${trpcPathBase}`,
                ...(loadFetch && { fetch: loadFetch }),
            }),
        ],
        transformer: superjson,
    });

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
    return cause instanceof TRPCClientError;
}
