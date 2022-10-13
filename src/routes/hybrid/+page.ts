import { trpc } from "$lib/trpc/trpc";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    // We pass SvelteKit's load fetch to our trpcClient so it can
    // fetch server-side with an HTTP request on the initial page request and
    // client-side for when the page is navigated to client-side on subsequent page requests.
    const todos = await trpc(fetch).todo.list.query();

    return { todos };
};
