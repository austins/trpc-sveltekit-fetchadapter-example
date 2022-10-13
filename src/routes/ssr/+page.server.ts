import { trpcSsr } from "$lib/trpc/routers/appRouter";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
    // We get the initial data by calling the tRPC procedure directly
    // from the server without any HTTP requests.
    const todos = await trpcSsr(request).todo.list();

    return { todos };
};
