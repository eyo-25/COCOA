import { useEffect, useRef } from "react";
import { NewsListType } from "@/common/types/data.type";
import { Link } from "react-router-dom";
import { ArrowUpRight, Placeholder } from "@/common/assets";

type Props = {
  newsList: NewsListType[];
};

function NewsCardList({ newsList }: Props) {
  const imageListRef = useRef<Array<HTMLImageElement | null>>(
    Array.from({ length: newsList.length }, () => null)
  );

  useEffect(() => {
    if (!imageListRef.current) return;

    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imageElement = entry.target as HTMLImageElement;
          const dataSrcUrl = imageElement.getAttribute("data-src");
          if (dataSrcUrl) {
            imageElement.src = dataSrcUrl;
            observer.unobserve(imageElement);
          }
        }
      });
    };

    const imageObserver = new IntersectionObserver(callback, {
      rootMargin: "0px 0px 300px 0px",
    });

    imageListRef.current.forEach((img) => {
      if (img) {
        imageObserver.observe(img);
      }
    });

    return () => imageObserver.disconnect();
  }, [newsList]);

  return (
    <div className="grid grid-cols-3 gap-8 mb-8">
      {newsList.map((data, index) => (
        <div key={data.id} className="flex flex-col w-[300px] mb-2">
          <Link
            to={data.url}
            target="_blank"
            className="relative h-[200px] rounded-md mb-4 overflow-hidden"
          >
            <div className="absolute opacity-80 z-10 px-2 pt-1 rounded-sm pb-[5px] font-[500] bg-gray-800 bottom-3 left-3">
              <p className="text-xs text-gray-200">{data.source}</p>
            </div>
            <div className="absolute w-8 h-8 bg-gray-800 rounded-md opacity-80 right-2 top-2 flex-center">
              <ArrowUpRight className="w-4 h-4 mx-auto" />
            </div>
            <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-green/25 from-10% to-green/0 to-100% rounded-b-md"></div>
            <img
              ref={(el) => (imageListRef.current[index] = el)}
              data-src={data.imageurl}
              src={Placeholder}
              onError={(e) => (e.currentTarget.src = Placeholder)}
              alt={data.source + " News"}
              className="object-cover w-full h-full bg-gray-700"
            />
          </Link>
          <div className="flex flex-col overflow-hidden">
            <h4 className="z-10 mb-2 text-lg font-bold leading-6 text-gray-100 ellipsis">
              {data.title}
            </h4>
            <p className="text-sm ellipsis mb-[10px]">{data.body}</p>
            <div className="flex flex-wrap overflow-hidden max-h-12 text-green">
              {data.tags.map((tag, i) => (
                <span key={i} className="mr-3">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsCardList;
