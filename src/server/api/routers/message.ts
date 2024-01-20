import { z } from "zod";
import { sql } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  getMessagesByExchange: publicProcedure.query(async ({ input, ctx }) => {
    return await ctx.db.query.message.findMany({
      where: (message, { eq }) => eq(message.Exchange, "Exchange_3"),
    });
  }),
  query: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    return await ctx.db.execute(sql.raw(input));
  }),
});
