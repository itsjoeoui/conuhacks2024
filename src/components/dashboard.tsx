"use client";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "./ui/label";
import OverviewTab from "./tabs/overview-tab";
import AnalyticsTab from "./tabs/analytics-tab";
import { type SelectMessage } from "~/types/message";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { exchangeList } from "~/types/exchange";
import { Icons } from "./icons";

type Props = {
  messages: SelectMessage[];
  symbols: string[];
};

export default function DashboardPage(props: Props) {
  const [exchange, setExchange] =
    useState<(typeof exchangeList)[number]>("Exchange_1");
  const [symbol, setSymbol] = useState<string>("OUTD9");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [messages, setMessages] = useState<SelectMessage[]>([]);
  const [stats, setStats] = useState({
    total_volumn: 0,
    total_completed: 0,
    total_canceled: 0,
    total_rejected: 0,
  });

  api.message.getStartingTime.useQuery(
    { exchange, symbol },
    {
      onSuccess: (data) => {
        if (data) {
          setCurrentTime(data);
        }
      },
      refetchOnWindowFocus: false,
    },
  );

  const { data: symbols } = api.message.getSymbolsByExchange.useQuery(
    exchange,
    {
      initialData: props.symbols,
      keepPreviousData: true,
    },
  );

  const { isFetching } = api.message.getMessagesByExchangeAndSymbol.useQuery(
    {
      exchange,
      symbol,
      currentTime,
    },
    {
      initialData: props.messages,
      refetchInterval: () => 2000,
      refetchOnWindowFocus: false,
      onSuccess: (data) => setMessages(data),
    },
  );

  api.message.getStatsByExchangeAndSymbol.useQuery(
    {
      exchange,
      symbol,
      currentTime,
    },
    {
      refetchInterval: () => 2000,
      refetchOnWindowFocus: false,
      initialData: {
        total_volumn: 0,
        total_completed: 0,
        total_canceled: 0,
        total_rejected: 0,
      },
      onSuccess: (data) => {
        setStats(data);
      },
    },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevDate) => new Date(prevDate.getTime() + 2000));
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              National Bank Financial Market Dashboard
            </h2>
            <div className="flex items-center space-x-2">
              {isFetching && (
                <div>
                  <Icons.spinner className="animate-spin" />
                </div>
              )}
              <div className="px-2"></div>
              <div className="flex flex-col gap-1">
                <Label>Select an exchange: </Label>
                <Select
                  value={exchange}
                  onValueChange={(val) =>
                    setExchange(val as (typeof exchangeList)[number])
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Exchanges</SelectLabel>
                      {exchangeList.map((exchange) => (
                        <SelectItem key={exchange} value={exchange}>
                          {exchange}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Select an symbol: </Label>
                <Select
                  value={symbol}
                  onValueChange={(val) => {
                    setSymbol(val);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Symbols</SelectLabel>
                      {symbols.map((symbol) => (
                        <SelectItem key={symbol} value={symbol}>
                          {symbol}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <OverviewTab messages={messages} stats={stats} />
            <AnalyticsTab />
          </Tabs>
        </div>
      </div>
    </>
  );
}
