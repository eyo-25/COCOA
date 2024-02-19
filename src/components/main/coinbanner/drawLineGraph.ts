import { TimeType } from "@/common/types/data.type";
import {
  select,
  line,
  scaleTime,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  pointer,
  interpolate,
  BaseType,
} from "d3";
import dayjs from "dayjs";
import { graphDataList } from "../coinchart/CoinChart.data";

interface ChartData {
  time: number;
  close: number;
}

function formatTime(value: number, format: string): string {
  return dayjs(value).format(format);
}

export function drawLineGraph(
  timeType: TimeType,
  container: SVGSVGElement,
  svgWidth: number,
  svgHeight: number,
  data: ChartData[]
) {
  const margin = { top: 5, right: 25, left: 45, bottom: 50 };
  const barWidth = graphDataList[timeType].barWidth;

  // 마진을 제외하고 그래프에서 사용할 넓이
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  const barHeight = margin.bottom - 20;
  const dateFormat = graphDataList[timeType].dateFormat;

  const svg = select(container);

  // margin만큼 group이동
  const lineGraphGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const barGraphGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${height})`);

  const timeDataExtent = extent(data, (d) => new Date(d.time * 1000));
  const closeDataExtent = extent(data, (d) => d.close);

  // closeDataExtent, timeDataExtent 유효성 검사
  if (
    (timeDataExtent[0] === undefined && timeDataExtent[1] === undefined) ||
    (closeDataExtent[0] === undefined && closeDataExtent[1] === undefined)
  )
    return;

  const xScale = scaleTime().domain(timeDataExtent).range([0, width]);
  const [min, max] = closeDataExtent;
  const rangePaddingPercentage = 0.2; // 시작값과 끝값 각각에 대한 패딩 비율

  const yScale = scaleLinear()
    .domain([
      min - (max - min) * rangePaddingPercentage,
      max + (max - min) * rangePaddingPercentage,
    ])
    .range([height, 0]);

  const yScale2 = scaleLinear()
    .domain([
      min - (max - min) * rangePaddingPercentage,
      max + (max - min) * rangePaddingPercentage,
    ])
    .range([barHeight, 0]);

  const lineGenerator = line<ChartData>()
    .x((d) => xScale(new Date(d.time * 1000)))
    .y((d) => yScale(d.close));

  // Line Chart
  lineGraphGroup
    .selectAll(".line")
    .data([data])
    .join("path")
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#E8E8E8")
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .transition()
    .duration(1300) // 애니메이션 지속 시간
    .attrTween(
      "stroke-dasharray",
      function (this: BaseType | SVGPathElement | null) {
        if (!this || !(this instanceof SVGPathElement)) {
          return () => "";
        }

        const length = this.getTotalLength();

        return function (t: number) {
          return interpolate(`0,${length}`, `${length},${length}`)(t);
        };
      }
    );

  const axisY = axisLeft<number>(yScale).ticks(6);

  // axis y
  lineGraphGroup
    .append("g")
    .call(axisY)
    .selectAll("text")
    .style("fill", "#E8E8E8")
    .text((d) => `$ ${d}`);

  // y축선
  lineGraphGroup
    .selectAll(".y-grid-line")
    .data(yScale.ticks(6))
    .enter()
    .append("line")
    .attr("class", "y-grid-line")
    .attr("x1", 0)
    .attr("y1", (d) => yScale(d))
    .attr("x2", width)
    .attr("y2", (d) => yScale(d))
    .attr("stroke", "#E8E8E8")
    .attr("opacity", "0.2")
    .attr("stroke-width", 0.4);

  // 툴팁
  const mouseTrackerContainer = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  mouseTrackerContainer
    .append("rect")
    .attr("width", width)
    .attr("height", svgHeight - 20)
    .attr("fill", "none")
    .attr("pointer-events", "all");

  mouseTrackerContainer
    .on("mouseover", () => {
      mouseTracker.style("display", "block");
    })
    .on("mouseleave", () => {
      mouseTracker.style("display", "none");
    })
    .on("mousemove", (event: MouseEvent) => {
      const [x] = pointer(event);

      // x 좌표에 해당하는 데이터 찾기
      const invertedX = xScale.invert(x);
      const closestDataPoint = findClosestDataPoint(invertedX, data);

      // 툴팁 텍스트에 데이터 표시
      if (closestDataPoint) {
        const xPosition = xScale(new Date(closestDataPoint.time * 1000));

        const tooltipX = xPosition > width / 2 - 50 ? -160 : 0;

        mouseTracker.attr("transform", `translate(${xPosition},0)`);

        a.text(
          `${formatTime(
            new Date(closestDataPoint.time * 1000).getTime(),
            "YYYY-MM-DD, HH:MM"
          )}`
        );
        a2.text(`USDT: ${closestDataPoint.close}`);
        tooltipCircle.attr(
          "transform",
          `translate(0,${yScale(closestDataPoint.close)})`
        );
        tooltipCircle2.attr(
          "transform",
          `translate(0,${yScale(closestDataPoint.close)})`
        );
        tooltipGroup.attr(
          "transform",
          `translate(${tooltipX},${yScale(closestDataPoint.close) - 20})`
        );

        if (xPosition > width / 2 - 50) {
          tooltipLeftTail.style("display", "none");
          tooltipRightTail.style("display", "block");
        } else {
          tooltipLeftTail.style("display", "block");
          tooltipRightTail.style("display", "none");
        }
      }
    });

  const mouseTracker = mouseTrackerContainer
    .append("g")
    .attr("display", "none");

  // Vertical line
  mouseTracker
    .append("line")
    .attr("class", "vertical-line")
    .attr("stroke", "#00FFA3")
    .attr("opacity", "0.5")
    .attr("y1", 0)
    .attr("y2", height + margin.bottom - 20 - margin.top);

  // Circle marker
  const tooltipCircle = mouseTracker
    .append("circle")
    .attr("class", "circle-marker")
    .attr("r", 7)
    .attr("fill", "#00FFA3")
    .attr("opacity", "0.6")
    .style("filter", "url(#tooltipBlur)");

  const tooltipCircle2 = mouseTracker
    .append("circle")
    .attr("class", "circle-marker")
    .attr("r", 3)
    .attr("fill", "#00FFA3");

  // Blur 효과를 정의하는 필터 요소 추가
  const defs = svg.append("defs");

  const filter = defs
    .append("filter")
    .attr("id", "tooltipBlur")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

  filter
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", 5); // Blur 정도 조절

  const tooltipGroup = mouseTracker.append("g");

  // 툴팁의 주 본문 (사각형)
  tooltipGroup
    .append("rect")
    .attr("class", "blurs")
    .attr("width", 120)
    .attr("height", 60)
    .attr("fill", "#E8E8E8")
    .style("padding", "20px")
    .attr("transform", "translate(20, -5)")
    .attr("rx", 2.5)
    .attr("ry", 2.5)
    .attr("opacity", 0.9);

  // 툴팁의 꼬리 (삼각형)
  const tooltipLeftTail = tooltipGroup
    .append("polygon")
    .attr("points", "20.5,6 11,21 20.5,21")
    .attr("fill", "#E8E8E8")
    .attr("opacity", 0.9);

  //
  const tooltipRightTail = tooltipGroup
    .append("polygon")
    .attr("points", "139.5,6 149,21 139.5,21")
    .attr("fill", "#E8E8E8")
    .attr("display", "none")
    .attr("opacity", 0.9);

  const tooltipText = tooltipGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("transform", "translate(80, 5)")
    .style("font-weight", "500");

  const a = tooltipText
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "1.2em")
    .attr("font-size", "10px")
    .attr("fill", "#626262");
  const a2 = tooltipText
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "1.4em")
    .attr("font-size", "12px")
    .attr("font-weight", 700)
    .attr("fill", "#111111");

  // Bar Chart
  barGraphGroup
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(new Date(d.time * 1000)) - barWidth / 2)
    .attr("y", barHeight)
    .attr("width", barWidth)
    .attr("height", 0)
    .attr("fill", "#E8E8E8")
    .transition() // 애니메이션 적용
    .duration(1300) // 애니메이션 지속 시간
    .attr("y", (d) => yScale2(d.close))
    .attr("height", (d) => barHeight - yScale2(d.close));

  const axisX = axisBottom<Date>(xScale)
    .ticks(7)
    .tickFormat((d) => formatTime(d.getTime(), dateFormat));

  // line, tick remove
  lineGraphGroup.selectAll(".domain, .tick line").remove();

  // axis x
  barGraphGroup
    .append("g")
    .call(axisX)
    .attr("transform", `translate(0, ${barHeight})`)
    .selectAll("text")
    .style("fill", "#E8E8E8");

  barGraphGroup.selectAll(".domain").remove();

  // 다른 그래픽 요소들을 그린 이후에 툴팁을 그립니다.
  mouseTrackerContainer.raise();
}

export default drawLineGraph;

// x 좌표에 가장 가까운 데이터 포인트 찾기
function findClosestDataPoint(
  x: Date,
  data: ChartData[]
): ChartData | undefined {
  let closestDataPoint: ChartData | undefined;
  let closestDistance = Number.MAX_VALUE;

  for (const dataPoint of data) {
    const distance = Math.abs(
      x.getTime() - new Date(dataPoint.time * 1000).getTime()
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestDataPoint = dataPoint;
    }
  }

  return closestDataPoint;
}
