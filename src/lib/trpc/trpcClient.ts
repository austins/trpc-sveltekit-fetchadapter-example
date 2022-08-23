import { createTRPCProxyClient, dedupeLink, loggerLink, httpBatchLink, TRPCClientError } from "@trpc/client";
import type { AppRouter } from "./routers/appRouter";
import type { LoadEvent } from "@sveltejs/kit";
import superjson from "superjson";
import { browser } from "$app/env";
import { trpcPathBase } from "./context";
import { dev } from "$app/env";

export default (loadFetch?: LoadEvent["fetch"]) => {
    return createTRPCProxyClient<AppRouter>({
        links: [
            dedupeLink(),
            loggerLink({
                enabled: () => {
                    return dev;
                },
            }),
            httpBatchLink({
                // The port isn't constant by default, so we have set it to 3000 in vite.config.js for tRPC server-side fetches.
                url: loadFetch || browser ? trpcPathBase : `http://localhost:3000${trpcPathBase}`,
            }),
        ],
        transformer: superjson,
        ...(loadFetch && { fetch: loadFetch as typeof fetch }),
    });
};

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
    return cause instanceof TRPCClientError;
}
