import { createTRPCProxyClient, TRPCClientError, loggerLink, httpLink } from "@trpc/client";
import type { AppRouter } from "./routers/appRouter.server";
import type { LoadEvent } from "@sveltejs/kit";
import { browser, dev } from "$app/environment";
import { trpcPathBase } from "./config";
import { transformer } from "./transformer";

export const trpcClient = (loadFetch?: LoadEvent["fetch"]) =>
    createTRPCProxyClient<AppRouter>({
        links: [
            loggerLink({ enabled: () => dev }),
            httpLink({
                // The port isn't constant by default, so we have set it to 3000 in vite.config.js for tRPC server-side fetches.
                url: loadFetch || browser ? trpcPathBase : `http://localhost:3000${trpcPathBase}`,
                ...(loadFetch && { fetch: loadFetch }),
            }),
        ],
        transformer,
    });

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
    return cause instanceof TRPCClientError;
}
