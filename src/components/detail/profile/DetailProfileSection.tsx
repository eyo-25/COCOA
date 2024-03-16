import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import { CoinDetailInfoType } from "@/common/types/data.type";
import DetailProfileChange from "./DetailProfileChange";
import DetailProfileSkeleton from "./DetailProfileSkeleton";
import { fetchDetailProfileData } from "@/common/apis/fetchDetailProfileData";
import Error from "@/components/ui/Error";
import Button from "@/components/ui/Button";

function DetailProfileSection() {
  const { coinSymbol } = useParams();
  const [profileData, setProfileData] = useState<CoinDetailInfoType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

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

  return (
    <section className="relative flex-col w-full min-h-[255px] py-10 bg-gray-700 rounded-md flex-center">
      <Button
        onClick={() => navigate("/")}
        className="absolute z-10 left-5 top-5 w-9 h-9 pr-[2px] bg-gray-800 rounded-md flex-center"
      >
        <IoChevronBack className="w-6 h-6 mx-auto" />
      </Button>
      <p className="absolute text-sm right-6 top-5">CCCAGG 기준</p>
      {isError && <Error style="pt-[20px]" />}
      {isLoading && <DetailProfileSkeleton />}
      {!isLoading && profileData && (
        <DetailProfileChange profileData={profileData} />
      )}
    </section>
  );
}

export default DetailProfileSection;
