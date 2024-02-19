import { expect, test } from "vitest";
import { render, screen } from "@/common/test-utils/testing-utils";
import { HttpResponse, http } from "msw";
import CoinChartSection from "../CoinChartSection";
import { server } from "@/setupTests";

test("handler 에러 테스트", async () => {
  server.resetHandlers(
    http.get(`${import.meta.env.VITE_API_URL}/data/top/:coinTrends`, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<CoinChartSection />);

  // 에러 텍스트 확인
  const errorMsg = await screen.findByText(
    "An unexpected error occurred. Please try again later."
  );

  expect(errorMsg).toBeInTheDocument();
});

test("빈 데이터 테스트", async () => {
  server.resetHandlers(
    http.get(`${import.meta.env.VITE_API_URL}/data/top/:coinTrends`, () => {
      return HttpResponse.json(
        {
          Data: [],
        },
        { status: 200 }
      );
    })
  );

  render(<CoinChartSection />);

  const emptyText = await screen.findByText("데이터가 존재하지 않습니다.");

  expect(emptyText).toBeInTheDocument();
});
