import { expect, test, vi } from "vitest";
import { fetchCoinTrends, getCoinTrendsRequest } from "../useCoinTrends";

test("시총순 코인 목록은 CoinGecko market cap 상위 100개 요청과 캐시 키를 만든다", () => {
  const { url, cacheKey } = getCoinTrendsRequest("/mktcapfull", 100);

  const requestUrl = new URL(url, "http://localhost");

  expect(requestUrl.pathname).toBe("/api/coingecko/coins/markets");
  expect(requestUrl.searchParams.get("vs_currency")).toBe("usd");
  expect(requestUrl.searchParams.get("order")).toBe("market_cap_desc");
  expect(requestUrl.searchParams.get("per_page")).toBe("100");
  expect(requestUrl.searchParams.get("page")).toBe("1");
  expect(requestUrl.searchParams.get("sparkline")).toBe("false");
  expect(requestUrl.searchParams.get("price_change_percentage")).toBe(
    "1h,24h,7d"
  );
  expect(requestUrl.searchParams.get("x_cg_demo_api_key")).toBe(
    "CG-5AbdGMpgfKfedcsttTyehzMN"
  );
  expect(cacheKey).toBe("coin-gecko:markets:market_cap_desc:100");
});

test("거래량 코인 목록은 CoinGecko volume 요청과 캐시 키를 만든다", () => {
  const { url, cacheKey } = getCoinTrendsRequest("/totalvolfull", 15);

  const requestUrl = new URL(url, "http://localhost");

  expect(requestUrl.searchParams.get("order")).toBe("volume_desc");
  expect(requestUrl.searchParams.get("per_page")).toBe("15");
  expect(cacheKey).toBe("coin-gecko:markets:volume_desc:15");
});

test("인기 코인 목록은 CoinGecko trending 요청과 markets 캐시 키를 만든다", () => {
  const request = getCoinTrendsRequest("/totaltoptiervolfull", 25);

  expect(request.type).toBe("trending");
  expect(new URL(request.url, "http://localhost").pathname).toBe(
    "/api/coingecko/search/trending"
  );
  expect(request.cacheKey).toBe("coin-gecko:trending:25");
  if (request.type !== "trending") {
    throw new Error("Expected trending request");
  }
  expect(request.marketCacheKey).toBe("coin-gecko:trending-markets:25");
});

test("인기 코인 목록은 trending id를 markets 데이터로 보강해서 반환한다", async () => {
  localStorage.clear();

  const fetcher = vi.fn(async (url: RequestInfo | URL) => {
    const requestUrl = String(url);

    if (requestUrl.includes("/search/trending")) {
      return {
        ok: true,
        json: async () => ({
          coins: [
            { item: { id: "bitcoin" } },
            { item: { id: "ethereum" } },
          ],
        }),
      } as Response;
    }

    expect(requestUrl).toContain("/coins/markets");
    expect(requestUrl).toContain("ids=bitcoin%2Cethereum");

    return {
      ok: true,
      json: async () => [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image: "",
          current_price: 60000,
          market_cap: 1200000000000,
          circulating_supply: 20000000,
        },
        {
          id: "ethereum",
          symbol: "eth",
          name: "Ethereum",
          image: "",
          current_price: 3000,
          market_cap: 360000000000,
          circulating_supply: 120000000,
        },
      ],
    } as Response;
  });

  const data = await fetchCoinTrends("/totaltoptiervolfull", 2, fetcher);

  expect(data.map((coin) => coin.id)).toEqual(["bitcoin", "ethereum"]);
  expect(fetcher).toHaveBeenCalledTimes(2);
});
