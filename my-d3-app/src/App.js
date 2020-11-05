import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";

function App() {
  const svgRef = useRef();
  const [data, setData] = useState([12, 23, 37, 90, 33, 110, 44]);

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      //   .domain([0,1,2,3,4,5,6])
      .domain(data.map((val, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
    .domain([0, 150])
    .range([150, 0]);

    const colorScale = scaleLinear()
    .domain([75, 100, 150])
    .range(["green", "orange", "red"]);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg.select(".x-axis")
    .style("transform", "translateY(150px)")
    .call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis")
    .style("transform", "translateX(300px)")
    .call(yAxis);

    svg.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .style("transform", 'scale(1, -1)')
    .attr('x', (val, i) => xScale(i))
    .attr('y', -150)
    .attr('width', xScale.bandwidth())
    .transition()
    .attr('fill', colorScale)
    .attr('height', val => 150 - yScale(val))

  }, [data]);

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
    </>
  );
}
export default App;
