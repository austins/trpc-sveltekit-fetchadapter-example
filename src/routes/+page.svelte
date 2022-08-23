<script lang="ts">
    import trpcClient, { isTRPCClientError } from "$lib/trpc/trpcClient";

    import type { PageData } from "./$types";

    export let data: PageData;

    let name = "";
    let content = "";

    let error = "";

    async function handleSubmit() {
        try {
            const newTodo = await trpcClient().todo.add.mutate({ name, content });
            data.todos = data.todos.concat(newTodo);
        } catch (cause) {
            if (isTRPCClientError(cause)) {
                error = "Invalid input. All fields must not be empty.";
            }
        }
    }

    async function handleDelete(id: number) {
        await trpcClient().todo.delete.mutate(id);

        // Refetch.
        data.todos = await trpcClient().todo.list.query();
    }
</script>

<section class="mb-6">
    <h2 class="mb-3 text-xl font-bold">Add Todo</h2>

    <form on:submit|preventDefault={handleSubmit}>
        {#if error}
            <div class="rounded bg-red-200 p-4">
                {error}
            </div>
        {/if}

        <div class="mb-2">
            <label for="name" class="block font-bold">Name:</label>
            <input type="text" id="name" required bind:value={name} />
        </div>

        <div class="mb-2">
            <label for="content" class="block font-bold">Content:</label>
            <input type="text" id="content" required bind:value={content} />
        </div>

        <div>
            <button type="submit" class="bg rounded bg-green-700 p-4 px-3 py-2 text-white hover:bg-green-600">
                Submit
            </button>
        </div>
    </form>
</section>

<section>
    <h2 class="mb-3 text-xl font-bold">Todos</h2>

    <div class="flex gap-3">
        {#each data.todos as todo (todo.id)}
            <div class="rounded border border-slate-400 p-3">
                <header>
                    <h3 class="font-semibold">{todo.name}</h3>
                </header>

                <div class="mb-2">{todo.content}</div>

                <div>
                    <button
                        type="button"
                        class="rounded bg-red-300 px-2 py-1 text-sm hover:bg-red-200"
                        on:click={() => {
                            return handleDelete(todo.id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        {/each}
    </div>
</section>
