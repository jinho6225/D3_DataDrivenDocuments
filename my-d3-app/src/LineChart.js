import React, { useRef, useEffect } from "react";
import { select, line, max, curveCardinal, axisBottom, axisLeft, scaleLinear, scalePoint } from "d3";
import useResizeObserver from "./useResizeObserver";

function BarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    console.log(dimensions, 'dimenstions')

        //scale
    const xScale = scaleLinear()
        .domain([0, data.length-1])
        .range([0, dimensions.width])

    const yScale = scaleLinear()
        .domain([0, max(data)+10])
        .range([dimensions.height, 0]); 

    //create x-axis
    const xAxis = axisBottom(xScale)
        .ticks(data.length)
        .tickFormat(index => index+1)

    svg
        .select(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

    //create y-axis
    const yAxis = axisLeft(yScale);
    svg
        .selectAll(".y-axis")
        .call(yAxis);

    //myLine
    const myLine = line()
        .x((val, i) => xScale(i))
        .y((val) => yScale(val))
        .curve(curveCardinal)
        
    svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr('class', 'line')
        .attr("d", (val) => myLine(val))
        .attr("fill", "none")
        .attr("stroke", "blue")

    //circle
    svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (val, i) => xScale(i))
        .attr("cy", (val) => yScale(val))
        .attr("r", (d) => 5)
        .attr('fill', 'red');

    //text
    svg
        .selectAll(".tooltip")
        .data(data)
        .join(enter => enter.append('text').attr('y', (val) => yScale(val)))
        .attr('class', 'tooltip')
        .text(d => d)
        .attr('x', (val, i) => xScale(i))
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale(d) - 8)
        .attr("opacity", 1);


  }, [data, dimensions]);

  return (
    <div
    className="svgContainer"
    ref={wrapperRef}
    style={{ marginBottom: "2rem" }}
    >
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    </div>
  );
}

export default BarChart;
