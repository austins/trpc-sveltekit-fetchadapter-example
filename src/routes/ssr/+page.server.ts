import { trpcSsr } from "$lib/trpc/routers/appRouter.server";
import type { PageServerLoad } from "./$types";

/**
 * We get the initial data by calling the tRPC procedure directly
 * from the server without any HTTP requests.
 *
 * Top-level promises will be awaited, which makes it easy to return
 * multiple promises without creating a waterfall.
 * {@link https://kit.svelte.dev/docs/load#output}
 */
export const load: PageServerLoad = ({ request }) => ({ todos: trpcSsr({ req: request }).todo.list() });
