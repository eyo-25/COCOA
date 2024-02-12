import { useEffect, useRef, useState } from "react";
import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "./CoinChartMenu";
import { useCoinTrends } from "@/common/apis/api";
import { menuList } from "./CoinChart.data";
import { CoinChartDataType, WebsocketDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";

function CoinChartSection() {
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const [prevCoinList, setPrevCoinList] = useState<string[]>([]);
  const [coinList, setCoinList] = useState<string[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { data, isLoading } = useCoinTrends(menuList[selectedMenuId].url);
  const socketRef = useRef<WebSocket | null>(null);

  const menuClickHandler = (id: number) => {
    setSelectedMenuId(id);
  };

  useEffect(() => {
    if (!data) return;

    const res = getChartData(data);
    const nameList = res.map((item) => item.Internal);
    if (0 < coinList.length) {
      setPrevCoinList(coinList);
    }
    setChartData(res);
    setCoinList(nameList);
  }, [data]);

  useEffect(() => {
    socketRef.current = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    return () => {
      if (!socketRef.current) return;
      socketRef.current.close();
    };
  }, [socketRef]);

  useEffect(() => {
    if (!socketRef.current) return;

    if (0 < prevCoinList.length) {
      const commonArr = prevCoinList.filter((item) => coinList.includes(item));

      const unsubscriptions = prevCoinList
        .filter((item) => !commonArr.includes(item))
        .map((coin) => `2~Coinbase~${coin}~USD`);
      const newSubscriptions = coinList
        .filter((item) => !commonArr.includes(item))
        .map((coin) => `2~Coinbase~${coin}~USD`);

      if (0 < unsubscriptions.length) {
        const unsubscriptionMessage = {
          action: "SubRemove",
          subs: unsubscriptions,
        };
        socketRef.current.send(JSON.stringify(unsubscriptionMessage));
      }

      if (0 < newSubscriptions.length) {
        const subscriptionMessage = {
          action: "SubAdd",
          subs: newSubscriptions,
        };
        socketRef.current.send(JSON.stringify(subscriptionMessage));
      }
    } else {
      socketRef.current.onopen = () => {
        const subscriptions = coinList.map((coin) => `2~Coinbase~${coin}~USD`);
        const subscriptionMessage = {
          action: "SubAdd",
          subs: subscriptions,
        };
        if (!socketRef.current) return;
        socketRef.current.send(JSON.stringify(subscriptionMessage));
      };
    }

    socketRef.current.onmessage = (event) => {
      if (!data) return;

      const receivedData: WebsocketDataType = JSON.parse(event.data);
      if (!receivedData.PRICE) return;

      const res = getChartData(data, receivedData);
      setChartData(res);
    };
  }, [coinList]);

  return (
    <section className="flex flex-col max-w-6xl px-8 mx-auto mt-10 mb-4">
      <CoinChartMenu
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <div className="w-full h-full min-h-[1200px] pb-6 bg-gray-700 rounded-md px-7">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CoinChartBoard chartData={chartData} />
        )}
      </div>
    </section>
  );
}

export default CoinChartSection;
