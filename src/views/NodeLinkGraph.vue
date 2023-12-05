<template>
    <div id="nodelink"></div>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted } from "vue";
// import suits from '@/assets/data/suits'
// import graph_data from '@/assets/data/graph'
// import graph_data from '@/assets/data/old_graph'
import graph_data from '@/assets/data/example'


onMounted(()=>{
    init();
})

function init() {
    const width = 928;
    const height = 600;
    const types = ['P', 'M', 'D'];
    const link_types = ["D-P", "M-P", "M-M", "M-D", "D-D"];
    // const nodes = graph_data.nodes;
    // const links = graph_data.edges;

    const nodes = graph_data.D000071698.nodes.map(d => ({...d}));
    
    const links = graph_data.D000071698.edges.map(d => ({...d}));
    var newLink = { source: "MI0000459", target: "D000071698" , value:0.5833, type:"M-D"};
    links.push(newLink);

    const node_color = d3.scaleOrdinal(types, d3.schemeCategory10);
    const link_color = "#999";

    console.log(nodes)
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.ID).distance(120).strength(function(d) { return d.type === "sameType" ? 1 : 0.2; }))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("collide", d3.forceCollide().radius(30).strength(1));

    const svg = d3
      .select("#nodelink")
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    svg.append("defs").selectAll("marker")
      .data(link_types)
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", link_color)
      .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("id", function(d, i) { return "arc-" + i; }) // 唯一的ID用于文本Path引用
      .attr("stroke", function(d) {console.log(d); return d.type == "M-D"? "#FF0000" :"#999";})
      .attr("stroke-opacity", 0.6)
      .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);


    const node = svg.append("g")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("fill", d => node_color(d.type))
      .call(drag(simulation));

    node.append("circle")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("r", 10);

    node.append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text(d => d.ID)
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);


    var arcText = svg.selectAll(".arc-text")
      .data(links)
      .enter()
      .append("text")
      .attr("class", "arc-text")
      .append("textPath")
      .attr("xlink:href", function(d, i) { return "#arc-" + i; }) // 弧线的ID
      .attr("startOffset", "20%") // 文本在路径上的起始偏移量
      .text(function(d) { return d.value; }); // 根据数据设置文本内容

    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    d3.invalidation.then(() => simulation.stop());

    return Object.assign(svg.node(), {scales: {node_color}});
}

function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

const drag = simulation => {
  
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
</script>