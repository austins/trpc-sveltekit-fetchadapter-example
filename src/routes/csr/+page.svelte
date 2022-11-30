<script lang="ts">
    import Info from "$lib/components/Info.svelte";
    import Todos from "$lib/components/Todos.svelte";
    import { trpcClient } from "$lib/trpc/trpcClient";

    $: todosPromise = trpcClient().todo.list.query();
</script>

<Info>
    This page gets initial data by making a call to the tRPC procedure client-side using JavaScript during the page
    load.
</Info>

{#await todosPromise}
    <p>Loading...</p>
{:then todos}
    <Todos {todos} />
{/await}
