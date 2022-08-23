export type Todo = {
    id: number;
    name: string;
    content: string;
};

export const todos: Todo[] = [
    {
        id: 1,
        name: "Todo 1",
        content: "Something to do.",
    },
    {
        id: 2,
        name: "Todo 2",
        content: "Something else to do.",
    },
];
