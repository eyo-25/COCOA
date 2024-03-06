import { LoadingSpinner } from "@/common/gif";

function Loading() {
  return (
    <div className="absolute top-0 left-0 flex-col w-full h-full pt-[80px] flex-center">
      <img className="w-10 h-10" alt="로딩 스피너" src={LoadingSpinner} />
      <p className="mt-2 text-gray-100">Loading...</p>
    </div>
  );
}

export default Loading;
