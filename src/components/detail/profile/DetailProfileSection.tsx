import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import { CoinDetailInfoType } from "@/common/types/data.type";
import DetailProfileChange from "./DetailProfileChange";
import DetailProfileSkeleton from "./DetailProfileSkeleton";
import { fetchDetailProfileData } from "@/common/apis/fetchDetailProfileData";
import Error from "@/components/ui/Error";
import Button from "@/components/ui/Button";
import { useResponsive } from "@/common/hooks/useResonsive";
import DetailProfileChangeSm from "./DetailProfileChangeSm";
import DetailProfileSkeletonSm from "./DetailProfileSkeletonSm";
import { XIcon } from "@/common/assets";

function DetailProfileSection() {
  const { coinSymbol } = useParams();
  const [profileData, setProfileData] = useState<CoinDetailInfoType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { screenSize } = useResponsive();

  const fetchDetailProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetchDetailProfileData(String(coinSymbol));
      if (!res) return;
      setProfileData(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailProfile();
  }, []);

  const isSmallerThanBase = screenSize === "xs" || screenSize === "sm";

  return (
    <>
      {!isSmallerThanBase ? (
        <section className="relative flex-col w-full h-[250px] bg-gray-700 rounded-md flex-center">
          <Button
            onClick={() => navigate("/")}
            className="absolute z-10 left-5 top-5 w-9 h-9 tablet:w-8 tablet:h-8 mini:w-7 mini:h-7 mini:bg-inherit pr-[2px] bg-gray-800 rounded-md flex-center"
          >
            <IoChevronBack className="w-6 h-6 mx-auto" />
          </Button>
          <p className="absolute text-sm mini:text-xs right-6 top-5">
            CCCAGG 기준
          </p>
          {isError && (
            <Error
              style="pt-[20px]"
              text="요청하신 코인의 데이터가 존재하지 않습니다."
            />
          )}
          {isLoading && <DetailProfileSkeleton />}
          {!isLoading && profileData && (
            <DetailProfileChange profileData={profileData} />
          )}
        </section>
      ) : (
        <>
          {isError && (
            <div className="relative flex flex-col py-10 flex-center">
              <Button
                onClick={() => navigate("/")}
                className="absolute z-10 right-0 top-0 w-9 h-9 tablet:w-8 tablet:h-8 mini:w-7 mini:h-7 mini:bg-inherit pr-[2px] rounded-md flex-center border-2 border-gray-500"
              >
                <IoChevronBack className="w-6 h-6 mx-auto" />
              </Button>
              <XIcon className="mb-2 w-14 h-14" />
              <p>에러가 발생했습니다. 다시 시도해 주세요.</p>
            </div>
          )}
          {isLoading && <DetailProfileSkeletonSm />}
          {!isLoading && profileData && (
            <DetailProfileChangeSm profileData={profileData} />
          )}
        </>
      )}
    </>
  );
}

export default DetailProfileSection;
