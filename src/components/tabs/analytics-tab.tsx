import React from "react";
import { TabsContent } from "../ui/tabs";
// import SQLQuery from "../sql-query";
import Chatbot from "../chatbot";

const AnalyticsTab = () => {
  return (
    <TabsContent value="analytics" className="space-y-4">
      <Chatbot />
      {/* <SQLQuery /> */}
    </TabsContent>
  );
};

export default AnalyticsTab;
