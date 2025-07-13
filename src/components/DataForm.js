// Version 2.2.1
import React, { useState } from "react";

const DataForm = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("2006-01");
  const [endDate, setEndDate] = useState("2024-12");
  const [amount, setAmount] = useState(1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ startDate, endDate, amount });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Başlangıç Tarihi:
        <input
          type="month"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        Bitiş Tarihi:
        <input
          type="month"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label>
        Miktar (₺):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button type="submit">Filtrele</button>
    </form>
  );
};

export default DataForm;