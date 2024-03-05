import { CoinDetailDataType, OHLCVDataType } from "../types/data.type";
import { getProfileData } from "../utils/getProfileData";
import { fetchAxios } from "../utils/fetchAxios";

export const fetchDetailProfileData = async (coinInternal: string) => {
  try {
    const fetchtTopExchangesData = fetchAxios<CoinDetailDataType>(
      `${
        import.meta.env.VITE_API_URL +
        "/data/top/exchanges/full?fsym=" +
        coinInternal +
        "&tsym=USD&limit=1&api_key=" +
        import.meta.env.VITE_API_KEY
      }`
    );
    const fetchHistoData = fetchAxios<OHLCVDataType>(
      `${
        import.meta.env.VITE_API_URL +
        "/data/v2/histoday?fsym=" +
        coinInternal +
        "&tsym=USD&limit=30&aggregate=1&api_key=" +
        import.meta.env.VITE_API_KEY
      }`
    );

    const [topExchangesData, histoData] = await Promise.all([
      fetchtTopExchangesData,
      fetchHistoData,
    ]);

    if (topExchangesData.Response === "Error") {
      throw new Error(`Top Exchanges Error: ${topExchangesData.Message}`);
    }
    if (histoData.Response === "Error") {
      throw new Error(`Histo Data Error: ${histoData.Message}`);
    }

    return getProfileData(topExchangesData, histoData.Data.Data);
  } catch (error: unknown) {
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error("An unexpected error occurred");
  }
};
