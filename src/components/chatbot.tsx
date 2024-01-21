"use client";

import { useChat } from "ai/react";

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="mx-auto flex w-full max-w-md flex-col border border-black">
      <div className="overflow-auto py-4" style={{ minHeight: "300px" }}>
        {messages.length === 0 ? (
          <div className="mx-4 text-left text-gray-500">Ask a SQL query </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap px-4 py-2">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto w-full">
        <input
          className="w-full border-t border-black px-4 py-2"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
