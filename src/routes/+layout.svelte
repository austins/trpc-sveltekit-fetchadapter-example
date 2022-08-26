<script lang="ts">
    import "../app.css";
    import NavLink from "$lib/components/NavLink.svelte";
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
    <slot />
</main>
