import React, { useState, useEffect } from "react";
import "./App.css";
import ComparisonTable from "./components/ComparisonTable";
import Filters from "./components/Filters";

function App() {
  const [data, setData] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("TRY"); // Baz para birimi: TRY veya USD
  const [startDate, setStartDate] = useState("2022-01");
  const [endDate, setEndDate] = useState("2025-01");
  const [amount, setAmount] = useState(100); // Başlangıç miktarı

  useEffect(() => {
    // JSON verisini okuma
    fetch("./data/data.json")
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => console.error("Veri yükleme hatası:", err));
  }, []);

  return (
    <div className="App">
      <h1>Para Değeri Karşılaştırma</h1>

      {/* Filtreler */}
      <Filters
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        amount={amount}
        setAmount={setAmount}
      />

      {/* Karşılaştırma Tablosu */}
      <ComparisonTable
        data={data}
        baseCurrency={baseCurrency}
        startDate={startDate}
        endDate={endDate}
        amount={amount}
      />
    </div>
  );
}

export default App;