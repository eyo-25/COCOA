import { HttpResponse, http } from "msw";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export const handlers = [
  http.get(`${COINGECKO_API_URL}/coins/markets`, () => {
    return HttpResponse.json(
      [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image:
            "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
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
      ],
      { status: 200 }
    );
  }),
  http.get(`${COINGECKO_API_URL}/coins/:coinId/market_chart`, () => {
    return HttpResponse.json(
      {
        prices: [
          [1707912000000, 51593.01],
          [1707915600000, 51838.27],
        ],
      },
      { status: 200 }
    );
  }),
  http.get(`${COINGECKO_API_URL}/coins/:coinId`, ({ params }) => {
    const coinId = String(params.coinId);
    const symbol = coinId === "ethereum" ? "eth" : "btc";
    const name = coinId === "ethereum" ? "Ethereum" : "Bitcoin";

    return HttpResponse.json(
      {
        id: coinId,
        symbol,
        name,
        image: {
          large:
            coinId === "ethereum"
              ? "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png"
              : "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
        },
        market_data: {
          current_price: { usd: coinId === "ethereum" ? 1572.71 : 59865 },
          market_cap: {
            usd: coinId === "ethereum" ? 189753517799 : 1200070344227,
          },
          circulating_supply:
            coinId === "ethereum" ? 120683477 : 20049687,
          price_change_percentage_1h_in_currency: { usd: -0.116 },
          price_change_percentage_24h_in_currency: { usd: -0.704 },
          price_change_percentage_7d_in_currency: { usd: -6.589 },
          price_change_percentage_30d_in_currency: { usd: 12.345 },
        },
      },
      { status: 200 }
    );
  }),
];
