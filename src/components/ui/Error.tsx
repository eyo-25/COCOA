import { XIcon } from "@/common/assets";

function Error() {
  return (
    <div className="flex-col h-[200px] flex-center">
      <XIcon className="mb-2 w-14 h-14" />
      <p>데이터를 불러올 수 없습니다.</p>
    </div>
  );
}

export default Error;
