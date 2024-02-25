import { fetchOHLCVData, useCoinInfo } from "@/common/apis/api";
import { CoinDetailInfoType } from "@/common/types/data.type";
import { priceFormatter } from "@/common/utils/priceFormatter";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { calculateChangePercentage } from "@/common/utils/calculateChangePercentage";
import { formatKoreanNumber } from "@/common/utils/formatKoreanNumber";
import DetailProfileChange from "./DetailProfileChange";
import { IoChevronBack } from "react-icons/io5";
import { timeDataType } from "../Detail.data";

function DetailProfileSection() {
  const { coinSymbol } = useParams();
  const { data } = useCoinInfo(String(coinSymbol));
  const [coinInfo, setCoinInfo] = useState<CoinDetailInfoType>();
  const [timeData, setTimeData] = useState<timeDataType>();

  const getOHLCVDData = async () => {
    const data = await fetchOHLCVData("monthDay", String(coinSymbol));
    const week = calculateChangePercentage(data[24].close, data[30].close);
    const month = calculateChangePercentage(data[0].close, data[30].close);
    setTimeData({ week, month });
  };

  useEffect(() => {
    if (!data || data.Response === "Error") return;

    const { Id, FullName, Internal, ImageUrl, TotalCoinsMined } =
      data.Data.CoinInfo;
    const { PRICE, OPENHOUR, OPEN24HOUR } = data.Data.Exchanges[0];
    const { MKTCAP } = data.Data.AggregatedData;

    const formattedPrice = PRICE ? priceFormatter(PRICE) : "정보없음";
    const formattedMKTCAP = MKTCAP ? formatKoreanNumber(MKTCAP) : "정보없음";
    const formattedSupply = TotalCoinsMined
      ? formatKoreanNumber(TotalCoinsMined)
      : "정보없음";
    const openHourChange = calculateChangePercentage(OPENHOUR, PRICE);
    const open24HourChange = calculateChangePercentage(OPEN24HOUR, PRICE);

    const coinInfo = { Id, FullName, Internal, ImageUrl };
    const coinDetail = {
      PRICE: formattedPrice,
      SUPPLY: formattedSupply,
      MKTCAP: formattedMKTCAP,
      OPENHOUR: openHourChange,
      OPEN24HOUR: open24HourChange,
    };

    getOHLCVDData();
    setCoinInfo({ coinInfo, coinDetail });
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
      {coinInfo && timeData ? (
        <DetailProfileChange coinInfo={coinInfo} timeData={timeData} />
      ) : (
        <div>정보 없음</div>
      )}
    </section>
  );
}

export default DetailProfileSection;
