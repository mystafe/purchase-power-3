// Version 2.2.1
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// Graph shows inflation index and gold price for the selected date range.
// Gold price is displayed both in TRY and USD. To make inflation values
// visible alongside much larger price values, a secondary Y axis is used.
const Graph = ({ data, startDate, endDate }) => {
  if (!data || data.length === 0) return null;

  const filtered = data.filter((item) => {
    return (!startDate || item.Date >= startDate) &&
           (!endDate || item.Date <= endDate);
  });

  const chartData = {
    labels: filtered.map((item) => item.Date),
    datasets: [
      {
        label: "Enflasyon Endeksi",
        data: filtered.map((item) => item.InflationIndex),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        yAxisID: "yInflation",
      },
      {
        label: "Altın Fiyatı (Gram/TRY)",
        data: filtered.map((item) => item.GoldPerGramTRY),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
        yAxisID: "yPrice",
      },
      {
        label: "Altın Fiyatı (Gram/USD)",
        data: filtered.map((item) => item.GoldPerGramTRY / item.USDTRY),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
        yAxisID: "yPrice",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      yInflation: {
        position: "left",
        ticks: { callback: (val) => val.toFixed(2) },
      },
      yPrice: {
        position: "right",
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div>
      <h3>Enflasyon ve Altın Fiyatı</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;