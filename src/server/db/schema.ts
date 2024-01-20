import {
  index,
  pgTableCreator,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator((name) => `conuhacks2024_${name}`);

export const message = pgTable(
  "message",
  {
    ID: serial("id").primaryKey(),
    TimeStamp: timestamp("time_stamp").notNull(),
    // TimeStampEpoch: timestamp("time_stamp_epoch").notNull(),
    Direction: text("direction", {
      enum: ["ExchangeToNBF", "NBFToExchange"],
    }).notNull(),
    OrderID: text("order_id").notNull(),
    MessageType: text("message_type", {
      enum: [
        "CancelRequest",
        "NewOrderRequest",
        "NewOrderAcknowledged",
        "CancelAcknowledged",
        "Cancelled",
        "Trade",
        "Rejected",
      ],
    }).notNull(),
    Symbol: text("symbol").notNull(),
    OrderPrice: real("order_price"),
    Exchange: text("exchange", {
      enum: ["Exchange_1", "Exchange_2", "Exchange_3"],
    }).notNull(),
  },
  (table) => ({
    ExchangeIndex: index().on(table.Exchange),
  }),
);
