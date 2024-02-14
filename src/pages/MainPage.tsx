import CoinBannerSection from "@/components/main/coinbanner/CoinBannerSection";
import CoinChartSection from "@/components/main/coinchart/CoinChartSection";

function MainPage() {
  return (
    <main className="w-full">
      <CoinBannerSection />
      <CoinChartSection />
    </main>
  );
}

export default MainPage;
