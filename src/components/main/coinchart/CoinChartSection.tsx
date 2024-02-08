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
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { data, isLoading } = useCoinTrends(menuList[selectedMenuId].url);

  const menuClickHandler = (id: number) => {
    setSelectedMenuId(id);
  };

  useEffect(() => {
    if (!data) return;

    const res = getChartData(data);
    const nameList = res.map((item) => item.Internal);
    setCoinList(nameList);
    setChartData(res);

    console.log("a");
  }, [data]);

  useEffect(() => {
    if (!coinList.length) return;

    const socket = new WebSocket(
      `wss://streamer.cryptocompare.com/v2?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );

    socket.onopen = () => {
      const subscriptions = coinList.map((coin) => `2~Coinbase~${coin}~USD`);
      const subscriptionMessage = {
        action: "SubAdd",
        subs: subscriptions,
      };
      socket.send(JSON.stringify(subscriptionMessage));
    };

    socket.onmessage = (event) => {
      if (!data) return;
      const receivedData = JSON.parse(event.data);

      const res = getChartData(data, receivedData);
      setChartData(res);
    };

    return () => {
      socket.close();
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
