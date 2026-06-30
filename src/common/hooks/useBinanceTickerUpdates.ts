import { useEffect, useRef, useState } from "react";
import {
  BinanceTickerMessage,
  fetchBinanceUsdtSpotSymbols,
  getBinanceCombinedStreamUrl,
  getBinanceUsdtTickerStreams,
} from "../apis/binance";
import { CoinChartDataType } from "../types/data.type";

type Options = {
  enabled: boolean;
  coins: CoinChartDataType[];
  onTicker: (symbol: string, price: number, open24Hour?: number) => void;
};

export const useBinanceTickerUpdates = ({
  enabled,
  coins,
  onTicker,
}: Options) => {
  const [isConnected, setIsConnected] = useState(false);
  const onTickerRef = useRef(onTicker);
  const coinSymbols = coins.map(({ Internal }) => Internal).join(",");

  useEffect(() => {
    onTickerRef.current = onTicker;
  }, [onTicker]);

  useEffect(() => {
    if (!enabled || coins.length <= 0) {
      setIsConnected(false);
      return;
    }

    let socket: WebSocket | null = null;
    let isActive = true;
    setIsConnected(false);

    const connect = async () => {
      try {
        const binanceSymbols = await fetchBinanceUsdtSpotSymbols();
        if (!isActive) return;

        const streams = getBinanceUsdtTickerStreams(coins, binanceSymbols);
        const streamUrl = getBinanceCombinedStreamUrl(streams);
        if (!streamUrl) return;

        socket = new WebSocket(streamUrl);
        socket.onopen = () => {
          if (isActive) setIsConnected(true);
        };
        socket.onclose = () => {
          if (isActive) setIsConnected(false);
        };
        socket.onerror = () => {
          if (isActive) setIsConnected(false);
        };
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data) as BinanceTickerMessage;
          const data = message.data;
          const symbol = data?.s;
          const price = Number(data?.c);
          const open24Hour = Number(data?.o);

          if (!symbol || Number.isNaN(price)) return;

          onTickerRef.current(
            symbol.replace(/USDT$/, ""),
            price,
            Number.isNaN(open24Hour) ? undefined : open24Hour
          );
        };
      } catch (error) {
        console.error(error);
      }
    };

    connect();

    return () => {
      isActive = false;
      setIsConnected(false);
      socket?.close();
    };
  }, [enabled, coinSymbols]);

  return { isConnected };
};
