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
    fetch("/api/data")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData))
      .catch((err) => console.error("Veri yükleme hatası:", err));
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