var svg = d3.select('body').append('svg').attr('class', 'bar-chart')

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