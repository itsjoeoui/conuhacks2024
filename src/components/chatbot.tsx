"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

const examples: string[] = [
  "What is the most traded symbol in Exchange_1?",
  "What is the total OrderPrice of OUTD9?",
  "How many symbols are there in Exchange_1?",
];

export default function Chatbot() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat();

  // const [statement, setStatement] = useState<string>("");
  const [data, setData] = useState<string[]>([]);

  const executeQuery = api.message.query.useMutation({
    onSuccess: (d) => {
      console.log(d);
      setData([...data, JSON.stringify(d.rows[0])]);
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const nonUserMsg = messages.filter((m) => m.role !== "user" && m.content);
    if (nonUserMsg.length > 0) {
      const temp = nonUserMsg[nonUserMsg.length - 1]!.content;
      // setStatement(temp);
      if (!isLoading) {
        executeQuery.mutate(temp);
      }
    }
  }, [messages, isLoading]);

  return (
    <div className="grid h-max min-h-96 grid-cols-2 gap-4">
      <Card className="flex flex-col">
        <CardHeader>National Stonk AI 🤖</CardHeader>

        <CardContent className="h-80 overflow-y-scroll scroll-auto py-4">
          {messages.length === 0 ? (
            <div className="mx-4 text-left text-gray-500">
              Hey there! I am the AI assistant for National Stonk! Ask me any
              question about the live trading data and I will get you to the
              answer in no time.
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={cn("whitespace-pre-wrap px-4 py-2", {
                  "text-muted-foreground": m.role !== "user",
                })}
              >
                {m.role === "user" ? "You: " : "National Stonk AI: "}
                {m.content}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="grow" />
        <form onSubmit={handleSubmit} className="">
          <Input
            value={input}
            placeholder="Ask me anything!"
            onChange={handleInputChange}
          />
        </form>
        {/* {statement} */}
      </Card>

      <Card className="">
        <CardHeader>Answers ✅</CardHeader>
        <CardContent>
          {isLoading && <Icons.spinner className="animate-spin" />}
          {data.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>Examples:</CardHeader>
        <CardContent className="flex gap-2">
          {examples.map((e) => (
            <Button key={e} onClick={() => setInput(e)}>
              {e}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
