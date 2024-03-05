function DetailProfileSkeleton() {
  return (
    <div className="flex-col flex-center opacity-70">
      <div className="mb-[25px]">
        <div className="h-[35px] w-36 bg-gray-600 rounded-md"></div>
      </div>
      <ul className="flex mb-8">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="relative flex flex-col items-center w-[200px]"
          >
            <div className="h-[21px] w-[50%] mb-2 bg-gray-600 rounded-sm"></div>
            <div className="w-[60%] h-[21px] bg-gray-600 rounded-sm"></div>
            <div className="absolute w-full h-[25px] inset-y-0 my-auto border-l border-gray-500 last:border-r"></div>
          </li>
        ))}
      </ul>
      <ul className="flex gap-5">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className="flex justify-between items-center rounded-sm px-5 h-[35px] w-[190px] bg-gray-600"
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default DetailProfileSkeleton;
