import {
  select,
  line,
  scaleTime,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  pointer,
} from "d3";
import dayjs from "dayjs";

interface ChartData {
  time: number;
  close: number;
}

function formatTime(value: number): string {
  return dayjs(value).format("HH:mm");
}

export function drawLineGraph(
  container: SVGSVGElement,
  svgWidth: number,
  svgHeight: number,
  data: ChartData[]
) {
  const margin = { top: 20, right: 20, left: 50 };

  // 마진을 제외하고 그래프에서 사용할 넓이
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top;

  const svg = select(container);

  // margin만큼 group이동
  const group = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

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

  const lineGenerator = line<ChartData>()
    .x((d) => xScale(new Date(d.time * 1000)))
    .y((d) => yScale(d.close));

  // Line Chart
  group
    .selectAll(".line")
    .data([data])
    .join("path")
    .attr("class", "line")
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#E8E8E8")
    .attr("stroke-width", 1);

  const axisX = axisBottom<Date>(xScale)
    .ticks(10)
    .tickFormat((d) => formatTime(d.getTime()));

  // axis x
  group
    .append("g")
    .call(axisX)
    .attr("transform", `translate(0, ${height})`)
    .selectAll("text")
    .style("fill", "#E8E8E8");

  const axisY = axisLeft<number>(yScale).ticks(5);

  // axis y
  group
    .append("g")
    .call(axisY)
    .selectAll("text")
    .style("fill", "#E8E8E8")
    .text((d) => `$ ${d}`);

  // line, tick remove
  group.selectAll(".domain, .tick line").remove();

  // y축선
  group
    .selectAll(".y-grid-line")
    .data(yScale.ticks(5))
    .enter()
    .append("line")
    .attr("class", "y-grid-line")
    .attr("x1", 0)
    .attr("y1", (d) => yScale(d))
    .attr("x2", width)
    .attr("y2", (d) => yScale(d))
    .attr("stroke", "#E8E8E8")
    .attr("opacity", "0.3")
    .attr("stroke-width", 0.5);

  // 툴팁
  const mouseTrackerContainer = group.append("g");
  mouseTrackerContainer
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "none")
    .attr("pointer-events", "all"); // 마우스 이벤트 허용

  mouseTrackerContainer
    .on("mouseover", () => {
      mouseTracker.style("display", "block");
    })
    .on("mouseleave", () => {
      mouseTracker.style("display", "none");
    })
    .on("mousemove", (event: MouseEvent) => {
      const [x] = pointer(event);
      mouseTracker.attr("transform", `translate(${x},0)`);

      // x 좌표에 해당하는 데이터 찾기
      const invertedX = xScale.invert(x);
      const closestDataPoint = findClosestDataPoint(invertedX, data);

      // 툴팁 텍스트에 데이터 표시
      if (closestDataPoint) {
        tooltipText.text(`USDT: ${closestDataPoint.close}`);
        tooltipCircle.attr(
          "transform",
          `translate(0,${yScale(closestDataPoint.close)})`
        );
        tooltipGroup.attr(
          "transform",
          `translate(0,${yScale(closestDataPoint.close) - 20})`
        );
      }
    });

  const mouseTracker = mouseTrackerContainer
    .append("g")
    .attr("display", "none");

  // Vertical line
  const verticalLine = mouseTracker
    .append("line")
    .attr("class", "vertical-line")
    .attr("stroke", "#00FFA3")
    .attr("opacity", "0.5")
    .attr("y1", 0)
    .attr("y2", height);

  // Circle marker
  const tooltipCircle = mouseTracker
    .append("circle")
    .attr("class", "circle-marker")
    .attr("r", 3)
    .attr("fill", "#00FFA3");

  const tooltipGroup = mouseTracker.append("g");

  // 툴팁의 주 본문 (사각형)
  const tooltipRect = tooltipGroup
    .append("rect")
    .attr("width", 120)
    .attr("height", 40)
    .attr("fill", "white")
    .attr("opacity", 0.7)
    .style("padding", "20px")
    .attr("transform", "translate(19.8, 0)");

  // 툴팁의 꼬리 (삼각형)
  tooltipGroup
    .append("polygon")
    .attr("points", "10,0 0,7.5 10,15")
    .attr("fill", "white")
    .attr("opacity", 0.7)
    .attr("transform", "translate(10, 12.5)"); // 꼬리 위치 조정

  // 툴팁에 내용 추가
  const tooltipText = tooltipGroup
    .append("text")
    .attr("fill", "black")
    .text(`USDT: 51,787.58`)
    .attr("x", 120 / 2)
    .attr("y", 40 / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("transform", "translate(19.8, 2)")
    .attr("font-size", "12px");

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

  console.log(closestDataPoint);

  return closestDataPoint;
}
