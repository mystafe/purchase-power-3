import React, { useState } from "react";
import { calculateValues } from "../utils/calculateValues";
import FilterControls from "./FilterControls";

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
  superMode,
}) {
  const incStartDate = (diff) => setStartDate(adjustMonth(startDate, diff));
  const incEndDate = (diff) => setEndDate(adjustMonth(endDate, diff));
  const [tooltip, setTooltip] = useState(null);

  const handleIconClick = (key) => {
    setTooltip((current) => (current === key ? null : key));
  };
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
      <FilterControls
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        amount={amount}
        setAmount={setAmount}
        incStartDate={incStartDate}
        incEndDate={incEndDate}
        superMode={superMode}
      />
      <table className="comparison-table table table-hover table-bordered text-center fade-in">
        <thead className="table-primary">
          <tr>
            <th></th>
            <th>Başlangıç</th>
            <th>Bitiş</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className="icon-cell"
              onClick={() => handleIconClick('try')}
              onMouseEnter={() => setTooltip('try')}
              onMouseLeave={() => setTooltip(null)}
              onTouchStart={() => handleIconClick('try')}
            >
              ₺
              {tooltip==='try' && (
                <div className="icon-tooltip">Türk lirası karşılığı</div>
              )}
            </td>
            <td>{startValues.tryValue.toFixed(2)}</td>
            <td>{endValues.tryValue.toFixed(2)}</td>
          </tr>
          <tr>
            <td
              className="icon-cell"
              onClick={() => handleIconClick('usd')}
              onMouseEnter={() => setTooltip('usd')}
              onMouseLeave={() => setTooltip(null)}
              onTouchStart={() => handleIconClick('usd')}
            >
              $
              {tooltip==='usd' && (
                <div className="icon-tooltip">ABD doları karşılığı</div>
              )}
            </td>
            <td>
              {startValues.usdValue.toFixed(2)} ($: {data.find(d => d.Date === startDate)?.USDTRY})
            </td>
            <td>
              {endValues.usdValue.toFixed(2)} ($: {data.find(d => d.Date === endDate)?.USDTRY})
            </td>
          </tr>
          <tr>
            <td
              className="icon-cell"
              onClick={() => handleIconClick('eur')}
              onMouseEnter={() => setTooltip('eur')}
              onMouseLeave={() => setTooltip(null)}
              onTouchStart={() => handleIconClick('eur')}
            >
              €
              {tooltip==='eur' && (
                <div className="icon-tooltip">Euro karşılığı</div>
              )}
            </td>
            <td>
              {startValues.eurValue.toFixed(2)} (€: {data.find(d => d.Date === startDate)?.EURTRY})
            </td>
            <td>
              {endValues.eurValue.toFixed(2)} (€: {data.find(d => d.Date === endDate)?.EURTRY})
            </td>
          </tr>
          <tr>
            <td
              className="icon-cell"
              onClick={() => handleIconClick('gold')}
              onMouseEnter={() => setTooltip('gold')}
              onMouseLeave={() => setTooltip(null)}
              onTouchStart={() => handleIconClick('gold')}
            >
              🏅
              {tooltip==='gold' && (
                <div className="icon-tooltip">Gram altın karşılığı</div>
              )}
            </td>
            <td>
              {startValues.goldValue.toFixed(1)} (₺: {data.find(d => d.Date === startDate)?.GoldPerGramTRY})
            </td>
            <td>
              {endValues.goldValue.toFixed(1)} (₺: {data.find(d => d.Date === endDate)?.GoldPerGramTRY})
            </td>
          </tr>
          <tr>
            <td
              className="icon-cell"
              onClick={() => handleIconClick('wage')}
              onMouseEnter={() => setTooltip('wage')}
              onMouseLeave={() => setTooltip(null)}
              onTouchStart={() => handleIconClick('wage')}
            >
              👨🏼‍🔧
              {tooltip==='wage' && (
                <div className="icon-tooltip">Asgari ücret oranı</div>
              )}
            </td>
            <td>
              {startValues.minWageRatio.toFixed(2)}× (₺: {data.find(d => d.Date === startDate)?.minWageNetTRY})
            </td>
            <td>
              {endValues.minWageRatio.toFixed(2)}× (₺: {data.find(d => d.Date === endDate)?.minWageNetTRY})
            </td>
          </tr>
          <tr>
            <td
              className="icon-cell"
              onClick={() => handleIconClick('norm')}
              onMouseEnter={() => setTooltip('norm')}
              onMouseLeave={() => setTooltip(null)}
              onTouchStart={() => handleIconClick('norm')}
            >
              {baseCurrency === "TRY" ? "⊴$⊵" : "⊴₺⊵"}
              {tooltip==='norm' && (
                <div className="icon-tooltip">Normalleştirilmiş değer</div>
              )}
            </td>
            <td>{startValues.normalizedValue.toFixed(2)}</td>
            <td>{endValues.normalizedValue.toFixed(2)}</td>
          </tr>
        </tbody>

      </table>
    </>
  );
}

export default ComparisonTable;