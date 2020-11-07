import React, { useRef, useEffect } from "react";
import { select, line, max, curveCardinal, axisBottom, axisLeft, scaleLinear, scalePoint } from "d3";
import useResizeObserver from "./useResizeObserver";

function BarChart({ data, data2 }) {
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

    const xScale2 = scaleLinear()
    .domain([0, data2.length-1])
    .range([0, dimensions.width])

    const yScale2 = scaleLinear()
    .domain([0, max(data2)+10])
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
        // .curve(curveCardinal)

    const myLine2 = line()
        .x((val, i) => xScale2(i))
        .y((val) => yScale2(val))
        // .curve(curveCardinal)

    svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr('class', 'line')
        .attr("d", (val) => myLine(val))
        .attr("fill", "none")
        .attr("stroke", "blue")

        svg
        .selectAll(".line2")
        .data([data2])
        .join("path")
        .attr('class', 'line2')
        .attr("d", (val) => myLine2(val))
        .attr("fill", "none")
        .attr("stroke", "green")

    //circle
    svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (val, i) => xScale(i))
        .attr("cy", (val) => yScale(val))
        .attr("r", (d) => 5)
        .attr('fill', 'red');

    svg
        .selectAll("circle")
        .data(data2)
        .join("circle")
        .attr("cx", (val, i) => xScale2(i))
        .attr("cy", (val) => yScale2(val))
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

    svg
        .selectAll(".tooltip2")
        .data(data2)
        .join(enter => enter.append('text').attr('y', (val) => yScale2(val)))
        .attr('class', 'tooltip2')
        .text(d => d)
        .attr('x', (val, i) => xScale2(i))
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale2(d) - 8)
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
