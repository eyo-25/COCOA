import { expect, test } from "vitest";
import { HttpResponse, http } from "msw";
import { render, waitFor } from "@/common/test-utils/testing-utils";
import { server } from "@/setupTests";
import CoinBannerSection from "../CoinBannerSection";

test("API 응답 Data가 배열이 아니어도 배너 렌더링이 중단되지 않는다", async () => {
  server.resetHandlers(
    http.get(`${import.meta.env.VITE_API_URL}/data/top/:coinTrends`, () => {
      return HttpResponse.json(
        {
          Data: { Message: "rate limit" },
        },
        { status: 200 }
      );
    })
  );

  const { container } = render(<CoinBannerSection />);

  await waitFor(() => {
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
