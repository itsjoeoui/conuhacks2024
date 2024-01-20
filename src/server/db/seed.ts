import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http/driver";
import { env } from "~/env";
import { message } from "./schema";
import { insertMessageSchema } from "~/types/message";
import fs from "fs";
import { z } from "zod";

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql);

function loadExchangeData(filePath: string) {
  const file = fs.readFileSync(filePath, "utf-8");
  const data = z.array(insertMessageSchema).parse(JSON.parse(file));

  return data;
}

// await db.insert(message).values(loadExchangeData("./public/Exchange_1.json"));
// await db.insert(message).values(loadExchangeData("./public/Exchange_2.json"));
await db.insert(message).values(loadExchangeData("./public/Exchange_3.json"));
