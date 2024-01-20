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

type Props = {
  messages: SelectMessage[];
};

export default function DashboardPage({ messages }: Props) {
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
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Exchanges</SelectLabel>
                    <SelectItem value="Exchange_1">Exchange 1</SelectItem>
                    <SelectItem value="Exchange_2">Exchange 2</SelectItem>
                    <SelectItem value="Exchange_3">Exchange 3</SelectItem>
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
            <OverviewTab messages={messages} />
            <AnalyticsTab messages={messages} />
          </Tabs>
        </div>
      </div>
    </>
  );
}
