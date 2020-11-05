import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select } from 'd3';


function App() {
    const svgRef = useRef();
    const [data, setData] = useState([12,23,34,37,56])
    useEffect(() => {
        console.log(svgRef)
        const svg = select(svgRef.current);
        svg.selectAll('circle')
        .data(data)
        .join('circle')
        // .join(
        //     enter => enter.append('circle').attr('class', 'new'),
        //     update => update.attr('class', 'updated'),
        //     exit => exit.remove()
        // )
        .attr('r', val => val)
        .attr('cx', val => val * 2)
        .attr('cy', val => val * 2)
        .attr('stroke', 'red')
        ;
    }, [data])

    return (
    <>
    <svg ref={svgRef}></svg>
    <br />
    <button onClick={() => setData(data.map(val => val + 5))}>Add</button>
    <button onClick={() => setData(data.filter(val => val < 35))}>Filter</button>
    </>
    )
}
export default App;