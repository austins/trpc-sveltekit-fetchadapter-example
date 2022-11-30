import { trpcClient } from "$lib/trpc/trpcClient";
import type { PageLoad } from "./$types";

/**
 * We pass SvelteKit's load fetch to our trpcClient so it can
 * fetch server-side with an HTTP request on the initial page request and
 * client-side for when the page is navigated to client-side on subsequent page requests.
 *
 * Top-level promises will be awaited, which makes it easy to return
 * multiple promises without creating a waterfall.
 * {@link https://kit.svelte.dev/docs/load#output}
 */
export const load: PageLoad = ({ fetch }) => ({ todos: trpcClient(fetch).todo.list.query() });
