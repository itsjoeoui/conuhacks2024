import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { type SelectMessage } from "~/types/message";

type Props = {
  messages: SelectMessage[];
};

export function RecentTrades({ messages }: Props) {
  return (
    <div className="space-y-8">
      {messages.slice(0, 5).map((message) => (
        <div className="flex items-center" key={message.ID}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{message.Symbol.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{message.Symbol}</p>
            <p
              className={cn("text-sm text-muted-foreground", {
                "text-red-500": [
                  "Cancelled",
                  "CancelAcknowledged",
                  "Rejected",
                ].includes(message.MessageType),
                "text-orange-500": [
                  "CancelRequest",
                  "NewOrderRequest",
                ].includes(message.MessageType),
                "text-green-500": ["NewOrderAcknowledged", "Trade"].includes(
                  message.MessageType,
                ),
              })}
            >
              {message.MessageType} at {format(message.TimeStamp, "hh:mm:ss")}
            </p>
          </div>
          {message.OrderPrice && (
            <div className="ml-auto font-medium">${message.OrderPrice}</div>
          )}
        </div>
      ))}
    </div>
  );
}
