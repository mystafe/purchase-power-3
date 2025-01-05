import React from "react";
import { Line } from "react-chartjs-2";

const Graph = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.Date),
    datasets: [
      {
        label: "Enflasyon Endeksi",
        data: data.map((item) => item.InflationIndex),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Altın Fiyatı (Gram/TRY)",
        data: data.map((item) => item.GoldPerGramTRY),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h3>Enflasyon ve Altın Fiyatı</h3>
      <Line data={chartData} />
    </div>
  );
};

export default Graph;