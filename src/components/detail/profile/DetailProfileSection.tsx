import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchOHLCVData, useCoinInfo } from "@/common/apis/api";
import { CoinDetailInfoType, timeDataType } from "@/common/types/data.type";
import { calculateChangePercentage } from "@/common/utils/calculateChangePercentage";
import DetailProfileChange from "./DetailProfileChange";
import { IoChevronBack } from "react-icons/io5";
import { XIcon } from "@/common/assets";
import { getProfileData } from "@/common/utils/getProfileData";

function DetailProfileSection() {
  const { coinSymbol } = useParams();
  const { data, isLoading, error } = useCoinInfo(String(coinSymbol));
  const [coinInfo, setCoinInfo] = useState<CoinDetailInfoType>();
  const [timeData, setTimeData] = useState<timeDataType>();

  const getOHLCVDData = async () => {
    const data = await fetchOHLCVData("monthDay", String(coinSymbol));
    const week = calculateChangePercentage(data[24].close, data[30].close);
    const month = calculateChangePercentage(data[0].close, data[30].close);
    setTimeData({ week, month });
  };

  useEffect(() => {
    if (!data) return;
    getOHLCVDData();
    setCoinInfo(getProfileData(data));
  }, [data]);

  return (
    <section className="relative flex-col w-full min-h-[255px] py-10 bg-gray-700 rounded-md flex-center">
      <Link
        to="/"
        className="absolute left-5 top-5 w-9 h-9 pr-[2px] bg-gray-800 rounded-md flex-center"
      >
        <IoChevronBack className="w-6 h-6 mx-auto" />
      </Link>
      <p className="absolute text-sm right-6 top-5">CCCAGG 기준</p>
      {error && (
        <div className="flex flex-col items-center mt-5">
          <XIcon className="mb-2 w-14 h-14" />
          <p>{error.message}</p>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {coinInfo && timeData && (
        <DetailProfileChange coinInfo={coinInfo} timeData={timeData} />
      )}
    </section>
  );
}

export default DetailProfileSection;
