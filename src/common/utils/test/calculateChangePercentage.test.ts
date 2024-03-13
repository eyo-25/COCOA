import { test, expect } from "vitest";
import { calculateChangePercentage } from "../calculateChangePercentage";

test("calculateChangePercentage 테스트", () => {
  const testCases = [
    { openPrice: 0, currentPrice: 0, expected: 0 },
    { openPrice: 0, currentPrice: 1234, expected: 0 },
    { openPrice: 1234, currentPrice: 0, expected: -100 },
    { openPrice: 1000, currentPrice: 1100, expected: 10 },
    { openPrice: 1000, currentPrice: 11000000000, expected: 1099999900 },
    { openPrice: 11000000000, currentPrice: 1000, expected: -100 },
    { openPrice: 1234.123, currentPrice: 1234.123, expected: 0 },
    { openPrice: 62038.396, currentPrice: 62038.394, expected: -0 },
    {
      openPrice: 0.206000685088242,
      currentPrice: 0.406000685088242,
      expected: 97.09,
    },
    {
      openPrice: 12345678.12345678,
      currentPrice: 1234,
      expected: -99.99,
    },
    {
      openPrice: 1234,
      currentPrice: 12345678.12345678,
      expected: 1000360.14,
    },
    {
      openPrice: 1231232352525251,
      currentPrice: 0.406000685088242,
      expected: -100,
    },
    {
      openPrice: 0.0000090763887540727,
      currentPrice: 0.00000750876222871651,
      expected: -17.29,
    },
  ];

  testCases.forEach(({ openPrice, currentPrice, expected }) => {
    const changePercent = calculateChangePercentage(openPrice, currentPrice);
    expect(changePercent).toBe(expected);
  });
});
