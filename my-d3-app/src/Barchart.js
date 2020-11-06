import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, scaleLinear, axisRight, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";


function BarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current);
    console.log(data, 'data')
    console.log(dimensions)

    if (!dimensions) return;

    //scale
    const xScale = scaleBand()
        .domain(data.map((value, index) => index))
    //   .domain(data.map((val, index) => index))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, max(data)+10]) //todo
        .range([dimensions.height, 0]); // change

    const colorScale = scaleLinear()
        .domain([75, 100, max(data)])
        .range(["red", "orange", "green"])
        .clamp(true);

    //create x-axis
    const xAxis = axisBottom(xScale)
        .ticks(data.length).tickFormat((d, i) => i+3);

    svg
        .select(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

    //create y-axis
    const yAxis = axisRight(yScale);
    svg
        .select(".y-axis")
        .style("transform", `translateX(${dimensions.width}px)`)
        .call(yAxis);

    svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .style("transform", 'scale(1, -1)')
        .attr('x', (value, index) => xScale(index))
        .attr('y', -dimensions.height)
        .attr('width', xScale.bandwidth())
        // .on("mouseenter", function (event, val) {
        //     const index = svg.selectAll(".bar").nodes().indexOf(this);
        //     svg
        //         .selectAll(".tooltip")
        //         .data([val])
        //         .join(enter => enter.append('text').attr('y', yScale(val) - 4))
        //         .attr('class', 'tooltip')
        //         .text(val)
        //         .attr('x', xScale(index) + xScale.bandwidth() / 2)
        //         .attr('text-anchor', 'middle')
        //         .transition()
        //         .attr('y', yScale(val) - 8)
        //         .attr("opacity", 1);
        // })
        // .on("mouseleave", () => svg.select(".tooltip").remove())
        .transition()
        .attr('fill', colorScale)
        .attr('height', val => dimensions.height - yScale(val))

    svg
        .selectAll(".tooltip")
        .data(data)
        .join(enter => enter.append('text').attr('y', d => yScale(d) - 4))
        .attr('class', 'tooltip')
        .text(d => d)
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale(d) - 8)
        .attr("opacity", 1);
    

  }, [data, dimensions]);

  return (
    <div className="svgContainer" ref={wrapperRef} style={{marginBottom: "2rem"}}>
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg> 
    </div>
  );
}

export default BarChart