// Version 2.2.2
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
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
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