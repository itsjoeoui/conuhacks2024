import React from "react";
import { TabsContent } from "../ui/tabs";
import SQLQuery from "../sql-query";
import { type SelectMessage } from "~/types/message";
import { Card } from "../ui/card";
import Chatbot from "../chatbot";

type Props = {
  messages: SelectMessage[];
};

const AnalyticsTab = ({ messages }: Props) => {
  return (
    <TabsContent value="analytics" className="space-y-4">
      <Chatbot />
      <SQLQuery />
      {messages.map((message) => {
        return (
          <Card key={message.ID}>
            {message.ID}
            {message.MessageType}
          </Card>
        );
      })}
    </TabsContent>
  );
};

export default AnalyticsTab;
