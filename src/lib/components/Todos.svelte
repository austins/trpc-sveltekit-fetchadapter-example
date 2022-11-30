<script lang="ts">
    import type { AppRouter } from "$lib/trpc/routers/appRouter.server";
    import { isTRPCClientError, trpcClient } from "$lib/trpc/trpcClient";
    import type { inferProcedureOutput } from "@trpc/server";

    export let todos: inferProcedureOutput<AppRouter["todo"]["list"]>;

    let name = "";
    let content = "";

    let error = "";

    async function handleSubmit() {
        try {
            const newTodo = await trpcClient().todo.add.mutate({ name, content });
            error = "";
            todos = todos.concat(newTodo);
        } catch (cause) {
            if (isTRPCClientError(cause)) {
                error = "Invalid input. All fields must not be empty.";
            }
        }
    }

    async function handleDelete(id: number) {
        await trpcClient().todo.delete.mutate(id);

        // We'll do a refetch (or you can delete the item from the array and assign the updated array).
        todos = await trpcClient().todo.list.query();
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
        {#if todos.length}
            {#each todos as todo (todo.id)}
                <div class="rounded border border-slate-400 p-3">
                    <header>
                        <h3 class="text-lg font-semibold">{todo.name}</h3>
                    </header>

                    <div class="mb-2 text-xs font-semibold italic">ID: {todo.id}</div>

                    <div class="mb-2">{todo.content}</div>

                    <div>
                        <button
                            type="button"
                            class="rounded bg-red-300 px-2 py-1 text-sm hover:bg-red-200"
                            on:click={async () => {
                                await handleDelete(todo.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            {/each}
        {:else}
            No todos.
        {/if}
    </div>
</section>
