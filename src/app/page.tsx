import DashboardPage from "~/components/dashboard";
import SQLQuery from "~/components/sql-query";
import { Card } from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function Home() {
  const messages = await api.message.getMessagesByExchange.query();
  return (
    <div>
      <DashboardPage />
      <SQLQuery />
      {messages.map((message) => {
        return (
          <Card key={message.ID}>
            {message.ID}
            {message.MessageType}
          </Card>
        );
      })}
    </div>
  );
}
