// Version 2.2.2
export async function fetchData() {
  const response = await fetch("/api/data");
  return response.json();
}

export function calculateValues(baseCurrency, startData, endData, amount) {
  const startRate = baseCurrency === "TRY" ? 1 : startData.USDTRY;
  const endRate = baseCurrency === "TRY" ? 1 : endData.USDTRY;

  const startAmountInBase = amount * startRate;
  const endAmountInBase = (amount * endRate);

  return {
    "TRY Karşılığı": {
      start: baseCurrency === "TRY" ? amount : amount * startData.USDTRY,
      end: baseCurrency === "TRY"
        ? endAmountInBase
        : (amount * startData.USDTRY) / endData.USDTRY,
    },
    "USD Karşılığı": {
      start: baseCurrency === "USD" ? amount : amount / startData.USDTRY,
      end: baseCurrency === "USD"
        ? endAmountInBase
        : (amount / endData.USDTRY),
    },
    // Add similar calculations for EUR, Altın, Asgari Ücret, etc.
  };
}