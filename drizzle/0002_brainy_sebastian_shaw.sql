ALTER TABLE "conuhacks2024_message" ALTER COLUMN "order_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "conuhacks2024_message" DROP COLUMN IF EXISTS "time_stamp_epoch";