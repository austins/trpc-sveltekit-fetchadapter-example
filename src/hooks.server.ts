import type { Handle } from "@sveltejs/kit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { Context } from "$lib/trpc/context.server";
import { appRouter } from "$lib/trpc/routers/appRouter.server";
import { trpcPathBase } from "$lib/trpc/config";

export const handle: Handle = async ({ event, resolve }) => {
    // Check if this is a request to the tRPC endpoint.
    if (
        event.url.pathname.startsWith(`${trpcPathBase}/`) &&
        (event.request.method === "GET" || event.request.method === "POST")
    ) {
        return await fetchRequestHandler({
            endpoint: trpcPathBase,
            req: event.request,
            router: appRouter,
            createContext: (): Context => ({ req: event.request }),
        });
    }

    return await resolve(event);
};
