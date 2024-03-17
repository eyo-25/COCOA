import { CoinDetailInfoType } from "@/common/types/data.type";
import CoinTitle from "../../ui/CoinTitle";
import { detailChartInfoList, detailChartMenuList } from "../Detail.data";
import { formatPercentageElement } from "@/common/utils/formatPercentageElement";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

type Props = {
  profileData: CoinDetailInfoType;
};

function DetailProfileChangeSm({ profileData }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between w-full mt-1 mb-[20px] mobile:mb-[15px] items-center">
        <div>
          <CoinTitle displayCoin={profileData.coinInfo} />
        </div>
        <Button
          onClick={() => navigate("/")}
          className="w-9 h-9 tablet:w-8 tablet:h-8 mini:w-7 mini:h-7 mini:bg-inherit pr-[2px] rounded-md flex-center border-2 border-gray-500"
        >
          <IoChevronBack className="w-6 h-6 mx-auto" />
        </Button>
      </div>
      <ul className="flex flex-col border-y py-[20px] mobile:py-[16px] border-gray-400">
        {detailChartMenuList.map(({ title, info }) => (
          <li key={title} className="flex mb-3 last:mb-0">
            <h4 className="w-[80px] mr-5 text-gray-300">{title} :</h4>
            <p className="text-gray-100">{profileData.coinDetail[info]}</p>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col py-[20px] mb-[6px] mobile:py-[16px] border-b border-gray-400">
        {detailChartInfoList.map(({ title, info }) => (
          <li key={title} className="flex mb-3 last:mb-0">
            <p className="w-[80px] mr-5">{title}:</p>
            {formatPercentageElement(profileData.coinDetail[info])}
          </li>
        ))}
      </ul>
    </>
  );
}
export default DetailProfileChangeSm;
