<template>
  <div id="heatMap"> </div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted } from "vue";
// import data from '@/assets/data/data.json'
// import data from '@/assets/data/news_data.json'
import data from '@/assets/data/smaller_data'


onMounted(()=>{
  init();
})

function mySlice(array, interval) {
  var new_array = []
  var len = 0
  for(var i = 0; i < array.length; i++) {
    if(i % interval == 0) {
      new_array[len] = array[i]
      len ++
    }
  }
  return new_array
}

function init() {
  
  // console.log(data)

  const marginTop = 20;
  const marginRight = 5;
  const marginBottom = 40;
  const marginLeft = 60;
  const rowHeight = 5;
  const colWidth = 5;
  const width = colWidth * data.disease.length + marginLeft + marginRight;
  const height = rowHeight * data.mirna.length + marginTop + marginBottom;
  const interval = 5
  const smallx = mySlice(data.disease, interval*3)
  const smally = mySlice(data.mirna, interval)
  console.log("smallx"+smallx)
  console.log("smally"+smally)

  const svg = d3
      .select("#heatMap")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

      // Create the scales.
  const x = d3.scaleBand()
    .domain(data.disease)
    .rangeRound([marginLeft, width - marginRight])


  const y = d3.scaleBand()
    .domain(data.mirna)
    .rangeRound([marginTop, height - marginBottom])
  

  const color = d3.scaleSequentialSqrt([0, d3.max(data.values, d => d3.max(d))], d3.interpolatePuRd);

  // Append the axes.
  svg.append("g")
      .call(g => g.append("g")
        .attr("transform", `translate(0,${marginTop})`)
        .call(d3.axisTop(x).ticks(null, "d").tickValues(smallx))
        .call(g => g.select(".domain").remove()))
  
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSize(0).tickValues(smally))
      .call(g => g.select(".domain").remove());

  // Create a cell for each (state, year) value.
  const f = d3.format(",d");
  const format = d => isNaN(d) ? "N/A cases"
      : d === 0 ? "0 cases"
      : d < 1 ? "<1 case"
      : d < 1.5 ? "1 case"
      : `${f(d)} cases`;

  svg.append("g")
    .selectAll("g")
    .data(data.values)
    .join("g")
      .attr("transform", (d, i) => `translate(0,${y(data.mirna[i])})`)
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(data.disease[i]) + 1)
      .attr("width", 5)
      .attr("height", y.bandwidth() - 1)
      .attr("fill", d => isNaN(d) ? "#eee" : d === 0 ? "#fff" : color(d))
    .append("title")
      // .text((d, i) => `${format(d)} per 100,000 people in ${data.years[i]}`);

  return Object.assign(svg.node(), {scales: {color}});

  
}
</script>