// Version 2.2.1
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

    // Grafik ayarları
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: true, text: "Zamanla Değişim Grafiği" },
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