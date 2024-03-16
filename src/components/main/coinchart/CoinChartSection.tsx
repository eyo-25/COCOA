import { useEffect, useRef, useState } from "react";

import CoinChartBoard from "./CoinChartBoard";
import CoinChartMenu from "../../ui/CoinChartMenu";
import {
  chartMenuList,
  chartWidthList,
  menuList,
  screenGridOffset,
} from "./CoinChart.data";
import { CoinChartDataType, WebsocketDataType } from "@/common/types/data.type";
import { getChartData } from "@/common/utils/getChartData";
import { useCoinTrends } from "@/common/apis/useCoinTrends";
import CoinChartSkeleton from "./CoinChartSkeleton";
import Error from "@/components/ui/Error";
import { useResponsive } from "@/common/hooks/useResonsive";

function CoinChartSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const [coinList, setCoinList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<CoinChartDataType[]>([]);
  const { screenSize } = useResponsive();
  const { data, isLoading, error } = useCoinTrends(
    menuList[selectedMenuId].url
  );
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

    setCoinList(nameList);
    setChartData(chatDataRes);
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
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <section className="mb-4">
      <CoinChartMenu
        menuList={menuList}
        selectedMenuId={selectedMenuId}
        menuClickHandler={menuClickHandler}
      />
      <div className="relative flex flex-col w-full h-full min-h-[1200px] mini:min-h-[1000px] mobile:min-h-[1000px] bg-gray-700 rounded-md py-5 mobile:py-4 px-7 tablet:px-5 mini:px-4 mobile:px-3">
        {error && <Error style="pt-[80px]" />}
        {data && chartData.length <= 0 && (
          <Error style="pt-[80px]" text="데이터가 존재하지 않습니다." />
        )}
        <table className="flex flex-col w-full h-full">
          <thead>
            <tr className="flex w-full mb-3">
              {chartMenuList
                .slice(0, screenGridOffset[screenSize])
                .map(({ label }, i) => (
                  <th
                    className="font-[500]"
                    key={label}
                    style={{
                      width: `${chartWidthList[screenSize][i]}%`,
                    }}
                  >
                    {label}
                  </th>
                ))}
            </tr>
          </thead>
          {isLoading && <CoinChartSkeleton screenSize={screenSize} />}
          {data && (
            <CoinChartBoard chartData={chartData} screenSize={screenSize} />
          )}
        </table>
      </div>
    </section>
  );
}

export default CoinChartSection;
