<script lang="ts">
    import Info from "$lib/components/Info.svelte";
    import Todos from "$lib/components/Todos.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<Info>
    This page uses "page.ts". We fetch the initial data server-side <em>with an HTTP request</em>
    on the initial page request and client-side for when the page is navigated to client-side on subsequent page requests.
    <br />
    <br />
    "Hybrid" is just a name I came up with for this method.
</Info>

<Todos todos={data.todos} />
