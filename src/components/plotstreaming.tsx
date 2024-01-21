"use client";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { type SelectMessage } from "~/types/message";

interface DataPoint {
  y: number[];
  mode: string;
  line: { color: string };
}

const rand = () => Math.random();

type Props = {
  messages: SelectMessage[];
};

const PlotStreamingComponent = ({ messages }: Props) => {
  const acceptedOnes = messages.filter(
    (m) => m.MessageType === "NewOrderAcknowledged",
  );

  const avgPrice =
    acceptedOnes.reduce((acc, m) => {
      if (!m.OrderPrice) {
        return acc;
      }
      return acc + m.OrderPrice;
    }, 0) / acceptedOnes.length;

  const [data, setData] = useState<DataPoint[]>([
    {
      y: [1, 2, 3].map(rand),
      mode: "lines",
      line: { color: "#80CAF6" },
    },
    // {
    //   y: [1, 2, 3].map(rand),
    //   mode: "lines",
    //   line: { color: "#DF56F1" },
    // },
  ]);

  useEffect(() => {
    let cnt = 0;
    const interval = setInterval(() => {
      if (data[0]) {
        const newData: (DataPoint & {
          showlegend: boolean;
        })[] = [
          {
            y: [...data[0].y, avgPrice],
            mode: "lines",
            line: { color: "#80CAF6" },
            showlegend: false,
          },
          // {
          //   y: data[1] ? [...data[1].y, rand()] : [rand()],
          //   mode: "lines",
          //   line: { color: "#DF56F1" },
          //   showlegend: false,
          // },
        ];

        setData(newData);

        if (++cnt === 100) clearInterval(interval);
      }
    }, 300);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, [data, messages]);

  return (
    <div>
      <Plot
        data={data}
        layout={{
          paper_bgcolor: "#020817",
          plot_bgcolor: "#020817",
          font: {
            color: "white",
          },
          width: 600,
          height: 400,
        }}
      />
    </div>
  );
};

export default PlotStreamingComponent;

