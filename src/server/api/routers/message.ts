import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
//test
export const messageRouter = createTRPCRouter({
  getMessagesByExchange: publicProcedure.query(async ({ input, ctx }) => {
    return await ctx.db.query.message.findMany({
      where: (message, { eq }) => eq(message.Exchange, "Exchange_3"),
    });
  }),
});
