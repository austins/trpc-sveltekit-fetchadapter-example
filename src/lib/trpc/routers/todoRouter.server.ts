import { todos } from "$lib/data/todos.server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc.server";

export const todoRouter = router({
    list: publicProcedure.query(() => todos),
    add: publicProcedure
        .input(
            z.object({
                name: z.string().trim().min(1),
                content: z.string().trim().min(1),
            })
        )
        .mutation(({ input }) => {
            const lastId = todos.length ? Math.max(...todos.map((t) => t.id)) : 0;

            const todo = { id: lastId + 1, ...input };
            todos.push(todo);

            return todo;
        }),
    delete: publicProcedure.input(z.number().min(1)).mutation(({ input }) => {
        const idIndex = todos.map((t) => t.id).indexOf(input);

        if (idIndex >= 0) {
            todos.splice(idIndex, 1);
            return;
        }

        throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found." });
    }),
});
