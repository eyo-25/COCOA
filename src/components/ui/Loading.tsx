import { LoadingSpinner } from "@/common/gif";

function Loading() {
  return (
    <div className="flex-center flex-col w-full h-[220px] text-gray-100">
      <img className="w-10 h-10" alt="로딩 스피너" src={LoadingSpinner} />
      <p className="mt-2 mb-6">Loading...</p>
    </div>
  );
}

export default Loading;
