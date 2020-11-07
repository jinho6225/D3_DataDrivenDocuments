import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";


function BarChart({ data }) {
    let history = useHistory();
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef)


    useEffect(() => {
        const svg = select(svgRef.current);

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
        const yAxis = axisLeft(yScale);
        svg
            .selectAll(".y-axis")
            .call(yAxis);


        function handleClick(d) {
            history.push("/profile", d);
        }   
        
        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', -dimensions.height)
            .attr('width', xScale.bandwidth())
            .on("click", function(e, d) {
                handleClick(d);
            })
                // .on("mouseenter", function (event, value) {
                //     // events have changed in d3 v6:
                //     // https://observablehq.com/@d3/d3v6-migration-guide#events
                //     const index = svg.selectAll(".bar").nodes().indexOf(this);
                //     svg
                //         .selectAll(".tooltip")
                //         .data([value])
                //         .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
                //         .attr("class", "tooltip")
                //         .text(value)
                //         .attr("x", xScale(index) + xScale.bandwidth() / 2)
                //         .attr("text-anchor", "middle")
                //         .transition()
                //         .attr("y", yScale(value) - 8)
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
        

    }, [data, dimensions, history]);

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