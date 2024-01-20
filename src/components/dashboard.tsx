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
import { useState } from "react";
import { exchangeList } from "~/types/exchange";

type Props = {
  messages: SelectMessage[];
};

export default function DashboardPage({ messages }: Props) {
  const [exchange, setExchange] =
    useState<(typeof exchangeList)[number]>("Exchange_3");

  const { data } = api.message.getMessagesByExchange.useQuery(
    {
      exchange,
    },
    { initialData: messages },
  );

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              National Bank Financial Market Dashboard
            </h2>
            <div className="flex items-center space-x-2">
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
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <OverviewTab messages={data} />
            <AnalyticsTab messages={data} />
          </Tabs>
        </div>
      </div>
    </>
  );
}
