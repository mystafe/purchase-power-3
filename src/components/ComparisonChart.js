import React from "react";
import { Bar } from "react-chartjs-2";

function ComparisonChart({ data, baseCurrency }) {
  if (data.length === 0) return <p>Kıyaslama sonuçları burada görünecek.</p>;

  const labels = data.map((item) => item.label);
  const values1 = data.map((item) => item.value1);
  const values2 = data.map((item) => item.value2);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Değer (${baseCurrency}) - Tarih 1`,
        data: values1,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: `Değer (${baseCurrency}) - Tarih 2`,
        data: values2,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Bar data={chartData} />
    </div>
  );
}

export default ComparisonChart;