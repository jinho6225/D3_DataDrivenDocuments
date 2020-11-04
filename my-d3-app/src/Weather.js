// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3'

// const API_KEYS = '97d3e011fcced53f4d09ac1fef87d5c2';
// //        fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=90631,us&appid=${API_KEYS}&units=imperial`)


// function Weather() {
//     const [tempinfo, setTempinfo] = useState([]);
//     const svgRef = useRef();

//     const tempList = () => {
//         fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=90631,us&appid=${API_KEYS}&units=imperial`)
//             .then(res => res.json())
//             .then(data => {
//                 let newData = data.list.map(d => ({ date: d.dt_txt, temp: d.main.temp }))
//                 setTempinfo(newData)
//             })
        
//         }
    
//     useEffect(() => {    
//         console.log(tempinfo) 
//         tempList()

//         const svgLine = d3.select(svgRef.current)

//         const myLine = d3.line()
//         .x((val, i) => i * 5)
//         .y((val) => 150 - val.temp)
//         .curve(d3.curveCardinal)

//         svgLine.selectAll('path')
//         .data(tempinfo)
//         .join('path')
//         .attr('d', (val) => myLine(val))
//         .attr('fill', 'none')
//         .attr('stroke', 'blue')

//     }, [])


//     return (
//         <>
//             <svg ref={svgRef}></svg>
//         </>
//     )
// }

// export default Weather;


