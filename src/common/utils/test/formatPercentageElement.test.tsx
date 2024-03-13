import { test, expect } from "vitest";
import { formatPercentageElement } from "../formatPercentageElement";

test("calculateChangePercentage 테스트", () => {
  const testCases = [
    { input: 0, expectedClassName: "text-gray-200", expectedText: "0.00%" },
    { input: -100, expectedClassName: "text-red", expectedText: "-100.00%" },
    { input: 10, expectedClassName: "text-green", expectedText: "+10.00%" },
    { input: 97.09, expectedClassName: "text-green", expectedText: "+97.09%" },
    { input: -99.99, expectedClassName: "text-red", expectedText: "-99.99%" },
    {
      input: 1000360.14,
      expectedClassName: "text-green",
      expectedText: "+100.04만%",
    },
    { input: -17.29, expectedClassName: "text-red", expectedText: "-17.29%" },
  ];

  testCases.forEach(({ input, expectedClassName, expectedText }) => {
    const changePercent = formatPercentageElement(input);

    const actualClassName = changePercent.props.className;
    const actualText = changePercent.props.children.join("");

    expect(actualClassName).toBe(expectedClassName);
    expect(actualText).toBe(expectedText);
  });
});
