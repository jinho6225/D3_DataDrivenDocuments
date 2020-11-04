import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { select, line, curveCardinal, axisBottom,  axisRight, scaleLinear } from "d3";
// const API_KEYS = '311bf9d275efb48e7f34c6c1db25fba3';


function App() {
    const [data, setData] = useState([]);
    const svgRef = useRef();

    const tempList = () => {
        // fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?zip=90631,us&appid=${API_KEYS}&units=imperial`)
        fetch(`https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`)
            .then(res => res.json())
            .then(data => {
                let newData = data.data.map(d => d[1])
                setData(newData)
            })
    }
        

    useEffect(() => {
        tempList()

        const svg = select(svgRef.current);
        const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, 1200]);

        const yScale = scaleLinear().domain([0, 20000]).range([800, 0]);

        const xAxis = axisBottom(xScale).ticks(30).tickFormat(i => i);
        svg.select(".x-axis").style("transform", "translateY(800px)").call(xAxis);
        // xAxis(svg.select('.x-axis'))

        const yAxis= axisRight(yScale);
        svg.select(".y-axis").style("transform", "translateX(1200px)").call(yAxis);

        const myLine = line()
        .x((value, i) => xScale(i))
        .y(yScale)
        .curve(curveCardinal);

        svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr('class', 'line')
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", "blue");
        console.log(data, 'data')

    }, []);
    return (
        <>
        <svg ref={svgRef} style={{height: '800px'}}>
            <g className="x-axis" />
            <g className="y-axis" />

        </svg>
        <br />
        <br />
        <br />
        <br />

        <button onClick={() => setData(data.map((value) => value + 5))}>
            Click
        </button>
        <button onClick={() => setData(data.filter((value) => value < 35))}>
            Filter
        </button>
        </>
    );
}

export default App;
