import type { Handle } from "@sveltejs/kit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext, trpcPathBase } from "$lib/trpc/context";
import appRouter from "$lib/trpc/routers/appRouter";

export const handle: Handle = async ({ event, resolve }) => {
    // Check if this is a request to the tRPC endpoint.
    if (event.url.pathname.startsWith(`${trpcPathBase}/`)) {
        const response = await fetchRequestHandler({
            endpoint: trpcPathBase,
            req: event.request,
            router: appRouter,
            createContext() {
                return createContext({
                    req: event.request,
                });
            },
        });

        return response;
    }

    return await resolve(event);
};
