import { expect, test } from "vitest";
import { getChartData } from "../getChartData";
import { GetCoinDataType } from "@/common/types/data.type";

const chartResponse: GetCoinDataType = {
  Data: [
    {
      CoinInfo: {
        Id: "1182",
        FullName: "Bitcoin",
        Internal: "BTC",
        ImageUrl: "/media/37746251/btc.png",
      },
      RAW: {
        USD: {
          SUPPLY: 19625931,
          PRICE: 48281.0189921983,
          OPENHOUR: 47951.0598816422,
          OPEN24HOUR: 48253.2787529296,
          OPENDAY: 48311.1638926435,
          MKTCAP: 947559947350.5735,
        },
      },
    },
    {
      CoinInfo: {
        Id: "7605",
        FullName: "Etherium",
        Internal: "ETH",
        ImageUrl: "/media/37746238/eth.png",
      },
    },
  ],
};

test("RAW 값이 있는 코인만 차트 데이터로 변환한다", () => {
  expect(getChartData(chartResponse)).toEqual([
    {
      Id: "1182",
      FullName: "Bitcoin",
      Internal: "BTC",
      ImageUrl: "/media/37746251/btc.png",
      PRICE: 48281.0189921983,
      OPENHOUR: 47951.0598816422,
      OPEN24HOUR: 48253.2787529296,
      OPENDAY: 48311.1638926435,
      SUPPLY: 19625931,
      MKTCAP: 947559947350.5735,
    },
  ]);
});

test("API 응답 Data가 배열이 아니면 빈 차트 데이터를 반환한다", () => {
  const invalidResponse = { Data: { Message: "rate limit" } };

  expect(getChartData(invalidResponse as unknown as GetCoinDataType)).toEqual(
    []
  );
});
