import type { DataTransformer } from "@trpc/server";
import superjson from "superjson";

export const transformer: DataTransformer = superjson;
