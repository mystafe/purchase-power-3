import React, { useState, useEffect } from "react";
import "./App.css";
import ComparisonTable from "./components/ComparisonTable";

function App() {
  const [data, setData] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("TRY"); // Baz para birimi
  const [startDate, setStartDate] = useState("2022-01");
  const [endDate, setEndDate] = useState("2025-01");
  const [amount, setAmount] = useState(100); // Başlangıç miktarı

  useEffect(() => {
    const loadData = async () => {
      try {
        const apiRes = await fetch("/api/data");
        if (!apiRes.ok) {
          throw new Error("API not available");
        }
        const apiData = await apiRes.json();
        setData(apiData);
      } catch {
        try {
          const staticRes = await fetch("/data/data.json");
          const staticData = await staticRes.json();
          setData(staticData);
        } catch (err) {
          console.error("Veri yükleme hatası:", err);
        }
      }
    };
    loadData();
  }, []);

  return (
    <div className="App">
      <h1>Para Değeri Karşılaştırma</h1>
      <ComparisonTable
        data={data}
        baseCurrency={baseCurrency}
        startDate={startDate}
        endDate={endDate}
        amount={amount}
        setBaseCurrency={setBaseCurrency}
        setAmount={setAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

    </div>


  );
}

export default App;