import { ArrowUpRight } from "@/common/assets";
import { NewsListType } from "@/common/types/data.type";
import { Link } from "react-router-dom";

type Props = {
  data: NewsListType;
};

function NewsCard({ data }: Props) {
  return (
    <div className="flex flex-col w-[300px] mb-10">
      <Link
        to={data.url}
        target="_blank"
        className="relative h-[200px] rounded-md mb-4 overflow-hidden"
      >
        <div className="absolute w-8 h-8 bg-gray-800 rounded-md opacity-80 right-2 top-2 flex-center">
          <ArrowUpRight className="w-4 h-4 mx-auto" />
        </div>
        <div className="absolute z-10 bottom-0 left-0 h-10 w-full bg-gradient-to-t from-green/25 from-10% to-green/0 to-100% rounded-b-md"></div>
        <img className="object-cover w-full h-full" src={data.imageurl} />
      </Link>
      <div className="flex flex-col overflow-hidden">
        <h4 className="z-10 mb-2 text-lg font-bold leading-6 text-gray-100 ellipsis">
          {data.title}
        </h4>
        <p className="text-sm ellipsis mb-[10px]">{data.body}</p>
        <div className="flex flex-wrap overflow-hidden max-h-12 text-green">
          {data.tags.map((tag) => (
            <span className="mr-3">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
