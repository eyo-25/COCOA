import { useEffect, useRef, useState } from "react";

import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "../../ui/CoinChartMenu";
import { menuList } from "./CoinChart.data";
import { CoinChartDataType, WebsocketDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";
import { useCoinTrends } from "@/common/apis/useCoinTrends";

function CoinChartSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const [coinList, setCoinList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const { data } = useCoinTrends(menuList[selectedMenuId].url);
  const socketRef = useRef<WebSocket | null>(null);

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  const receiveDataChange = (receivedData: WebsocketDataType) => {
    if (!receivedData.PRICE || !data) return;

    const copy = [...chartData];
    const index = copy.findIndex(
      (item) => item.Internal === receivedData.FROMSYMBOL
    );
    const cu = copy[index];
    copy[index] = { ...cu, PRICE: receivedData.PRICE };

    setChartData(copy);
  };

  useEffect(() => {
    if (!data) return;

    const chatDataRes = getChartData(data);
    const nameList = chatDataRes.map((item) => item.Internal);

    setChartData(chatDataRes);

    if (!socketRef.current) {
      setCoinList(nameList);
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
    }
  }, [data]);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.onmessage = (event) => {
      const receivedData: WebsocketDataType = JSON.parse(event.data);

      receiveDataChange(receivedData);
    };
  }, [chartData]);

  useEffect(() => {
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return (
    <section className="mb-4">
      <CoinChartMenu
        menuList={menuList}
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <div className="w-full h-full min-h-[1200px] pb-6 bg-gray-700 rounded-md px-7">
        {data && 0 < chartData.length && (
          <CoinChartBoard chartData={chartData} />
        )}
      </div>
    </section>
  );
}

export default CoinChartSection;
