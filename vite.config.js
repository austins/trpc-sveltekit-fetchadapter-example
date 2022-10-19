import { sveltekit } from "@sveltejs/kit/vite";

const port = 3000;

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    // The port isn't constant by default, so we set the port to 3000 for tRPC server-side fetches.
    server: { port },
    preview: { port },
};

export default config;
