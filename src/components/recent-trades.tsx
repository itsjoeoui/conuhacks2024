import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { type SelectMessage } from "~/types/message";

type Props = {
  messages: SelectMessage[];
};

export function RecentTrades({ messages }: Props) {
  return (
    <div className="space-y-8">
      {messages.map((message) => (
        <div className="flex items-center" key={message.ID}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{message.Symbol.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{message.Symbol}</p>
            <p className="text-sm text-muted-foreground">
              {message.MessageType}
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
