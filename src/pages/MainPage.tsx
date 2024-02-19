import { CoininfoType } from "@/common/types/data.type";
import CoinBannerSection from "@/components/main/coinbanner/CoinBannerSection";
import CoinChartSection from "@/components/main/coinchart/CoinChartSection";
import { useState } from "react";

const mock = {
  Id: "123",
  FullName: "BitCoin",
  Internal: "BTC",
  ImageUrl: "/media/37746251/btc.png",
};

function MainPage() {
  const [coinList, setCoinList] = useState<CoininfoType[]>([mock]);

  return (
    <main className="w-full">
      <CoinBannerSection coinList={coinList} />
      {/* <CoinChartSection coinList={coinList} setCoinList={setCoinList} /> */}
    </main>
  );
}

export default MainPage;
