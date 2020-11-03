const URL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`

var svg = d3.select('body').append('svg').attr('class', 'bar-chart')

var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var svgWidth = 500
var svgHeight = 300
var barPadding = 5;
var barWidth = (svgWidth / dataset.length);

svg.attr('width', svgWidth).attr('height', svgHeight);

var barChart = svg.selectAll("rect").data(dataset).enter().append('rect')
.attr('y', d => svgHeight - d)
.attr('height', d => d)
.attr('width', barWidth - barPadding)
.attr('transform', (d, i) => {
    var translate = [barWidth * i, 0]; 
    return "translate("+ translate +")";
})

var text = svg.selectAll('text')
.data(dataset).enter().append("text")
.text(d => d)
.attr('y', (d, i) => svgHeight - d - 2)
.attr('x', (d, i) => barWidth * i)
.attr('fill', 'navy')