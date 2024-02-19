import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/data/top/:coinTrends`, () => {
    return HttpResponse.json(
      {
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
            RAW: {
              USD: {
                SUPPLY: 120170002.44513807,
                PRICE: 48281.0189921983,
                OPENHOUR: 2487.16495651191,
                OPEN24HOUR: 2514.94516668726,
                OPENDAY: 2507.90898159167,
                MKTCAP: 300150784470.909,
              },
            },
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.get(`${import.meta.env.VITE_API_URL}/data/v2/:timeType`, () => {
    return HttpResponse.json(
      {
        Data: {
          Data: [
            {
              time: 1707912000,
              close: 51593.01,
            },
            {
              time: 1707915600,
              close: 51838.27,
            },
          ],
        },
      },
      { status: 200 }
    );
  }),
];
