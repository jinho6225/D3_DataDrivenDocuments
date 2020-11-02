const URL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`



const w = 1900;
const h = 800;
const padding = 50;

const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr('class', "bar-chart")


fetch(URL).then(res => res.json())
.then(data => {

    let GDP = data.data.map(function (item) {
        return item[1];
    });
    let gdpMax = d3.max(GDP);

    const yScale = d3.scaleLinear()
    .domain([0, gdpMax])
    .range([0, h]);

    svg.selectAll("rect")
        .data(data.data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 5 + padding)
        .attr("y", (d, i) => h - yScale(d[1]))
        .attr("width", 3)
        .attr("height", (d, i) => yScale(d[1]))
        .attr('fill', 'navy')
        .attr('class', 'bar')
        .append("title")
        .text((d) => d)

    let yAxisScale = d3.scaleLinear().domain([0, gdpMax]).range([h, 0]);
    let yAxis = d3.axisLeft(yAxisScale);
    svg.append("g")
        // .attr("transform", `translate(${padding}, ${h-padding})`)
        .call(yAxis)
        .attr('transform', `translate(${padding}, 0)`);  
            
    let years = data.data.map(function (item) {
        let quarter;
        let temp = item[0].substring(5, 7);

        if (temp === '01') {
        quarter = 'Q1';
        } else if (temp === '04') {
        quarter = 'Q2';
        } else if (temp === '07') {
        quarter = 'Q3';
        } else if (temp === '10') {
        quarter = 'Q4';
        }

        return item[0].substring(0, 4) + ' ' + quarter;
    });

    let yearsDate = data.data.map(function (item) {
        return new Date(item[0]);
    });

    let xMax = new Date(d3.max(yearsDate));
    xMax.setMonth(xMax.getMonth() + 3);
    let xScale = d3
        .scaleTime()
        .domain([d3.min(yearsDate), xMax])
        .range([0, w]);

    let xAxis = d3.axisBottom().scale(xScale);
            
})

