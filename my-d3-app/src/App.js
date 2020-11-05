import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";

function App() {
  const svgRef = useRef();
  const [data, setData] = useState([12, 23, 37, 90, 33, 110, 44]);

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
        .domain(data.map((value, index) => index))
    //   .domain(data.map((val, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);

    const colorScale = scaleLinear()
        .domain([75, 100, 150])
        .range(["green", "orange", "red"])
        .clamp(true);

    const xAxis = axisBottom(xScale)
        .ticks(data.length);

    svg
        .select(".x-axis")
        .style("transform", "translateY(150px)")
        .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
        .select(".y-axis")
        .style("transform", "translateX(300px)")
        .call(yAxis);

    svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .style("transform", 'scale(1, -1)')
        .attr('x', (value, index) => xScale(index))
        .attr('y', -150)
        .attr('width', xScale.bandwidth())
        .on("mouseenter", (event, val) => {
            svg
                .selectAll(".tooltip")
                .data([val])
                .join(enter => enter.append('text').attr('y', yScale(val) - 4))
                .attr('class', 'tooltip')
                .text(val)
                .attr('x', xScale(data.indexOf(val)) + xScale.bandwidth() / 2)
                .attr('text-anchor', 'middle')
                .transition()
                .attr('y', yScale(val) - 8)

                .attr("opacity", 1);
        })
        .on("mouseleave", () => svg.select(".tooltip").remove())
        .transition()
        .attr('fill', colorScale)
        .attr('height', val => 150 - yScale(val))

  }, [data]);
  console.log(data)
  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => setData(data.map((val) => val + 5))}>Add</button>
      <button onClick={() => setData(data.filter((val) => val < 35))}>
        Filter
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>      
    </>
  );
}
export default App;
