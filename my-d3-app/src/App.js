import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, line, curveCardinal } from "d3";

function App() {
  const svgRef = useRef();
  const [data, setData] = useState([12, 23, 37, 56, 33, 110, 44]);

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    const myLine = line()
      .x((val, i) => i * 50)
      .y((val) => 150 - val)
      .curve(curveCardinal);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (val) => myLine(val))
      .attr("fill", "none")
      .attr("stroke", "red");
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((val) => val + 5))}>Add</button>
      <button onClick={() => setData(data.filter((val) => val < 35))}>
        Filter
      </button>
    </>
  );
}
export default App;
