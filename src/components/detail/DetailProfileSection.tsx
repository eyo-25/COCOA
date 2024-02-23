import { useCoinInfo } from "@/common/apis/api";
import { CoinDetailInfoType } from "@/common/types/data.type";
import { priceFormatter } from "@/common/utils/priceFormatter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinTitle from "../ui/CoinTitle";
import { calculateChangePercentage } from "@/common/utils/calculateChangePercentage";
import { formatKoreanNumber } from "@/common/utils/formatKoreanNumber";

function DetailProfileSection() {
  const { coinSymbol } = useParams();
  const { data } = useCoinInfo(String(coinSymbol));
  const [coinInfo, setCoinInfo] = useState<CoinDetailInfoType>();

  useEffect(() => {
    if (!data) return;

    const { Id, FullName, Internal, ImageUrl } = data.Data.CoinInfo;
    const { PRICE, SUPPLY, MKTCAP, OPENHOUR, OPEN24HOUR, OPENDAY } =
      data.Data.AggregatedData;

    const formattedPrice = PRICE ? priceFormatter(PRICE) : "정보없음";
    // const formattedMKTCAP = formatKoreanNumber(MKTCAP);
    // const formattedSupply = formatKoreanNumber(SUPPLY);
    const openHourChange = calculateChangePercentage(OPENHOUR, PRICE);
    const open24HourChange = calculateChangePercentage(OPEN24HOUR, PRICE);
    const openDayChange = calculateChangePercentage(OPENDAY, PRICE);

    console.log(data.Data);
    const coinInfo = { Id, FullName, Internal, ImageUrl };
    const coinDetail = {
      PRICE: formattedPrice,
      SUPPLY: MKTCAP || "정보없음",
      MKTCAP: SUPPLY || "정보없음",
      OPENHOUR: openHourChange,
      OPEN24HOUR: open24HourChange,
      OPENDAY: openDayChange,
    };

    setCoinInfo({ coinInfo, coinDetail });
  }, [data]);

  return (
    <section className="flex-col w-full bg-gray-700 flex-center rounded-md h-[180px]">
      {coinInfo && (
        <>
          <div className="mb-[25px]">
            <CoinTitle displayCoin={coinInfo.coinInfo} />
          </div>
          <ul className="flex ">
            <li className="relative flex flex-col items-center w-[200px]">
              <h4 className="text-gray-200">가격</h4>
              <p className="text-gray-100">{coinInfo.coinDetail.PRICE}</p>
              <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500"></div>
            </li>
            <li className="relative flex flex-col items-center w-[200px]">
              <h4 className="text-gray-200">시가총액</h4>
              <p className="text-gray-100">{coinInfo.coinDetail.MKTCAP}</p>
              <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500"></div>
            </li>
            <li className="relative flex flex-col items-center w-[200px]">
              <h4 className="text-gray-200">총 공급량</h4>
              <p className="text-gray-100">{coinInfo.coinDetail.SUPPLY}</p>
              <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500 border-r"></div>
            </li>
          </ul>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </>
      )}
    </section>
  );
}

export default DetailProfileSection;
