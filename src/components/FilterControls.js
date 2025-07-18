import React from "react";

function FilterControls({
  baseCurrency,
  setBaseCurrency,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  amount,
  setAmount,
  incStartDate,
  incEndDate,
  superMode,
}) {
  return (
    <form className="filter-bar p-3 rounded shadow-sm">
      <div className="filter-item">
        <label htmlFor="amount" className="form-label">Miktar</label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className="filter-item">
        <label htmlFor="baseCurrency" className="form-label">Kur</label>
        <select
          id="baseCurrency"
          className="form-select"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="startDate" className="form-label">Başlangıç</label>
        <div className="input-group">
          {superMode && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => incStartDate(-1)}
            >
              -
            </button>
          )}
          <input
            type="month"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min="1980-01"
            max="2025-07"
            step="1"
          />
          {superMode && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => incStartDate(1)}
            >
              +
            </button>
          )}
        </div>
      </div>
      <div className="filter-item">
        <label htmlFor="endDate" className="form-label">Bitiş</label>
        <div className="input-group">
          {superMode && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => incEndDate(-1)}
            >
              -
            </button>
          )}
          <input
            type="month"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min="1980-01"
            max="2025-07"
            step="1"
          />
          {superMode && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => incEndDate(1)}
            >
              +
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default FilterControls;
