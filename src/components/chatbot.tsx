"use client";

import { useChat } from "ai/react";
import AvatarChat from "./avatar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="mx-auto flex w-2/4  flex-col border border-black">
      <div className="overflow-auto py-4" style={{ minHeight: "500px" }}>
        {messages.length === 0 ? (
          <div className="mx-4 text-left text-gray-500">Ask a SQL query </div>
        ) : (
          messages.map((m) => (
            <pre>
              <div key={m.id} className="whitespace-pre-wrap px-4 py-2 m-3">
              {m.role === "user" ? 
              <div className="flex flex-row gap-3">
                <AvatarChat src="../../public/user.png" alt="@shadcn" fallbackInitials="U"/>
                <h3 className="text-white font-semibold mt-2">User</h3>
              </div>
               : <div className="flex flex-row gap-3">
                  <AvatarChat src="../../public/chatgpt.png" alt="@shadcn" fallbackInitials="AI"/>
                  <h3 className="text-white font-semibold mt-2">AI</h3>
               </div>
               }
              {m.content}
              </div>
            </pre>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto w-full">
        <input
          className="w-full border-t border-black rounded-md px-4 py-2"
          value={input}
          placeholder="Message our AI..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
