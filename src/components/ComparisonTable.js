import React from "react";
import { calculateValues } from "../utils/calculateValues";

const adjustMonth = (date, diff) => {
  const [y, m] = date.split("-").map(Number);
  const d = new Date(y, m - 1 + diff);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

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
  const incStartDate = (diff) => setStartDate(adjustMonth(startDate, diff));
  const incEndDate = (diff) => setEndDate(adjustMonth(endDate, diff));
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
      <table className="comparison-table table table-bordered fade-in">
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
            <th className="align-top">
              <label htmlFor="startDate">Başlangıç</label>
              <div className="d-flex align-items-center gap-1">
                <button type="button" onClick={() => incStartDate(-1)}>-</button>
                <input
                  type="month"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="1980-01"
                  max="2025-07"
                  step="1"
                />
                <button type="button" onClick={() => incStartDate(1)}>+</button>
              </div>
            </th>
            <th className="align-top">
              <label htmlFor="endDate">Bitiş</label>
              <div className="d-flex align-items-center gap-1">
                <button type="button" onClick={() => incEndDate(-1)}>-</button>
                <input
                  type="month"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min="1980-01"
                  max="2025-07"
                  step="1"
                />
                <button type="button" onClick={() => incEndDate(1)}>+</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>₺</td>
            <td>{startValues.tryValue.toFixed(2)}</td>
            <td>{endValues.tryValue.toFixed(2)}</td>
          </tr>
          <tr>
            <td>$</td>
            <td>
              {startValues.usdValue.toFixed(2)} ($: {data.find(d => d.Date === startDate)?.USDTRY})
            </td>
            <td>
              {endValues.usdValue.toFixed(2)} ($: {data.find(d => d.Date === endDate)?.USDTRY})
            </td>
          </tr>
          <tr>
            <td>€</td>
            <td>
              {startValues.eurValue.toFixed(2)} (€: {data.find(d => d.Date === startDate)?.EURTRY})
            </td>
            <td>
              {endValues.eurValue.toFixed(2)} (€: {data.find(d => d.Date === endDate)?.EURTRY})
            </td>
          </tr>
          <tr>
            <td>🏅</td>
            <td>
              {startValues.goldValue.toFixed(1)} (₺: {data.find(d => d.Date === startDate)?.GoldPerGramTRY})
            </td>
            <td>
              {endValues.goldValue.toFixed(1)} (₺: {data.find(d => d.Date === endDate)?.GoldPerGramTRY})
            </td>
          </tr>
          <tr>
            <td>👨🏼‍🔧</td>
            <td>
              {startValues.minWageRatio.toFixed(2)}× (₺: {data.find(d => d.Date === startDate)?.minWageNetTRY})
            </td>
            <td>
              {endValues.minWageRatio.toFixed(2)}× (₺: {data.find(d => d.Date === endDate)?.minWageNetTRY})
            </td>
          </tr>
          <tr>
            <td>{baseCurrency === "TRY" ? "⊴$⊵" : "⊴₺⊵"}</td>
            <td>{startValues.normalizedValue.toFixed(2)}</td>
            <td>{endValues.normalizedValue.toFixed(2)}</td>
          </tr>
        </tbody>

      </table>
    </>
  );
}

export default ComparisonTable;