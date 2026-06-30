import { expect, test, vi } from "vitest";
import {
  fetchBinanceUsdtSpotSymbols,
  getBinanceCombinedStreamUrl,
  getBinanceUsdtTickerStreams,
} from "../binance";
import { CoinChartDataType } from "@/common/types/data.type";

const coin = (internal: string): CoinChartDataType => ({
  Id: internal.toLowerCase(),
  FullName: internal,
  Internal: internal,
  ImageUrl: "",
  PRICE: 1,
  OPENHOUR: 1,
  OPEN24HOUR: 1,
  OPENDAY: 1,
  SUPPLY: 1,
  MKTCAP: 1,
});

test("Binance USDT 현물 거래쌍만 ticker stream으로 만든다", () => {
  const streams = getBinanceUsdtTickerStreams(
    [coin("BTC"), coin("ETH"), coin("HYPE")],
    new Set(["BTCUSDT", "ETHUSDT"])
  );

  expect(streams).toEqual(["btcusdt@ticker", "ethusdt@ticker"]);
  expect(getBinanceCombinedStreamUrl(streams)).toBe(
    "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker"
  );
});

test("Binance exchangeInfo에서 거래 가능한 USDT 현물 심볼만 캐시한다", async () => {
  localStorage.clear();

  const fetcher = vi.fn(async () => {
    return {
      ok: true,
      json: async () => ({
        symbols: [
          {
            symbol: "BTCUSDT",
            status: "TRADING",
            baseAsset: "BTC",
            quoteAsset: "USDT",
            isSpotTradingAllowed: true,
          },
          {
            symbol: "ETHBTC",
            status: "TRADING",
            baseAsset: "ETH",
            quoteAsset: "BTC",
            isSpotTradingAllowed: true,
          },
          {
            symbol: "OLDUSDT",
            status: "BREAK",
            baseAsset: "OLD",
            quoteAsset: "USDT",
            isSpotTradingAllowed: true,
          },
        ],
      }),
    } as Response;
  });

  const symbols = await fetchBinanceUsdtSpotSymbols(fetcher);

  expect([...symbols]).toEqual(["BTCUSDT"]);
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(
    JSON.parse(localStorage.getItem("binance:usdt-spot-symbols") ?? "{}").data
  ).toEqual(["BTCUSDT"]);
});
