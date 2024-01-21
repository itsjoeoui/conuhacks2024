import { unstable_noStore } from "next/cache";
import DashboardPage from "~/components/dashboard";
import { api } from "~/trpc/server";

export default async function Home() {
  unstable_noStore();
  const messages = await api.message.getMessagesByExchangeAndSymbol.query({
    exchange: "Exchange_1",
    symbol: "OUTD9",
    currentTime: new Date(),
  });

  const symbols = await api.message.getSymbolsByExchange.query("Exchange_3");
  return (
    <div>
      <DashboardPage messages={messages} symbols={symbols} />
    </div>
  );
}
