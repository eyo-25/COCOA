import { expect, test } from "vitest";
import { getChartData } from "../getChartData";

const chartResponse = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 59865,
    market_cap: 1200070344227,
    circulating_supply: 20049687,
    price_change_percentage_1h_in_currency: -0.116,
    price_change_percentage_24h_in_currency: -0.704,
    price_change_percentage_7d_in_currency: -6.589,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 1572.71,
    market_cap: 189753517799,
    circulating_supply: 120683477,
    price_change_percentage_1h_in_currency: -0.372,
    price_change_percentage_24h_in_currency: -0.478,
    price_change_percentage_7d_in_currency: -9.903,
  },
];

test("CoinGecko 마켓 응답을 차트 데이터로 변환한다", () => {
  const result = getChartData(chartResponse);

  expect(result).toMatchObject([
    {
      Id: "bitcoin",
      FullName: "Bitcoin",
      Internal: "BTC",
      ImageUrl:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
      PRICE: 59865,
      SUPPLY: 20049687,
      MKTCAP: 1200070344227,
    },
    {
      Id: "ethereum",
      FullName: "Ethereum",
      Internal: "ETH",
      ImageUrl:
        "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
      PRICE: 1572.71,
      SUPPLY: 120683477,
      MKTCAP: 189753517799,
    },
  ]);
  expect(result[0].OPENHOUR).toBeCloseTo(59934.52, 2);
  expect(result[0].OPEN24HOUR).toBeCloseTo(60289.44, 2);
  expect(result[0].OPENDAY).toBeCloseTo(64087.74, 2);
  expect(result[1].OPENHOUR).toBeCloseTo(1578.58, 2);
  expect(result[1].OPEN24HOUR).toBeCloseTo(1580.26, 2);
  expect(result[1].OPENDAY).toBeCloseTo(1745.57, 2);
});

test("API 응답이 배열이 아니면 빈 차트 데이터를 반환한다", () => {
  expect(getChartData({ Message: "rate limit" })).toEqual([]);
});
