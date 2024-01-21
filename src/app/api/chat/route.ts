import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
const openai = new OpenAI({
  apiKey: "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",
});
 

export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages: userMessages } = await req.json();
  const contextPrePrompt = [{
    role: "system",
    content: "You are an AI assistant skilled in SQL. " +
             "Generate SQL queries for a database of transactions. Only generate SQL queries and nothing else. " +
             "The database is conuhacks2024_message. The schema for the transactions table is as follows: " +
             "pgTable(conuhacks2024_message,{id: serial(id).primaryKey().notNull(),"+
             "time_stamp: timestamp(time_stamp, { mode: string }).notNull(),"+
             "direction: text(direction).notNull()" +
             "message_type: text(message_type).notNull(), symbol: text(symbol).notNull(), " +
             "order_price: real(order_price), exchange: text(exchange).notNull()} " +
             ",(table) => { return { exchangeIdx: index().on(table.exchange),};,"+
             "Please provide SQL commands based on the user's query."
  }];

    
    const messages = [
        ...contextPrePrompt,
        ...userMessages,
      ];
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  });
 
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}