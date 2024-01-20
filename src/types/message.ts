import { message } from "~/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export type SelectMessage = typeof message.$inferSelect;
export type InsertMessage = typeof message.$inferSelect;

export const insertMessageSchema = createInsertSchema(message);

export const selectMessageSchema = createSelectSchema(message);
