function NewsCardListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8 mb-8 opacity-60">
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className="flex flex-col w-[300px] mb-2">
          <div className="relative h-[200px] rounded-md mb-4 overflow-hidden bg-gray-700"></div>
          <div className="flex flex-col overflow-hidden">
            <div className="h-8 mb-3 bg-gray-700"></div>
            <div className="h-5 mb-2 bg-gray-700"></div>
            <div className="h-5 mb-3 bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsCardListSkeleton;
