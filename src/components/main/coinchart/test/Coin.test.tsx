import { render } from "@/common/test-utils/testing-utils";
import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import CoinChartSection from "../CoinChartSection";

test("비동기 요청 테스트", async () => {
  render(<CoinChartSection />);

  const BTCText = await screen.findByText(/BTC/i);
  expect(BTCText).toBeInTheDocument();
});
