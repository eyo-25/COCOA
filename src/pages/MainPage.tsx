import { useResponsive } from "@/common/hooks/useResonsive";
import CoinBannerSection from "@/components/main/coinbanner/CoinBannerSection";
import CoinChartSection from "@/components/main/coinchart/CoinChartSection";

function MainPage() {
  const { screenSize } = useResponsive();

  return (
    <>
      {screenSize !== "sm" && screenSize !== "xs" && screenSize !== "base" && (
        <CoinBannerSection />
      )}
      <CoinChartSection />
    </>
  );
}

export default MainPage;
