import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from "d3";

function App() {
  const svgRef = useRef();
  const [data, setData] = useState([12, 23, 37, 56, 33, 110, 44]);

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
    svg.select(".x-axis")
    .style("transform", "translateY(150px)")
    .call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis')
    .style("transform", "translateX(300px)")
    .call(yAxis);

    const myLine = line()
      .x((val, i) => xScale(i))
      .y((val) => yScale(val))
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (val) => myLine(val))
      .attr("fill", "none")
      .attr("stroke", "red");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map((val) => val + 5))}>Add</button>
      <button onClick={() => setData(data.filter((val) => val < 35))}>
        Filter
      </button>
    </>
  );
}
export default App;
