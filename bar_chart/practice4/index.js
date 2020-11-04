
var svg = d3.select('body').append('svg').attr('class', 'bar-chart')

var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var svgWidth = 500
var svgHeight = 300

svg.attr('width', svgWidth).attr('height', svgHeight + 60);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight, 0]);

var x_axis = d3.axisBottom().scale(xScale);
var y_axis = d3.axisLeft().scale(yScale);

svg.append("g")
    .attr("transform", "translate(50, 10)")
    .call(y_axis);
         
var xAxisTranslate = svgHeight + 10;
         
svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate  +")")
    .call(x_axis);

var barChart = svg.selectAll("rect").data(dataset).enter().append('rect')
.attr('y', d => svgHeight- yScale(d))
.attr('height', d => yScale(d))
.attr('width', barWidth - barPadding)
.attr('transform', (d, i) => {
    var translate = [barWidth * i, 0]; 
    return "translate("+ translate +")";
})
