import { beforeEach, expect, test } from "vitest";
import { HttpResponse, http } from "msw";
import { mutate } from "swr";
import { render, waitFor } from "@/common/test-utils/testing-utils";
import { server } from "@/setupTests";
import CoinBannerSection from "../CoinBannerSection";

const COINGECKO_API_URL = "/api/coingecko";

beforeEach(async () => {
  localStorage.clear();
  await mutate(() => true, undefined, { revalidate: false });
});

test("API 응답 Data가 배열이 아니어도 배너 렌더링이 중단되지 않는다", async () => {
  server.resetHandlers(
    http.get(`${COINGECKO_API_URL}/coins/markets`, () => {
      return HttpResponse.json(
        {
          Message: "rate limit",
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
