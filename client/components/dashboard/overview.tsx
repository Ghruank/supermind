"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const chartConfig = {
  xAxis: {
    dataKey: "name",
    stroke: "currentColor",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    opacity: 0.5,
    type: "category" as const,
    interval: "preserveStartEnd" as const,
  },
  yAxis: {
    stroke: "currentColor",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    opacity: 0.5,
    width: 80,
    tickFormatter: (value: number) => `$${value}`,
    type: "number" as const,
  },
};

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis {...chartConfig.xAxis} />
        <YAxis {...chartConfig.yAxis} />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary opacity-90"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}