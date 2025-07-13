import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TrendChart({ data, baseCurrency, initialValue }) {
  const chartRef = useRef(null); // Canvas elementi referansı
  const chartInstance = useRef(null); // Chart.js nesnesi referansı

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Önceki grafiği yok et
    }

    // Grafik verilerini hazırlama
    const chartData = {
      labels: data.map((item) => item.Date), // Tarih etiketleri
      datasets: [
        {
          label: `Kümülatif Değer (${baseCurrency})`,
          data: data.map((item) => {
            const value =
              baseCurrency === "TRY"
                ? item.InflationIndex
                : baseCurrency === "USD"
                  ? item.USDTRY
                  : item.GoldPerGramTRY;
            return (value / data[0]?.InflationIndex) * initialValue;
          }),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };

    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const axisColor = darkMode ? '#e0e0e0' : '#222';
    const gridColor = darkMode ? '#444' : '#ccc';

    // Grafik ayarları
    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          ticks: { color: axisColor },
          grid: { color: gridColor },
        },
        y: {
          ticks: { color: axisColor },
          grid: { color: gridColor },
        },
      },
      plugins: {
        legend: { display: true, labels: { color: axisColor } },
        title: { display: true, text: "Zamanla Değişim Grafiği", color: axisColor },
      },
    };

    // Chart.js grafiği oluşturma
    chartInstance.current = new ChartJS(chartRef.current, {
      type: "line", // Grafik tipi: Çizgi
      data: chartData,
      options: chartOptions,
    });

    // Temizlik işlemi
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, baseCurrency, initialValue]);

  return <canvas ref={chartRef}></canvas>;
}

export default TrendChart;