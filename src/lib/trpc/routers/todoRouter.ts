import { todos } from "$lib/data/todos";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../server";

export default t.router({
    list: t.procedure.query(() => {
        return todos;
    }),
    add: t.procedure
        .input(
            z.object({
                name: z.string().trim().min(1),
                content: z.string().trim().min(1),
            })
        )
        .mutation(({ input }) => {
            const lastId = !todos.length
                ? 0
                : Math.max(
                      ...todos.map((t) => {
                          return t.id;
                      })
                  );

            const todo = { id: lastId + 1, ...input };
            todos.push(todo);

            return todo;
        }),
    delete: t.procedure.input(z.number().min(1)).mutation(({ input }) => {
        const idIndex = todos
            .map((t) => {
                return t.id;
            })
            .indexOf(input);

        if (idIndex >= 0) {
            todos.splice(idIndex, 1);
            return;
        }

        throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found." });
    }),
});
