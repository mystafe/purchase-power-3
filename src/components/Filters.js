import React from "react";

function Filters({
  baseCurrency,
  setBaseCurrency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  amount,
  setAmount,
}) {
  return (
    <div className="filters">
      <label htmlFor="baseCurrency">Baz Para Birimi:</label>
      <select
        id="baseCurrency"
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
      >
        <option value="TRY">TRY</option>
        <option value="USD">USD</option>
      </select>

      <label htmlFor="startDate">Başlangıç Tarihi:</label>
      <input
        type="month"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label htmlFor="endDate">Bitiş Tarihi:</label>
      <input
        type="month"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <label htmlFor="amount">Başlangıç Miktarı:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min="1"
      />
    </div>
  );
}

export default Filters;