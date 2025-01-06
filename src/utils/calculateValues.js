export const calculateValues = (data, baseCurrency, startDate, endDate, amount) => {
  if (!data || !startDate || !endDate) {
    return { startValues: null, endValues: null };
  }

  const startData = data.find((item) => item.Date === startDate);
  const endData = data.find((item) => item.Date === endDate);

  if (!startData || !endData) {
    return { startValues: null, endValues: null };
  }

  // TRY ve USD Bazlı Hesaplama
  const startTRY = baseCurrency === "TRY" ? amount : amount * startData.USDTRY;
  const endTRY =
    baseCurrency === "TRY"
      ? startTRY * (endData.TRYInflationIndex / startData.TRYInflationIndex)
      : startTRY * (startData.USDTRY / endData.USDTRY);

  const startUSD = baseCurrency === "USD" ? amount : startTRY / startData.USDTRY;
  const endUSD =
    baseCurrency === "USD"
      ? startUSD * (endData.USDInflationIndex / startData.USDInflationIndex)
      : endTRY / endData.USDTRY;

  // EUR Hesaplama
  const startEUR =
    baseCurrency === "USD"
      ? amount * (startData.USDTRY / startData.EURTRY)
      : startTRY / startData.EURTRY;
  const endEUR =
    baseCurrency === "USD"
      ? startEUR * (endData.USDTRY / endData.EURTRY)
      : endTRY / endData.EURTRY;

  // Altın Hesaplama
  const startGold =
    baseCurrency === "USD"
      ? amount / (startData.GoldPerGramTRY / startData.USDTRY)
      : startTRY / startData.GoldPerGramTRY;
  const endGold =
    baseCurrency === "USD"
      ? startGold * (startData.GoldPerGramTRY / endData.GoldPerGramTRY)
      : endTRY / endData.GoldPerGramTRY;

  // Asgari Ücret Hesaplama
  const startMinWageRatio =
    baseCurrency === "USD"
      ? amount / (startData.minWageNetTRY / startData.USDTRY)
      : startTRY / startData.minWageNetTRY;
  const endMinWageRatio =
    baseCurrency === "USD"
      ? endUSD / (endData.minWageNetTRY / endData.USDTRY)
      : endTRY / endData.minWageNetTRY;

  // Normalize Edilmiş Değer Hesaplama
  const startNormalized =
    baseCurrency === "TRY"
      ? startTRY / startData.USDTRY_TRY_NORM
      : startUSD * startData.USDTRY_TRY_NORM;
  const endNormalized =
    baseCurrency === "TRY"
      ? endTRY / endData.USDTRY_TRY_NORM
      : endUSD * endData.USDTRY_TRY_NORM;

  // Değerleri Dönüş
  return {
    startValues: {
      tryValue: startTRY,
      usdValue: startUSD,
      eurValue: startEUR,
      goldValue: startGold,
      minWageRatio: startMinWageRatio,
      normalizedValue: startNormalized,
    },
    endValues: {
      tryValue: endTRY,
      usdValue: endUSD,
      eurValue: endEUR,
      goldValue: endGold,
      minWageRatio: endMinWageRatio,
      normalizedValue: endNormalized,
    },
  };
};