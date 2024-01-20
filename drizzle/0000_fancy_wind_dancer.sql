CREATE TABLE IF NOT EXISTS "conuhacks2024_message" (
	"time_stamp" timestamp NOT NULL,
	"time_stamp_epoch" timestamp NOT NULL,
	"direction" text NOT NULL,
	"order_id" text NOT NULL,
	"message_type" text NOT NULL,
	"symbol" text NOT NULL,
	"order_price" bigint NOT NULL,
	"exchange" text NOT NULL
);
