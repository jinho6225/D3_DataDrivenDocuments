const URL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`



const w = 1900;
const h = 1000;

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

fetch(URL).then(res => res.json())
.then(data => {
    svg.selectAll("rect")
       .data(data.data)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 5)
       .attr("y", (d, i) => h - (d[1]/20))
       .attr("width", 3)
       .attr("height", (d, i) => (d[1]/20))
       .attr('fill', 'navy')

})