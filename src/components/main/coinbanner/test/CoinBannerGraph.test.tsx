import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CoinBannerGraph from "../CoinBannerGraph";

const fetchOHLCVDataMock = vi.hoisted(() => vi.fn());
const drawLineGraphMock = vi.hoisted(() => vi.fn());

vi.mock("@/common/apis/fetchOHLCVData", () => ({
  fetchOHLCVData: fetchOHLCVDataMock,
}));

vi.mock("../drawLineGraph", () => ({
  default: drawLineGraphMock,
}));

const defaultProps = {
  isBannerStop: false,
  selectedMenuType: "day" as const,
  setSelectedMenuType: vi.fn(),
  timerStop: vi.fn(),
  timerReset: vi.fn(),
};

test("배너 차트 요청이 실패한 뒤 다음 코인 요청이 성공하면 에러 메시지를 숨긴다", async () => {
  fetchOHLCVDataMock.mockRejectedValueOnce(new Error("rate limit"));

  const { rerender } = render(
    <CoinBannerGraph
      {...defaultProps}
      displayCoin={{
        Id: "bitcoin",
        ImageUrl: "",
        Internal: "BTC",
        FullName: "Bitcoin",
      }}
    />
  );

  expect(
    await screen.findByText("에러가 발생했습니다. 다시 시도해 주세요.")
  ).toBeInTheDocument();

  fetchOHLCVDataMock.mockResolvedValueOnce([
    { time: 1719792000, close: 60000 },
    { time: 1719795600, close: 60100 },
  ]);

  rerender(
    <CoinBannerGraph
      {...defaultProps}
      displayCoin={{
        Id: "ethereum",
        ImageUrl: "",
        Internal: "ETH",
        FullName: "Ethereum",
      }}
    />
  );

  await waitFor(() => {
    expect(drawLineGraphMock).toHaveBeenCalled();
  });

  expect(
    screen.queryByText("에러가 발생했습니다. 다시 시도해 주세요.")
  ).not.toBeInTheDocument();
});
