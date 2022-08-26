<script lang="ts">
    import Info from "$lib/components/Info.svelte";
    import Todos from "$lib/components/Todos.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<Info>
    This page uses "page.server.ts". We get the initial data by calling the tRPC procedure directly from the server
    without any HTTP requests.
</Info>

<Todos todos={data.todos} />
