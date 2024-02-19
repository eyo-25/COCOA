import { useCoinOHLCV } from "@/common/apis/api";
import { useEffect, useRef, useState } from "react";
import drawLineGraph from "./drawLineGraph";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { bannerMenuList } from "../coinchart/CoinChart.data";

function CoinBannerSection() {
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const { data } = useCoinOHLCV("hour", "BTC");
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const filteredData = data.Data.Data.map((item) => {
      const { close, time } = item;
      return { close, time };
    });

    if (svgRef.current) {
      drawLineGraph(svgRef.current, 800, 220, filteredData);
    }
  }, [data]);

  const menuClickHandler = (id: number) => {
    if (selectedMenuId === id) return;
    setSelectedMenuId(id);
  };

  return (
    <div className="flex flex-col max-w-5xl px-8 mx-auto my-3">
      <section className="flex justify-between items-center w-full bg-gray-700 h-[345px] px-5 py-7 rounded-md">
        <button className="w-10 h-10 pr-[2px] bg-gray-800 rounded-md flex-center">
          <IoChevronBack className="w-6 h-6 mx-auto" />
        </button>
        <div className="w-[780px] h-full mx-auto">
          <div className="flex items-center mb-3">
            <div className="flex w-8 h-8 mr-[10px] bg-gray-100 rounded-full">
              <img
                className="w-full h-full scale-125"
                src="https://www.cryptocompare.com//media/37746251/btc.png"
              />
            </div>
            <h2 className="mr-2 text-xl font-bold text-gray-100">비트코인</h2>
            <p className="text-lg">BTC</p>
          </div>
          <ul className="flex mb-[14px] mt-4 text-sm text-gray-300">
            {bannerMenuList.map(({ title }, i) => (
              <li
                className="w-20 h-4 border-l border-gray-300 flex-center last:border-r"
                key={i}
              >
                <button
                  className={`${
                    selectedMenuId === i && "font-bold text-green"
                  }`}
                  onClick={() => menuClickHandler(i)}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
          <svg ref={svgRef} width={800} height={230}></svg>
        </div>
        <button className="w-10 h-10 bg-gray-800 rounded-md flex-center pl-[2px]">
          <IoChevronForward className="w-6 h-6 mx-auto" />
        </button>
      </section>
    </div>
  );
}

export default CoinBannerSection;
