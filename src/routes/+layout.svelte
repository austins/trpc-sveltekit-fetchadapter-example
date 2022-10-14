<script lang="ts">
    import "../app.css";
    import NavLink from "$lib/components/NavLink.svelte";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

    // Show a loading message or spinner on client-side navigation to improve
    // the UX if you have any fetches that take very long in load functions.
    // An alternative is to implement a per-user/per-request state manager that works client-side after hydration.
    let loading = false;

    beforeNavigate(({ type }) => {
        if (type !== "unload") {
            loading = true;
        }
    });

    afterNavigate(({ type }) => {
        if (type !== "unload") {
            loading = false;
        }
    });
</script>

<header class="container">
    <h1 class="text-2xl font-bold">tRPC (w/ Fetch Adapter) + SvelteKit + Tailwind CSS</h1>

    <nav class="mt-3 flex">
        <NavLink url="/" text="Home" />
        <NavLink url="/hybrid" text="Hybrid" />
        <NavLink url="/ssr" text="SSR" />
        <NavLink url="/csr" text="CSR" />
    </nav>
</header>

<main class="container">
    {#if loading}
        <p>Loading...</p>
    {:else}
        <slot />
    {/if}
</main>
