import { useCoinOHLCV } from "@/common/apis/api";
import { useEffect, useRef } from "react";
import drawLineGraph from "./drawLineGraph";
import drawBarGraph from "./drawBarGraph";

function CoinBannerSection() {
  const { data } = useCoinOHLCV("hour", "BTC");
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);

  useEffect(() => {
    if (!data) return;

    const filteredData = data.Data.Data.map((item) => {
      const { close, time } = item;
      return { close, time };
    });

    if (svgRef.current && svgRef2.current) {
      drawLineGraph(svgRef.current, 800, 400, filteredData);
      drawBarGraph(svgRef2.current, 800, 80, filteredData);
    }
  });

  return (
    <section
      id="coin-banner-section"
      className="flex flex-col max-w-6xl px-8 mx-auto mt-10 mb-4"
    >
      <svg ref={svgRef} width={800} height={400}></svg>
      <svg ref={svgRef2} width={800} height={80}></svg>
    </section>
  );
}

export default CoinBannerSection;
