import { z } from "zod";

import { sql, desc, eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { message } from "~/server/db/schema";

export const messageRouter = createTRPCRouter({
  getMessagesByExchangeAndSymbol: publicProcedure
    .input(
      z.object({
        exchange: z.enum(["Exchange_1", "Exchange_2", "Exchange_3"]),
        symbol: z.string(),
        currentTime: z.date(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const threeSecondsAgo = new Date(input.currentTime.getTime() - 3000);

      return await ctx.db.query.message.findMany({
        where: (message, { eq, and, gt, lt }) =>
          and(
            eq(message.Exchange, input.exchange),
            eq(message.Symbol, input.symbol),
            gt(message.TimeStamp, threeSecondsAgo),
            lt(message.TimeStamp, input.currentTime),
          ),
      });
    }),

  query: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    return await ctx.db.execute(sql.raw(input));
  }),

  getSymbolsByExchange: publicProcedure
    .input(z.enum(["Exchange_1", "Exchange_2", "Exchange_3"]))
    .query(async ({ input, ctx }) => {
      return (
        await ctx.db
          .selectDistinctOn([message.Symbol])
          .from(message)
          .where(eq(message.Exchange, input))
      ).map((s) => s.Symbol);
    }),

  getStartingTime: publicProcedure
    .input(
      z.object({
        exchange: z.enum(["Exchange_1", "Exchange_2", "Exchange_3"]),
        symbol: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const [message] = await ctx.db.query.message.findMany({
        where: (message, { eq, and }) =>
          and(
            eq(message.Exchange, input.exchange),
            eq(message.Symbol, input.symbol),
          ),
        orderBy: (message, { asc }) => [asc(message.TimeStamp)],
        limit: 1,
      });
      return message?.TimeStamp;
    }),
});
