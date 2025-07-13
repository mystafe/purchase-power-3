// Version 2.2.1
import React, { useState, useEffect } from "react";
import "./App.css";
import ComparisonTable from "./components/ComparisonTable";
import Graph from "./components/Graph";

function App() {
  const [data, setData] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("TRY"); // Baz para birimi
  const [startDate, setStartDate] = useState("2022-01");
  const [endDate, setEndDate] = useState("2025-01");
  const [amount, setAmount] = useState(100); // Başlangıç miktarı
  const [showGraph, setShowGraph] = useState(false);

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
    <div className="container py-4">
      <h1 className="text-center mb-4">Para Değeri Karşılaştırma</h1>
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
      <div className="text-center my-3">
        <button className="btn btn-primary" onClick={() => setShowGraph((prev) => !prev)}>
          {showGraph ? "Grafiği Gizle" : "Grafiği Göster"}
        </button>
      </div>
      {showGraph && <Graph data={data} />}
      <footer className="text-center mt-4">
        Mustafa Evleksiz tarafından geliştirilmiştir
      </footer>
    </div>
  );
}

export default App;