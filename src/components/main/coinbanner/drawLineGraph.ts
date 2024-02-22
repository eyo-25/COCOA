import { OHLCVType, TimeType } from "@/common/types/data.type";
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
import { graphDataList } from "../coinchart/CoinChart.data";
import { formatTime } from "@/common/utils/formatTime";
import { findClosestDataPoint } from "@/common/utils/findClosestDataPoint";

export function drawLineGraph(
  timeType: TimeType,
  container: SVGSVGElement | null,
  svgWidth: number,
  svgHeight: number,
  data: OHLCVType[]
) {
  if (!container) return;
  const svg = select(container);
  // svg.selectAll("*").remove();

  const margin = { top: 5, right: 25, left: 45, bottom: 50 };
  const axisXHeight = 20;
  const barWidth = graphDataList[timeType].barWidth;
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  const barHeight = margin.bottom - axisXHeight;
  const dateFormat = graphDataList[timeType].dateFormat;

  const lineGraphGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const [timeMin, timeMax] = extent(data, (d) => new Date(d.time * 1000));
  const [closeMin, closeMax] = extent(data, (d) => d.close);

  if (
    (timeMin === undefined && timeMax === undefined) ||
    (closeMin === undefined && closeMax === undefined)
  ) {
    return;
  }

  const xScale = scaleTime().domain([timeMin, timeMax]).range([0, width]);
  const yScalePadding = (closeMax - closeMin) * 0.2;
  const yScale = scaleLinear()
    .domain([closeMin - yScalePadding, closeMax + yScalePadding])
    .range([height, 0]);

  const lineGenerator = line<OHLCVType>()
    .x((d) => xScale(new Date(d.time * 1000)))
    .y((d) => yScale(d.close));
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
    .duration(1300)
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

  const axisY = axisLeft<number>(yScale)
    .ticks(4)
    .tickFormat((d) => {
      const formattedValue = d % 1 === 0 ? d : d.toFixed(3);
      return `$ ${formattedValue}`;
    });
  lineGraphGroup
    .append("g")
    .call(axisY)
    .selectAll("text")
    .style("fill", "#E8E8E8");

  lineGraphGroup
    .selectAll(".y-grid-line")
    .data(yScale.ticks(4))
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

  lineGraphGroup.selectAll(".domain, .tick line").remove();

  const barGraphGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${height})`);

  const barYScale = scaleLinear()
    .domain([closeMin - yScalePadding, closeMax + yScalePadding])
    .range([barHeight, 0]);

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
    .transition()
    .duration(1300)
    .attr("y", (d) => barYScale(d.close))
    .attr("height", (d) => barHeight - barYScale(d.close));

  const axisX = axisBottom<Date>(xScale)
    .ticks(7)
    .tickFormat((d) => formatTime(d.getTime(), dateFormat));
  barGraphGroup
    .append("g")
    .call(axisX)
    .attr("transform", `translate(0, ${barHeight})`)
    .selectAll("text")
    .style("fill", "#E8E8E8");

  barGraphGroup.selectAll(".domain").remove();

  const mouseTrackerGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  mouseTrackerGroup
    .append("rect")
    .attr("width", width)
    .attr("height", svgHeight - axisXHeight)
    .attr("fill", "none")
    .attr("pointer-events", "all");

  const tooltipContainer = mouseTrackerGroup
    .append("g")
    .attr("display", "none");

  tooltipContainer
    .append("line")
    .attr("class", "vertical-line")
    .attr("stroke", "#00FFA3")
    .attr("opacity", "0.5")
    .attr("y1", 0)
    .attr("y2", height + margin.bottom - axisXHeight - margin.top);

  const tooltipCircle = tooltipContainer
    .append("circle")
    .attr("class", "circle-marker")
    .attr("r", 7)
    .attr("fill", "#00FFA3")
    .attr("opacity", "0.6")
    .style("filter", "url(#tooltipBlur)");
  const tooltipHighLight = tooltipContainer
    .append("circle")
    .attr("class", "circle-marker")
    .attr("r", 3)
    .attr("fill", "#00FFA3");
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
    .attr("stdDeviation", 5);

  const tooltipGroup = tooltipContainer.append("g");

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

  const tooltipLeftTail = tooltipGroup
    .append("polygon")
    .attr("points", "20.5,6 11,21 20.5,21")
    .attr("fill", "#E8E8E8")
    .attr("opacity", 0.9);
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
  const tooltipTopText = tooltipText
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "1.2em")
    .attr("font-size", "10px")
    .attr("fill", "#626262");
  const tooltipBottomText = tooltipText
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "1.4em")
    .attr("font-size", "12px")
    .attr("font-weight", 700)
    .attr("fill", "#111111");

  mouseTrackerGroup.raise();

  mouseTrackerGroup
    .on("mouseleave", () => {
      tooltipContainer.style("display", "none");
    })
    .on("mousemove", (event: MouseEvent) => {
      tooltipContainer.style("display", "block");
      const [x] = pointer(event);
      const invertedX = xScale.invert(x);
      const { close, time } = findClosestDataPoint(invertedX, data);
      const xPosition = xScale(new Date(time * 1000));
      const isLeftPosition = xPosition > width / 2;

      tooltipContainer.attr("transform", `translate(${xPosition},0)`);
      tooltipCircle.attr("transform", `translate(0,${yScale(close)})`);
      tooltipHighLight.attr("transform", `translate(0,${yScale(close)})`);

      tooltipTopText.text(
        `${formatTime(new Date(time * 1000).getTime(), "YYYY-MM-DD, HH:MM")}`
      );
      tooltipBottomText.text(`USDT: ${close}`);

      tooltipGroup.attr(
        "transform",
        `translate(${isLeftPosition ? -160 : 0},${yScale(close) - axisXHeight})`
      );
      if (isLeftPosition) {
        tooltipLeftTail.style("display", "none");
        tooltipRightTail.style("display", "block");
      } else {
        tooltipLeftTail.style("display", "block");
        tooltipRightTail.style("display", "none");
      }
    });
}

export default drawLineGraph;
