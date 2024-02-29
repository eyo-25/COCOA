import { test, expect } from "vitest";
import { priceFormatter } from "../priceFormatter";

test("priceFormatter 테스트", () => {
  // Test cases
  const testCases = [
    { price: -0.1234, expected: "-" },
    { price: -1, expected: "-" },
    { price: 0, expected: "-" },
    { price: 123456, expected: "$ 123,456.00" },
    { price: 9876543.2, expected: "$ 9,876,543.20" },
    { price: 9876543.21, expected: "$ 9,876,543.21" },
    { price: 0.206000685088242, expected: "$ 0.206001" },
    { price: 0.00000000000001, expected: "-" },
    { price: 0.0000500005001, expected: "$ 0.00005" },
    { price: 12345678.12345678, expected: "$ 12,345,678.12" },
    {
      price: 1231232352525251,
      expected: "$ 1,231,232,352,525,251.00",
    },
  ];

  testCases.forEach(({ price, expected }) => {
    const formattenPrice = priceFormatter(price);
    expect(formattenPrice).toBe(expected);
  });
});
