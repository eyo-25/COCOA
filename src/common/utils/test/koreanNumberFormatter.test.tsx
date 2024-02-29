import { test, expect } from "vitest";
import { koreanNumberFormatter } from "../koreanNumberFormatter";

test("koreanNumberFormatter 테스트", () => {
  const testCases = [
    { input: 0, expected: "정보 없음" },
    { input: 1234, expected: "1234" },
    { input: 12345, expected: "1.23만" },
    { input: 1231232352525251, expected: "1231.23조" },
    { input: 9876543.21, expected: "987.65만" },
    { input: 0.00000000000001, expected: "정보 없음" },
    { input: 0.0000500005001, expected: "0.00005" },
    { input: 201732917.3334809, expected: "2.02억" },
  ];

  testCases.forEach(({ input, expected }) => {
    const formattedPrice = koreanNumberFormatter(input);
    expect(formattedPrice).toBe(expected);
  });
});
