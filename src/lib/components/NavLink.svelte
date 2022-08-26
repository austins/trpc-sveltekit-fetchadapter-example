<script lang="ts">
    import { page } from "$app/stores";

    export let url: string;
    export let text: string;
</script>

<a href={url} class="inline-block" class:text-black={$page.url.pathname === url}>
    {text}
</a>
