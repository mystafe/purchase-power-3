import React from "react";

function ComparisonTable({ data, baseCurrency, startDate, endDate, amount }) {
  const startData = data.find((item) => item.Date === startDate);
  const endData = data.find((item) => item.Date === endDate);

  if (!startData || !endData) {
    return <div>Geçerli bir tarih aralığı seçin!</div>;
  }

  // TRY veya USD bazlı hesaplama için oranlar
  const startRate = baseCurrency === "TRY" ? 1 : startData.USDTRY;
  const endRate = baseCurrency === "TRY" ? 1 : endData.USDTRY;

  // Başlangıç miktarını baz para birimine göre normalize et
  const startAmountInBase = amount * startRate;

  // TRY hesaplamaları
  const startTRY = baseCurrency === "TRY" ? amount : amount * startData.USDTRY;
  const endTRY =
    baseCurrency === "TRY"
      ? amount * (endData.TRYInflationIndex / startData.TRYInflationIndex)
      : (amount * startData.USDTRY) / endData.USDTRY;

  // USD hesaplamaları
  const startUSD = baseCurrency === "USD" ? amount : amount / startData.USDTRY;
  const endUSD =
    baseCurrency === "USD"
      ? amount * (endData.USDInflationIndex / startData.USDInflationIndex)
      : (amount * startData.USDTRY) / endData.USDTRY;

  // EUR hesaplamaları
  const startEUR = startTRY / startData.EURTRY;
  const endEUR = endTRY / endData.EURTRY;

  // Altın hesaplamaları
  const startGold = startTRY / startData.GoldPerGramTRY;
  const endGold = endTRY / endData.GoldPerGramTRY;

  // Asgari ücret hesaplamaları
  const startMinWageRatio = startAmountInBase / startData.minWageNetTRY;
  const endMinWageRatio = (endTRY / endData.minWageNetTRY).toFixed(2);

  // Normalize edilmiş karşılıklar
  const startNormalized =
    baseCurrency === "TRY"
      ? amount / startData.USDTRY_TRY_NORM
      : amount * (startData.USDTRY / startData.TRYInflationIndex);

  const endNormalized =
    baseCurrency === "TRY"
      ? endTRY / endData.USDTRY_TRY_NORM
      : endUSD / endData.TRYInflationIndex;

  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Özellik</th>
          <th>Başlangıç Tarihi ({startDate})</th>
          <th>Bitiş Tarihi ({endDate})</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>TRY Karşılığı</td>
          <td>{startTRY.toFixed(2)}</td>
          <td>{endTRY.toFixed(2)}</td>
        </tr>
        <tr>
          <td>USD Karşılığı</td>
          <td>{startUSD.toFixed(2)}</td>
          <td>{endUSD.toFixed(2)}</td>
        </tr>
        <tr>
          <td>EUR Karşılığı</td>
          <td>{startEUR.toFixed(2)}</td>
          <td>{endEUR.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Altın Karşılığı (gram)</td>
          <td>{startGold.toFixed(1)}</td>
          <td>{endGold.toFixed(1)}</td>
        </tr>
        <tr>
          <td>Asgari Ücret Karşılığı</td>
          <td>{startMinWageRatio.toFixed(2)}×</td>
          <td>{endMinWageRatio}×</td>
        </tr>
        <tr>
          <td>
            {baseCurrency === "TRY"
              ? "Dolar Enflasyondan Arındırılmış Karşılık"
              : "TRY Enflasyondan Arındırılmış Karşılık"}
          </td>
          <td>{startNormalized.toFixed(2)}</td>
          <td>{endNormalized.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ComparisonTable;