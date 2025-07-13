import React, { useState, useEffect } from "react";
import "./App.css";
import ComparisonTable from "./components/ComparisonTable";
import Graph from "./components/Graph";
import packageJson from "../package.json";

const logoUrl = "/logo.svg";

function App() {
  const [data, setData] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("TRY"); // Baz para birimi
  const [startDate, setStartDate] = useState("2022-01");
  const [endDate, setEndDate] = useState("2024-12");
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
    <div className="container py-4">
      <header className="text-center mb-4">
        <img src={logoUrl} alt="Alim Gucu" style={{ height: "60px" }} />
        <h1>Para Değeri Karşılaştırma</h1>
      </header>
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
      <Graph data={data} startDate={startDate} endDate={endDate} />
      <footer className="text-center mt-4">
        Developed by Mustafa Evleksiz - Version {packageJson.version} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;