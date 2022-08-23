import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    // The port isn't constant by default, so we set the port to 3000 for tRPC server-side fetches.
    server: { port: 3000 },
};

export default config;
