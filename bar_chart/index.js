// const URL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`

// var svg = d3.select('body').append('svg').attr('class', 'bar-chart')

// var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// var svgWidth = 500
// var svgHeight = 300

// svg.attr('width', svgWidth).attr('height', svgHeight + 60);

// var xScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([0, svgWidth]);

// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([svgHeight, 0]);

// var x_axis = d3.axisBottom().scale(xScale);
// var y_axis = d3.axisLeft().scale(yScale);

// svg.append("g")
//     .attr("transform", "translate(50, 10)")
//     .call(y_axis);
         
// var xAxisTranslate = svgHeight + 10;
         
// svg.append("g")
//     .attr("transform", "translate(50, " + xAxisTranslate  +")")
//     .call(x_axis);

// var barChart = svg.selectAll("rect").data(dataset).enter().append('rect')
// .attr('y', d => svgHeight- yScale(d))
// .attr('height', d => yScale(d))
// .attr('width', barWidth - barPadding)
// .attr('transform', (d, i) => {
//     var translate = [barWidth * i, 0]; 
//     return "translate("+ translate +")";
// })

var svgWidth = 600, svgHeight = 500;
var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "svg-container")
    .style('background-color', 'orange')

var line = svg.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "red");

var line = svg.append("line")
.attr("x1", 100)
.attr("x2", 100)
.attr("y1", 50)
.attr("y2", 450)
.attr("stroke", "white");

var line = svg.append("line")
.attr("x1", 500)
.attr("x2", 500)
.attr("y1", 50)
.attr("y2", 450)
.attr("stroke", "yellow");

var line = svg.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 450)
    .attr("y2", 450)
    .attr("stroke", "green");

    var rect = svg.append("rect")
    .attr("x", 200)
    .attr("y", 200)
    .attr("width", 200)
    .attr("height", 100)
    .attr("fill", "#9B95FF");

    var circle = svg.append("circle")
    .attr("cx", 300)
    .attr("cy", 250)
    .attr("r", 50)
    .attr("fill", "#7CE8D5"); 