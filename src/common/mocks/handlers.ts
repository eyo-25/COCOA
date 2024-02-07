import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(
    `${import.meta.env.VITE_BASE_URL}/data/top/totaltoptiervolfull`,
    () => {
      return HttpResponse.json(
        [
          {
            CoinInfo: {
              Id: "1182",
              Name: "BTC",
              FullName: "Bitcoin",
              Internal: "BTC",
              ImageUrl: "/media/37746251/btc.png",
            },
            RAW: {
              KRW: {
                LASTUPDATE: 1707280476,
              },
            },
            DISPLAY: {
              KRW: {
                PRICE: "₩ 58,961,267.4",
                OPENHOUR: "₩ 58,738,799.3",
                OPEN24HOUR: "₩ 58,762,053.3",
                MKTCAP: "₩ 1,156,861.34 B",
                VOLUME24HOUR: "Ƀ 4,389.75",
              },
            },
          },
          {
            CoinInfo: {
              Id: "7605",
              Name: "ETH",
              FullName: "Ethereum",
              Internal: "ETH",
              ImageUrl: "/media/37746238/eth.png",
            },
            RAW: {},
            DISPLAY: {
              KRW: {
                LASTUPDATE: 1707280475,
                PRICE: "₩ 58,961,267.4",
                OPENHOUR: "₩ 58,738,799.3",
                OPEN24HOUR: "₩ 58,762,053.3",
                MKTCAP: "₩ 1,156,861.34 B",
                VOLUME24HOUR: "Ξ 21,475.9",
              },
            },
          },
        ],
        { status: 200 }
      );
    }
  ),
];
