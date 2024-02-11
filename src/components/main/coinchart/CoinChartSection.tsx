import { useEffect, useState } from "react";
import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "./CoinChartMenu";
import { useCoinTrends } from "@/common/apis/api";
import { menuList } from "./CoinChart.data";
import { CoinChartDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";

function CoinChartSection() {
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const [coinList, setCoinList] = useState<string[]>([]);
  const [prevCoinList, setPrevCoinList] = useState<string[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { data, isLoading } = useCoinTrends(menuList[selectedMenuId].url);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const menuClickHandler = (id: number) => {
    setSelectedMenuId(id);
  };

  useEffect(() => {
    if (!data) return;

    const res = getChartData(data);
    const nameList = res.map((item) => item.Internal);
    setPrevCoinList(coinList);
    setCoinList(nameList);
    setChartData(res);
  }, [data]);

  useEffect(() => {
    if (!coinList.length) return;

    if (socket) {
      const combinedSet = new Set([...prevCoinList, ...coinList]);
      const combinedArray = Array.from(combinedSet);

      const unsubscriptions = prevCoinList
        .filter((item) => !combinedArray.includes(item))
        .map((coin) => `2~Coinbase~${coin}~USD`);
      const newSubscriptions = coinList
        .filter((item) => !combinedArray.includes(item))
        .map((coin) => `2~Coinbase~${coin}~USD`);

      console.log(combinedArray);
      console.log(newSubscriptions.length);
      console.log(unsubscriptions.length);

      if (0 < unsubscriptions.length) {
        const unsubscriptionMessage = {
          action: "SubRemove",
          subs: unsubscriptions,
        };
        socket.send(JSON.stringify(unsubscriptionMessage));

        console.log("동작");
      }

      if (0 < newSubscriptions.length) {
        const subscriptionMessage = {
          action: "SubAdd",
          subs: newSubscriptions,
        };
        socket.send(JSON.stringify(subscriptionMessage));

        console.log("동작2");
      }
    } else {
      const newSocket = new WebSocket(
        `wss://streamer.cryptocompare.com/v2?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );

      newSocket.onopen = () => {
        const subscriptions = coinList.map((coin) => `2~Coinbase~${coin}~USD`);
        const subscriptionMessage = {
          action: "SubAdd",
          subs: subscriptions,
        };
        newSocket.send(JSON.stringify(subscriptionMessage));
      };

      newSocket.onmessage = (event) => {
        if (!data) return;
        const receivedData = JSON.parse(event.data);

        const res = getChartData(data, receivedData);
        setChartData(res);
      };

      setSocket(newSocket);
    }
  }, [coinList]);

  useEffect(() => {
    return () => {
      console.log("언마운트");
      socket?.close();
    };
  }, []);

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
