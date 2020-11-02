// d3.select("h3").style("color", "darkblue").style("font-size", "24px");
// // d3.select("h3");

// var fruits = ['apple', 'mango', 'banana', 'orange'];    
// d3.select('ul')        
// .selectAll('li')        
// .data(fruits)        
// .enter()        
// .append('li')        
// .text((d) => d);

// var svg = d3.select('svg');
// svg.append('rect')   
// .attr('x', 200)   
// .attr('y', 10)
// .attr('width', 100)   
// .attr('height', 100)   
// .attr('fill', 'green');

var data = [80, 120, 60, 150, 200];

var barHeight = 20;
var bar = d3.select('svg')          
.selectAll('rect')          
.data(data)          
.enter()          
.append('rect')          
.attr('width', function(d) {  return d; })          
.attr('height', barHeight - 1)          
.attr('transform', function(d, i) {            
    return "translate(0," + i * barHeight + ")";          
});
