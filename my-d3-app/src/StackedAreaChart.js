import React, { useEffect, useRef } from "react";
import {
  select,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  area,
  scalePoint,
  curveCardinal
} from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a StackedBarChart
 */

function StackedAreaChart({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    //stacks / layers
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);
    const extend = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    //scales
    const xScale = scalePoint()
      .domain(data.map((d) => d.year))
      .range([0, width])

    const yScale = scaleLinear().domain(extend).range([height, 0]);

    const areaGenerator = area()
    .x(sequence => xScale(sequence.data.year))
    .y0(sequence => yScale(sequence[0]))
    .y1(sequence => yScale(sequence[1]))
    .curve(curveCardinal)

    //rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("path")
      .attr("class", "layer")
      .attr('fill', layer => {
          return colors[layer.key]
      })
      .attr('d', layer => areaGenerator(layer))

    //axes
    const xAxis = axisBottom(xScale);
    svg
      .selectAll(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.selectAll(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
}

export default StackedAreaChart;
