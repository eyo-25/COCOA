import CoinDetailChart from "./CoinDetailChart";
import CoinDetailMenu from "./CoinDetailMenu";
import CoinDetailNews from "./CoinDetailNews";
import CoinDetailProfile from "./CoinDetailProfile";

function CoinDetailSection() {
  return (
    <>
      <CoinDetailMenu />
      {/* lazy로 필요한 것만 먼저 불러옴 */}
      <CoinDetailChart />
      <CoinDetailProfile />
      <CoinDetailNews />
    </>
  );
}

export default CoinDetailSection;
