export const calculateValues = (data, baseCurrency, startDate, endDate, amount) => {
  if (!Array.isArray(data) || data.length === 0 || !startDate || !endDate) {
    return { startValues: null, endValues: null };
  }

  const parse = (d) => parseInt(d.replace('-', ''), 10);
  const min = data[0].Date;
  const max = data[data.length - 1].Date;

  let startData = data.find((item) => item.Date === startDate);
  if (!startData) {
    if (parse(startDate) < parse(min)) startData = data[0];
    else if (parse(startDate) > parse(max)) startData = data[data.length - 1];
  }

  let endData = data.find((item) => item.Date === endDate);
  if (!endData) {
    if (parse(endDate) < parse(min)) endData = data[0];
    else if (parse(endDate) > parse(max)) endData = data[data.length - 1];
  }

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