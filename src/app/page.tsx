import { unstable_noStore } from "next/cache";
import DashboardPage from "~/components/dashboard";
import { api } from "~/trpc/server";

export default async function Home() {
  unstable_noStore();
  const messages = await api.message.getMessagesByExchange.query({
    exchange: "Exchange_3",
  });
  return (
    <div>
      <DashboardPage messages={messages} />
    </div>
  );
}
