import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TabsContent } from "~/components/ui/tabs";
import { RecentTrades } from "../recent-trades";
import { type SelectMessage } from "~/types/message";
import PlotStreamingComponent from "~/components/plotstreaming";
import {
  CheckCircleIcon,
  DollarSign,
  ShieldAlert,
  XCircle,
} from "lucide-react";

type Props = {
  messages: SelectMessage[];
  stats: {
    total_volumn: number;
    total_completed: number;
    total_canceled: number;
    total_rejected: number;
  };
};

const OverviewTab = ({ messages, stats }: Props) => {
  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volumn</CardTitle>
            <DollarSign />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_volumn}</div>
            <p className="text-xs text-muted-foreground">
              {/* +20.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Completed
            </CardTitle>
            <CheckCircleIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_completed}</div>
            <p className="text-xs text-muted-foreground">
              {/* +180.1% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Canceled
            </CardTitle>
            <XCircle />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_canceled}</div>
            <p className="text-xs text-muted-foreground">
              {/* +19% from last month */}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Rejected
            </CardTitle>
            <ShieldAlert />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_rejected}</div>
            <p className="text-xs text-muted-foreground">
              {/* +201 since last hour */}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <PlotStreamingComponent messages={messages} />
            {/* <PlotComponent data={randomData} / >*/}
            {/*<Overview />*/}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTrades messages={messages} />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default OverviewTab;
