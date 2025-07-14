import React, { useState, useEffect } from "react";
import "./App.css";
import ComparisonTable from "./components/ComparisonTable";
import Graph from "./components/Graph";
import OrientationHint from "./components/OrientationHint";
import packageJson from "../package.json";

const logoUrl = "/logo.svg";

function App() {
  const [data, setData] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("TRY"); // Baz para birimi
  const [startDate, setStartDate] = useState("2020-01");
  const [endDate, setEndDate] = useState("2025-07");
  const [amount, setAmount] = useState(100); // Başlangıç miktarı
  const [superMode, setSuperMode] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const handleLogoClick = () => {
    if (superMode) return;
    const next = logoClicks + 1;
    if (next >= 5) {
      setSuperMode(true);
    }
    setLogoClicks(next);
  };

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

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className="container-fluid py-4 px-2 fade-in">
      <OrientationHint />
      <header className="d-flex justify-content-between align-items-center mb-4 fade-in">
        <div className="d-flex align-items-center gap-2">
          <img
            src={logoUrl}
            alt="Alim Gucu"
            style={{ height: "60px", cursor: "pointer" }}
            onClick={handleLogoClick}
          />
          <h1 className="mb-0">Para Değeri Karşılaştırma</h1>
        </div>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="tema değiştir"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
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
        superMode={superMode}
      />
      <Graph data={data} startDate={startDate} endDate={endDate} />
      <footer className="text-center mt-4">
        Developed by Mustafa Evleksiz - Version {packageJson.version} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;