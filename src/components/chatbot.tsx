'use client';

import { unstable_noStore } from "next/cache";
import { useChat } from 'ai/react';
import DashboardPage from "~/components/dashboard";
import { api } from "~/trpc/server";

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md mx-auto border border-black">
  <div className="overflow-auto py-4" style={{ minHeight: '300px' }}>
    {messages.length === 0 ? (
      <div className="text-left mx-4 text-gray-500">Ask a SQL query </div>
    ) : (
      messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap px-4 py-2">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))
    )}
  </div>

  <form onSubmit={handleSubmit} className="mt-auto w-full">
    <input
      className="w-full py-2 px-4 border-t border-black"
      value={input}
      placeholder="Say something..."
      onChange={handleInputChange}
    />
  </form>
</div>


  );
}