import { arc, pie, select, scaleOrdinal, schemeGreens } from "d3";
import React, { useEffect, useRef, useState } from "react";
import useResizeObserver from "./useResizeObserver";

function PieChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [instructionsArr, setInstructionsArr] = useState([])
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    // arc takes instructions (objects with special properties, like startAngle, endAngle, etc.)
    // and transforms them into "d" attributes for path elements
    const arcGenerator = arc()
    .innerRadius(0)
    .outerRadius(150);
    // pie will transform data to instructions for arcGenerator
    const pieGenerator = pie()
    .padAngle(0)
    .value(d => d.value)
    // .sort(null); // makes sure data doesn't get sorted
    // now transform data to instructions for arc() 
    const instructions = pieGenerator(data)
    setInstructionsArr(instructions)
    const colorScale = scaleOrdinal(schemeGreens[3]);

    console.log(instructions)
    svg
        .selectAll(".slice")
        .data(instructions)
        .join("path")
        .attr("class", 'slice')
        .attr("stroke", 'black')
        .attr("fill", (d, i) => colorScale(i))
        .style('transform', `translate(${dimensions.width / 2}px, ${dimensions.height / 2}px)`)
        .attr('d', arcGenerator)
        .transition()

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
      <div className="fields">
        {instructionsArr.map((instruction, key) => (
          <div key={key} className="field">
            <label htmlFor={key} >
              {instruction.data.name} / {instruction.data.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;