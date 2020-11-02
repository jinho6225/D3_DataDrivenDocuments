d3.select('body').append('h2').attr('id', 'title').text('Bar Chart')

const w = 500;
const h = 500;
const padding = 60;

const URL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`

let xScale;
let yScale;

let data = fetch(URL)
    .then(res => res.json())
    .then(data => data)
    .then(data => {
        console.log(data)
        // yScale = d3.scaleLinear()
        // .domain([0, d3.max(data, (d) => d[1])])
        // .range([h - padding, padding]);
        // console.log(yScale)
    })

const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


// const xScale = d3.scaleLinear()
//         .domain([0, d3.max(dataset, (d) => d[0])])
//         .range([padding, w - padding]);

// const yScale = d3.scaleLinear()
//         .domain([0, d3.max(dataset, (d) => d[1])])
//         .range([h - padding, padding]);


// const dataset = [
//     [ 34,     78 ],
//     [ 109,   280 ],
//     [ 310,   120 ],
//     [ 79,   411 ],
//     [ 420,   220 ],
//     [ 233,   145 ],
//     [ 333,   96 ],
//     [ 222,    333 ],
//     [ 78,    320 ],
//     [ 21,   123 ]
//   ];





// svg.selectAll("circle")
// .data(dataset)
// .enter()
// .append("circle")
// .attr("cx", (d) => xScale(d[0]))
// .attr("cy",(d) => yScale(d[1]))
// .attr("r", (d) => 5);

// svg.selectAll("text")
// .data(dataset)
// .enter()
// .append("text")
// .text((d) =>  (d[0] + "," + d[1]))
// .attr("x", (d) => xScale(d[0] + 10))
// .attr("y", (d) => yScale(d[1]))

// const xAxis = d3.axisBottom(xScale);
// // Add your code below this line
// const yAxis = undefined;
// // Add your code above this line

// svg.append("g")
// .attr("transform", "translate(0," + (h - padding) + ")")
// .call(xAxis);
