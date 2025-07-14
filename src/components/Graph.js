import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// Graph shows inflation index and gold price for the selected date range.
// Gold price is displayed both in TRY and USD. To make inflation values
// visible alongside much larger price values, a secondary Y axis is used.
const Graph = ({ data, startDate, endDate }) => {
  const [visible, setVisible] = useState({
    inflation: true,
    goldTRY: false,
    goldUSD: false,
    usdtry: true,
    eurtry: false,
    wageTRY: false,
    wageUSD: false,
    normTRY: false,
  });

  if (!data || data.length === 0) return null;

  const filtered = data.filter((item) => {
    return (
      (!startDate || item.Date >= startDate) &&
      (!endDate || item.Date <= endDate)
    );
  });

  if (filtered.length === 0) return null;

  const first = filtered[0];

  const getInflation = (item) => item.InflationIndex ?? item.TRYInflationIndex;

  const chartData = {
    labels: filtered.map((item) => item.Date),
    datasets: [
      {
        label: "Enflasyon Endeksi",
        data: filtered.map((item) => getInflation(item) / getInflation(first)),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        hidden: !visible.inflation,
      },
      {
        label: "Altın Fiyatı (Gram/TRY)",
        data: filtered.map(
          (item) => item.GoldPerGramTRY / first.GoldPerGramTRY,
        ),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
        hidden: !visible.goldTRY,
      },
      {
        label: "Altın Fiyatı (Gram/USD)",
        data: filtered.map(
          (item) =>
            item.GoldPerGramTRY /
            item.USDTRY /
            (first.GoldPerGramTRY / first.USDTRY),
        ),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
        hidden: !visible.goldUSD,
      },
      {
        label: "USD/TRY",
        data: filtered.map((item) => item.USDTRY / first.USDTRY),
        borderColor: "rgba(255,159,64,1)",
        fill: false,
        hidden: !visible.usdtry,
      },
      {
        label: "EUR/TRY",
        data: filtered.map((item) => item.EURTRY / first.EURTRY),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
        hidden: !visible.eurtry,
      },
      {
        label: "Asgari Ücret (TRY)",
        data: filtered.map((item) => item.minWageNetTRY / first.minWageNetTRY),
        borderColor: "rgba(255,205,86,1)",
        fill: false,
        hidden: !visible.wageTRY,
      },
      {
        label: "Asgari Ücret (USD)",
        data: filtered.map((item) => item.minWageNetUSD / first.minWageNetUSD),
        borderColor: "rgba(201,203,207,1)",
        fill: false,
        hidden: !visible.wageUSD,
      },
      {
        label: "Normalize TRY",
        data: filtered.map(
          (item) => item.USDTRY_TRY_NORM / first.USDTRY_TRY_NORM,
        ),
        borderColor: "rgba(75,192,192,0.5)",
        fill: false,
        hidden: !visible.normTRY,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: { callback: (val) => val.toFixed(2) },
      },
    },
  };

  return (
    <div className="fade-in">
      <h3>Enflasyon ve Finansal Göstergeler</h3>
      <div className="chart-controls mb-2">
        <label>
          <input
            type="checkbox"
            checked={visible.inflation}
            onChange={(e) =>
              setVisible({ ...visible, inflation: e.target.checked })
            }
          />
          Enflasyon Endeksi
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.usdtry}
            onChange={(e) =>
              setVisible({ ...visible, usdtry: e.target.checked })
            }
          />
          USD/TRY
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.goldTRY}
            onChange={(e) =>
              setVisible({ ...visible, goldTRY: e.target.checked })
            }
          />
          Altın (TRY)
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.goldUSD}
            onChange={(e) =>
              setVisible({ ...visible, goldUSD: e.target.checked })
            }
          />
          Altın (USD)
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.eurtry}
            onChange={(e) =>
              setVisible({ ...visible, eurtry: e.target.checked })
            }
          />
          EUR/TRY
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.wageTRY}
            onChange={(e) =>
              setVisible({ ...visible, wageTRY: e.target.checked })
            }
          />
          Asgari Ücret (TRY)
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.wageUSD}
            onChange={(e) =>
              setVisible({ ...visible, wageUSD: e.target.checked })
            }
          />
          Asgari Ücret (USD)
        </label>
        <label>
          <input
            type="checkbox"
            checked={visible.normTRY}
            onChange={(e) =>
              setVisible({ ...visible, normTRY: e.target.checked })
            }
          />
          Normalize TRY
        </label>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;
