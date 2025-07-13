// Version 2.2.2
export const calculateValues = (data, baseCurrency, startDate, endDate, amount) => {
  if (!data || !startDate || !endDate) {
    return { startValues: null, endValues: null };
  }

  const startData = data.find((item) => item.Date === startDate);
  const endData = data.find((item) => item.Date === endDate);

  if (!startData || !endData) {
    return { startValues: null, endValues: null };
  }

  // const startRate = baseCurrency === "TRY" ? 1 : startData.USDTRY;
  // const endRate = baseCurrency === "TRY" ? 1 : endData.USDTRY;

  const startTRY = baseCurrency === "TRY" ? amount : amount * startData.USDTRY;
  const endTRY = baseCurrency === "TRY"
    ? startTRY * (endData.TRYInflationIndex / startData.TRYInflationIndex)
    : startTRY * (endData.USDTRY / startData.USDTRY);

  const startUSD = baseCurrency === "USD" ? amount : startTRY / startData.USDTRY;
  const endUSD = baseCurrency === "USD"
    ? startUSD * (endData.USDInflationIndex / startData.USDInflationIndex)
    : endTRY / endData.USDTRY;

  const startEUR = startTRY / startData.EURTRY;
  const endEUR = endTRY / endData.EURTRY;

  const startGold = startTRY / startData.GoldPerGramTRY;
  const endGold = endTRY / endData.GoldPerGramTRY;

  const startMinWageRatio = startTRY / startData.minWageNetTRY;
  const endMinWageRatio = endTRY / endData.minWageNetTRY;

  const startNormalized = baseCurrency === "TRY"
    ? startTRY / startData.USDTRY_TRY_NORM
    : startUSD * startData.USDTRY_TRY_NORM;
  const endNormalized = baseCurrency === "TRY"
    ? endTRY / endData.USDTRY_TRY_NORM
    : endUSD * endData.USDTRY_TRY_NORM;

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