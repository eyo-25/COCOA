import { test, expect } from "vitest";
import { priceFormatter } from "../priceFormatter";

test("priceFormatter 테스트", () => {
  // Test cases
  const testCases = [
    { price: 0, result: "-" },
    { price: 123456, result: "$ 123,456.00" },
    { price: 9876543.2, result: "$ 9,876,543.20" },
    { price: 9876543.21, result: "$ 9,876,543.21" },
    { price: 0.206000685088242, result: "$ 0.206" },
    { price: 0.00000000000001, result: "-" },
    { price: 0.0000500005001, result: "$ 0.00005" },
    { price: 12345678.12345678, result: "$ 12,345,678.12" },
    {
      price: 1231232352525251,
      result: "$ 1,231,232,352,525,251.00",
    },
  ];

  testCases.forEach(({ price, result }) => {
    const formattenPrice = priceFormatter(price);
    expect(formattenPrice).toBe(result);
  });
});
