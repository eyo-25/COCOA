import { XIcon } from "@/common/assets";

type Props = {
  text?: string;
};

function Error({ text = "에러가 발생했습니다. 다시 시도해 주세요." }: Props) {
  return (
    <div className="absolute top-0 left-0 flex-col w-full h-full pt-[80px] flex-center">
      <XIcon className="mb-2 w-14 h-14" />
      <p>{text}</p>
    </div>
  );
}

export default Error;
