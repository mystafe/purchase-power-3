import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DataChart = ({ data }) => {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const axisColor = darkMode ? '#e0e0e0' : '#222';
  const gridColor = darkMode ? '#444' : '#ccc';

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="Date" stroke={axisColor} tick={{ fill: axisColor }} />
        <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
        <Tooltip contentStyle={{ background: darkMode ? '#333' : '#fff', color: axisColor }} />
        <Legend wrapperStyle={{ color: axisColor }} />
        <Line
          type="monotone"
          dataKey="adjustedAmount"
          stroke="#8884d8"
          name="Güncellenmiş Miktar (₺)"
        />
        <Line
          type="monotone"
          dataKey="amountInUSD"
          stroke="#82ca9d"
          name="Miktar (USD)"
        />
        <Line
          type="monotone"
          dataKey="amountInGold"
          stroke="#ffc658"
          name="Miktar (Gram Altın)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataChart;