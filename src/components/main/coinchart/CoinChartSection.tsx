import { useEffect, useRef, useState } from "react";
import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "./CoinChartMenu";
import { useCoinTrends } from "@/common/apis/api";
import { menuList } from "./CoinChart.data";
import { CoinChartDataType, WebsocketDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";

function CoinChartSection() {
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const [coinList, setCoinList] = useState<string[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { data, isLoading, error } = useCoinTrends(
    menuList[selectedMenuId].url
  );
  const socketRef = useRef<WebSocket | null>(null);

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  useEffect(() => {
    if (!data) return;

    const res = getChartData(data);
    const nameList = res.map((item) => item.Internal);

    if (!socketRef.current) {
      const newWebSocket = new WebSocket(
        `${import.meta.env.VITE_WEBSOCKET_URL}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      newWebSocket.onopen = () => {
        const subscriptions = nameList.map((coin) => `2~Coinbase~${coin}~USD`);
        const subscriptionMessage = {
          action: "SubAdd",
          subs: subscriptions,
        };
        newWebSocket.send(JSON.stringify(subscriptionMessage));
      };

      newWebSocket.onmessage = (event) => {
        if (!data) return;
        const receivedData: WebsocketDataType = JSON.parse(event.data);

        if (!receivedData.PRICE) return;

        const res = getChartData(data, receivedData);
        setChartData(res);
      };

      socketRef.current = newWebSocket;
    } else if (socketRef.current.readyState === WebSocket.OPEN) {
      const commonArr = coinList.filter((item) => nameList.includes(item));

      const unsubscriptions = coinList
        .filter((item) => !commonArr.includes(item))
        .map((coin) => `2~Coinbase~${coin}~USD`);
      const newSubscriptions = nameList
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

      if (0 < newSubscriptions.length || 0 < unsubscriptions.length) {
        socketRef.current.onmessage = (event) => {
          if (!data) return;

          const receivedData: WebsocketDataType = JSON.parse(event.data);
          if (!receivedData.PRICE) return;

          const res = getChartData(data, receivedData);
          setChartData(res);
        };
      }
    }

    setChartData(res);
    setCoinList(nameList);
  }, [data]);

  useEffect(() => {
    return () => {
      if (!socketRef.current) return;
      socketRef.current.close();
      socketRef.current = null;
    };
  }, []);

  return (
    <section className="flex flex-col max-w-5xl px-8 mx-auto mt-6 mb-4">
      <CoinChartMenu
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      {error ? (
        <div>An unexpected error occurred. Please try again later.</div>
      ) : (
        <div className="w-full h-full min-h-[1200px] pb-6 bg-gray-700 rounded-md px-7">
          {isLoading ? (
            <div>Loading...</div>
          ) : 0 < chartData.length ? (
            <CoinChartBoard chartData={chartData} />
          ) : (
            <p>데이터가 존재하지 않습니다.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default CoinChartSection;
