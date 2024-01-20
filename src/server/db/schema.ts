import { bigint, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator((name) => `conuhacks2024_${name}`);

export const message = pgTable("message", {
  timeStamp: timestamp("time_stamp").notNull(),
  timeStampEpoch: timestamp("time_stamp_epoch").notNull(),
  direction: text("direction", {
    enum: ["ExchangeToNBF", "NBFToExchange"],
  }).notNull(),
  orderId: text("order_id").notNull(),
  messageType: text("message_type", {
    enum: [
      "CancelRequest",
      "NewOrderRequest",
      "NewOrderAcknowledged",
      "CancelAcknowledged",
    ],
  }).notNull(),
  symbol: text("symbol").notNull(),
  orderPrice: bigint("order_price", { mode: "number" }).notNull(),
  exchange: text("exchange", {
    enum: ["Exchange_1", "Exchange_2", "Exchange_3"],
  }).notNull(),
});
