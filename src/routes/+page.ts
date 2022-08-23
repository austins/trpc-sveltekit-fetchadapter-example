import trpcClient from "$lib/trpc/trpcClient";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    // We pass SvelteKit's load fetch to our trpcClient so it can
    // fetch server-side on the initial page request and
    // client-side for when the page is navigated to client-side.
    const todos = await trpcClient(fetch).todo.list.query();

    return { todos };
};
