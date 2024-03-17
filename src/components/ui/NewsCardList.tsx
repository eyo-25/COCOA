import { useEffect, useRef } from "react";
import { NewsListType } from "@/common/types/data.type";
import { Link } from "react-router-dom";
import { ArrowUpRight, Placeholder } from "@/common/assets";
import { useResponsive } from "@/common/hooks/useResonsive";
import { newsGridOffset } from "../main/coinchart/CoinChart.data";

type Props = {
  newsList: NewsListType[];
};

function NewsCardList({ newsList }: Props) {
  const { screenSize } = useResponsive();
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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];

    const l = pos[0];
    const t = pos[1];
    const h = e.currentTarget.clientHeight;
    const w = e.currentTarget.clientWidth;

    const ty = ((t - h / 2) / (h / 2)) * -17;
    const tx = ((l - w / 2) / (w / 2)) * 17;
    const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg);`;

    e.currentTarget.style.transition = "transform 0.4s ease";
    e.currentTarget.setAttribute("style", tf);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    e.currentTarget.style.transition = "transform 1.5s ease";
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";

    e.stopPropagation();
  };

  return (
    <div
      className={`grid gap-y-6 gap-x-6 tablet:gap-x-4 mini:gap-x-3 mobile:gap-x-1 mb-8`}
      style={{
        gridTemplateColumns: `repeat(${newsGridOffset[screenSize]}, 1fr)`,
      }}
    >
      {newsList.map((data, index) => (
        <div key={data.id} className="flex flex-col w-full h-full mb-2 z-100">
          <Link
            to={data.url}
            target="_blank"
            className="relative h-[200px] rounded-md mb-4 overflow-hidden"
            onMouseLeave={(e) => handleMouseLeave(e)}
            onMouseMove={(e) => handleMouseMove(e)}
          >
            <div className="absolute w-8 h-8 bg-gray-800 rounded-md opacity-80 right-2 top-2 flex-center">
              <ArrowUpRight className="w-4 h-4 mx-auto" />
            </div>
            <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-green/20 from-0% to-green/0 to-30% rounded-b-md"></div>
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
            <h4 className="mb-2 text-lg font-bold leading-6 text-gray-100 ellipsis">
              {data.title}
            </h4>
            <p className="text-sm ellipsis mb-[10px]">{data.body}</p>
            <div className="flex flex-wrap overflow-hidden max-h-12 mobile:max-h-10 text-green">
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
