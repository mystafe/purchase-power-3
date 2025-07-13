import { calculateValues } from './calculateValues';

const mockData = [
  {
    Date: '2020-01',
    USDTRY: 5.93,
    TRYInflationIndex: 446.45,
    USDInflationIndex: 258.906,
    EURTRY: 6.59,
    GoldPerGramTRY: 297.91,
    minWageNetTRY: 2324.7,
    USDTRY_TRY_NORM: 22.97883301601523,
  },
  {
    Date: '2025-01',
    USDTRY: 35.36,
    TRYInflationIndex: 2684.55,
    USDInflationIndex: 317.3,
    EURTRY: 36.65,
    GoldPerGramTRY: 3009.39,
    minWageNetTRY: 22104,
    USDTRY_TRY_NORM: 22.37455066957218,
  },
];

describe('calculateValues', () => {
  test('handles TRY base currency with inflation adjustment', () => {
    const amount = 1000;
    const result = calculateValues(mockData, 'TRY', '2020-01', '2025-01', amount);

    const expectedEndTRY = amount * (2684.55 / 446.45);
    const expectedStartUSD = amount / 5.93;
    const expectedEndUSD = expectedEndTRY / 35.36;

    expect(result.startValues.tryValue).toBe(amount);
    expect(result.endValues.tryValue).toBeCloseTo(expectedEndTRY, 5);
    expect(result.startValues.usdValue).toBeCloseTo(expectedStartUSD, 5);
    expect(result.endValues.usdValue).toBeCloseTo(expectedEndUSD, 5);
  });

  test('handles USD base currency with exchange rate adjustment', () => {
    const amount = 1000;
    const result = calculateValues(mockData, 'USD', '2020-01', '2025-01', amount);

    const expectedStartTRY = amount * 5.93;
    const expectedEndTRY = expectedStartTRY * (5.93 / 35.36);
    const expectedEndUSD = amount * (317.3 / 258.906);

    expect(result.startValues.tryValue).toBeCloseTo(expectedStartTRY, 5);
    expect(result.endValues.tryValue).toBeCloseTo(expectedEndTRY, 5);
    expect(result.startValues.usdValue).toBe(amount);
    expect(result.endValues.usdValue).toBeCloseTo(expectedEndUSD, 5);
  });
});
