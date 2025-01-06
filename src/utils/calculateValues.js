export const calculateValues = (data, baseCurrency, startDate, endDate, amount) => {
  if (!data || !startDate || !endDate) {
    return { startValues: null, endValues: null };
  }

  const startData = data.find((item) => item.Date === startDate);
  const endData = data.find((item) => item.Date === endDate);

  if (!startData || !endData) {
    return { startValues: null, endValues: null };
  }

  const startValues = {
    tryValue: baseCurrency === "TRY" ? amount : amount * startData.USDTRY,
    usdValue: baseCurrency === "USD" ? amount : amount / startData.USDTRY,
    eurValue: amount / startData.EURTRY,
    goldValue: amount / startData.GoldPerGramTRY,
    minWageRatio: amount / startData.minWageNetTRY,
    normalizedValue:
      baseCurrency === "TRY"
        ? amount / startData.USDTRY_TRY_NORM
        : amount * startData.USDTRY_TRY_NORM,
  };

  const endValues = {
    tryValue:
      baseCurrency === "TRY"
        ? startValues.tryValue * (endData.TRYInflationIndex / startData.TRYInflationIndex)
        : amount * (startData.USDTRY / endData.USDTRY),
    usdValue:
      baseCurrency === "USD"
        ? startValues.usdValue * (endData.USDInflationIndex / startData.USDInflationIndex)
        : amount / endData.USDTRY,
    eurValue: startValues.eurValue * (startData.EURTRY / endData.EURTRY),
    goldValue: startValues.goldValue * (startData.GoldPerGramTRY / endData.GoldPerGramTRY),
    minWageRatio: amount / endData.minWageNetTRY,
    normalizedValue:
      baseCurrency === "TRY"
        ? amount / endData.USDTRY_TRY_NORM
        : amount * endData.USDTRY_TRY_NORM,
  };

  return { startValues, endValues };
};