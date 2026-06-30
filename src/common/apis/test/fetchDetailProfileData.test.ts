import { expect, test, vi } from "vitest";
import { fetchDetailProfileData } from "../fetchDetailProfileData";

test("상세 프로필은 CoinGecko coin detail 응답으로 만든다", async () => {
  localStorage.clear();

  const fetcher = vi.fn(async (url: RequestInfo | URL) => {
    const requestUrl = String(url);

    expect(requestUrl).toContain(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    expect(requestUrl).toContain("market_data=true");
    expect(requestUrl).not.toContain("cryptocompare");
    expect(requestUrl).not.toContain("histoday");

    return {
      ok: true,
      json: async () => ({
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: {
          large:
            "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
        },
        market_data: {
          current_price: { usd: 60000 },
          market_cap: { usd: 1200000000000 },
          circulating_supply: 20000000,
          price_change_percentage_1h_in_currency: { usd: 1 },
          price_change_percentage_24h_in_currency: { usd: -2 },
          price_change_percentage_7d_in_currency: { usd: 7 },
          price_change_percentage_30d_in_currency: { usd: 30 },
        },
      }),
    } as Response;
  });

  const result = await fetchDetailProfileData("BTC", fetcher);

  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(result.coinInfo).toEqual({
    Id: "bitcoin",
    FullName: "Bitcoin",
    Internal: "BTC",
    ImageUrl:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
  });
  expect(result.coinDetail.PRICE).toBe("$ 60,000.00");
  expect(result.coinDetail.SUPPLY).toBe("2000.00만");
  expect(result.coinDetail.MKTCAP).toBe("1.20조");
  expect(result.coinDetail.OPENHOUR).toBe(1);
  expect(result.coinDetail.OPEN24HOUR).toBe(-2);
  expect(result.coinDetail.OPENWEEK).toBe(7);
  expect(result.coinDetail.OPENMONTH).toBe(30);
});
