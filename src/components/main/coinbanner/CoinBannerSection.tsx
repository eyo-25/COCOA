import { useCoinOHLCV } from "@/common/apis/api";
import { useEffect, useRef } from "react";
import drawLineChart from "./drawLineChart";

function CoinBannerSection() {
  const { data } = useCoinOHLCV("hour", "BTC");
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const filteredData = data.Data.Data.map((item) => {
      const { close, time } = item;
      return { close, time };
    });

    if (svgRef.current) {
      drawLineChart(svgRef.current, 800, 400, filteredData);
    }
  });

  return (
    <section className="flex flex-col max-w-6xl px-8 mx-auto mt-10 mb-4">
      <svg ref={svgRef} width={800} height={400}></svg>
    </section>
  );
}

export default CoinBannerSection;
