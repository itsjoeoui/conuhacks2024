import { message } from "~/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export type SelectMessage = typeof message.$inferSelect;
export type InsertMessage = typeof message.$inferSelect;

export const insertMessageSchema = createInsertSchema(message, {
  TimeStamp: z.coerce.date(),
  // TimeStampEpoch: z.coerce.date(),
  OrderPrice: z.coerce.number().nullish(),
});

export const selectMessageSchema = createSelectSchema(message);
