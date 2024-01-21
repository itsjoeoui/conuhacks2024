"use client";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { type SelectMessage } from "~/types/message";

interface DataPoint {
  y: number[];
  mode: string;
  line: { color: string };
}

type Props = {
  messages: SelectMessage[];
};

const PlotStreamingComponent = ({ messages }: Props) => {
  const [pt, setPt] = useState(0);
  const acceptedOnes = messages.filter(
    (m) => m.MessageType === "NewOrderAcknowledged",
  );

  const [exchangeTitle, setExchange] = useState<string>();
  const [symbol, setSymbol] = useState<string>();

  const avgPrice =
    acceptedOnes.reduce((acc, m) => {
      if (!m.OrderPrice) {
        return acc;
      }
      return acc + m.OrderPrice;
    }, 0) / acceptedOnes.length;

  const [data, setData] = useState<DataPoint[]>([
    {
      y: [0],
      mode: "lines",
      line: { color: "#80CAF6" },
    },
  ]);

  useEffect(() => {
    if (avgPrice > 0) {
      setPt(avgPrice);
    }
  }, [avgPrice]);

  useEffect(() => {
    if (messages.length > 0 && messages[0]) {
      if (symbol !== messages[0].Symbol) {
        setData([
          {
            y: [0],
            mode: "lines",
            line: { color: "#80CAF6" },
          },
        ]);

        setSymbol(messages[0].Symbol);
        setExchange(messages[0].Exchange);
      }
    }
  }, [messages, symbol]);

  useEffect(() => {
    let cnt = 0;
    const interval = setInterval(() => {
      if (data[0]) {
        const newData: (DataPoint )[] = [
          {
            y: [...data[0].y, pt],
            mode: "lines",
            line: { color: "#80CAF6" },
          },
        ];

        setData(newData);

        if (++cnt === 100) clearInterval(interval);
      }
    }, 300);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, [data, messages, pt]);

  return (
    <div>
      <Plot
        data={data}
        layout={{
          xaxis: {title: 'Time (Relative)'},
          yaxis: {title: 'Price'},
          paper_bgcolor: "#020817",
          plot_bgcolor: "#020817",
          font: {
            color: "white",
          },
          width: 600,
          height: 400,
          showlegend: false,
          title: exchangeTitle + " : " + symbol,
        }}
      />
    </div>
  );
};

export default PlotStreamingComponent;