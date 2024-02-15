import {
  select,
  line,
  scaleTime,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
} from "d3";
import dayjs from "dayjs";

interface ChartData {
  time: number;
  close: number;
}

function formatTime(value: number): string {
  return dayjs(value).format("HH:mm");
}

export function drawLineChart(
  container: SVGSVGElement,
  svgWidth: number,
  svgHeight: number,
  data: ChartData[]
) {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  // 마진을 제외하고 그래프에서 사용할 넓이
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

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

  console.log(closeDataExtent);

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

  // axis y
  group
    .append("g")
    .call(axisLeft(yScale).ticks(4))
    .selectAll("text")
    .style("fill", "#E8E8E8")
    .text((d: number) => `$ ${d}`);

  // line, tick remove
  group.selectAll(".domain, .tick line").remove();
}

export default drawLineChart;
