import React from "react";
import { calculateValues } from "../utils/calculateValues";

function ComparisonTable({
  data,
  baseCurrency,
  startDate,
  endDate,
  amount,
  setBaseCurrency,
  setStartDate,
  setEndDate,
  setAmount,
}) {
  const { startValues, endValues } = calculateValues(
    data,
    baseCurrency,
    startDate,
    endDate,
    amount
  );

  if (!startValues || !endValues) {
    return <div>Geçerli bir tarih aralığı seçin!</div>;
  }

  return (
    <>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>
              <label htmlFor="amount">Başlangıç Miktarı:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
              />
              <label htmlFor="baseCurrency">Baz Para Birimi:</label>
              <select
                id="baseCurrency"
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
              </select>
            </th>
            <th>
              <label htmlFor="startDate">Başlangıç Tarihi:</label>
              <input
                type="month"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min="1980-01"
                max="2025-01"
              />
            </th>
            <th>
              <label htmlFor="endDate">Bitiş Tarihi:</label>
              <input
                type="month"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min="1980-01"
                max="2025-01"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TRY Karşılığı</td>
            <td>{startValues.tryValue.toFixed(2)}</td>
            <td>{endValues.tryValue.toFixed(2)}</td>
          </tr>
          <tr>
            <td>USD Karşılığı</td>
            <td>
              {startValues.usdValue.toFixed(2)} ($: {data.find(d => d.Date === startDate)?.USDTRY})
            </td>
            <td>
              {endValues.usdValue.toFixed(2)} ($: {data.find(d => d.Date === endDate)?.USDTRY})
            </td>
          </tr>
          <tr>
            <td>EUR Karşılığı</td>
            <td>
              {startValues.eurValue.toFixed(2)} (€: {data.find(d => d.Date === startDate)?.EURTRY})
            </td>
            <td>
              {endValues.eurValue.toFixed(2)} (€: {data.find(d => d.Date === endDate)?.EURTRY})
            </td>
          </tr>
          <tr>
            <td>Altın Karşılığı (gram)</td>
            <td>
              {startValues.goldValue.toFixed(1)} (₺: {data.find(d => d.Date === startDate)?.GoldPerGramTRY})
            </td>
            <td>
              {endValues.goldValue.toFixed(1)} (₺: {data.find(d => d.Date === endDate)?.GoldPerGramTRY})
            </td>
          </tr>
          <tr>
            <td>Asgari Ücret Karşılığı</td>
            <td>
              {startValues.minWageRatio.toFixed(2)}× (₺: {data.find(d => d.Date === startDate)?.minWageNetTRY})
            </td>
            <td>
              {endValues.minWageRatio.toFixed(2)}× (₺: {data.find(d => d.Date === endDate)?.minWageNetTRY})
            </td>
          </tr>
          <tr>
            <td>
              {baseCurrency === "TRY"
                ? "Normalize Edilmiş USD Karşılığı"
                : "Normalize Edilmiş TRY Karşılığı"}
            </td>
            <td>{startValues.normalizedValue.toFixed(2)}</td>
            <td>{endValues.normalizedValue.toFixed(2)}</td>
          </tr>
        </tbody>

      </table>
      <p>
        <h4>  Mustafa Evleksiz </h4>
      </p>
    </>
  );
}

export default ComparisonTable;