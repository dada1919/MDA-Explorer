<template>
  <!-- <div id="legend" class="sidebar" ref = "legendRef"></div> -->
  <div id="nodelink" class="container" ref="containerRef"></div>
  <el-tooltip ref="tooltip" placement="right" v-model:visible="visible" :virtual-ref="linkRef" virtual-triggering effect="light">
    <template #content> {{content}} </template>
  </el-tooltip>
  <el-tooltip ref="node_tooltip" placement="top" v-model:visible="node_visible" :virtual-ref="nodeRef" virtual-triggering effect="light">
    <template #content> {{content2}} </template>
  </el-tooltip>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref, watch } from "vue";
// import suits from '@/assets/data/suits'
// import graph_data from '@/assets/data/graph'
// import graph_data from '@/assets/data/old_graph'
// import graph_data from '@/assets/data/example3'
import { useGraphStore } from '@/stores/graph'
import { useInfoStore } from '@/stores/info'
import { storeToRefs } from 'pinia'

var graph_data
const containerRef = ref()
const tooltip = ref()
const visible = ref(false);  //控制tooltip显示或隐藏
var linkRef = ref(null);  //鼠标选中的元素
var content = ref()      //提示框内容
const node_tooltip = ref()
const node_visible = ref(false);
var nodeRef = ref(null)
var content2 = ref()

const user = useGraphStore()
const { graph_disease, graph_mirna } = storeToRefs(user)

const info_user = useInfoStore()
// const { type, id } = storeToRefs(info_user)

var target_disease = graph_disease.value
var target_mirna = graph_mirna.value
var path = '../assets/graph_data/'+target_mirna+'.json'

const nodeR = 7

onMounted(()=>{
  // console.log("path"+path)

  if(target_disease != -1){
    import(path).then((data) => {
      //在加载完成后可以处理文件内容
      graph_data = data[target_disease]
      init();
  });}

  watch([graph_disease, graph_mirna], (newValue, oldValue) => {
    console.log("watch")
    target_disease = graph_disease.value
    target_mirna = graph_mirna.value
    path = '../assets/graph_data/'+target_mirna+'.json'
    if(target_disease != -1){
    import(path).then((data) => {
      //在加载完成后可以处理文件内容
      graph_data = data[target_disease]
      init();
    });
    }
  })

  
  
  // try {
    
  // } catch(error) {
  //   console.error(error)
  // }
    
})

function init() {
    var scale = 1
    const svgContainer = document.getElementById('nodelink');
    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;
    // console.log("width"+width)
    const types = ['P', 'M', 'D'];
    const link_types = ["D-P", "M-P", "M-M", "M-D", "D-D"];
    // const nodes = graph_data.nodes;
    // const links = graph_data.edges;
    console.log(graph_data);
    const pred = graph_data.pred

    const nodes = graph_data.nodes.map(d => ({...d}));
    
    const links = graph_data.edges.map(d => ({...d}));
    var newLink = { source: target_mirna, target: target_disease , value:pred, type:"M-D"};
    links.push(newLink);

    var di_exist = false;
    var mi_exist = false;
    nodes.forEach(function(node) {
      if(node.ID == target_disease)
        di_exist = true;
      if(node.ID == target_mirna)
        mi_exist = true;
    })
    var disease_node = { type: 'D', ID: target_disease, name: null, level: 0}
    var mirna_node = {type: 'M', ID: target_mirna, name: null, level: 0}
    if(!di_exist)
      nodes.push(disease_node)
    if(!mi_exist)
      nodes.push(mirna_node)

    const node_color = d3.scaleOrdinal(types, d3.schemeCategory10);
    const link_color = "#999";
    var pre_color;
    var selectedNode = null
    const highlight_color = "red"
    const highlight_width = 2

    // console.log(nodes)
    //原来的
    // const simulation = d3.forceSimulation(nodes)
    //   .force("link", d3.forceLink(links).id(d => d.ID).distance(50).strength(function(d) { return d.type === "sameType" ? 1 : 0.2; }))
    //   .force("charge", d3.forceManyBody().strength(-200))
    //   .force("x", d3.forceX())
    //   .force("y", d3.forceY())
    //   .force("collide", d3.forceCollide().radius(30).strength(1));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.ID))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    var svg = d3.select("#nodelink").select("svg")
    if(svg.size() === 0) {
      svg = d3
        .select("#nodelink")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");
    }
    svg.selectAll("*").remove();
    
    

    //添加图例
    var data_legend = [
      {
        "name" : "disease",
        "color": node_color("D")
      },
      {
        "name" : "PCG",
        "color": node_color("P")
      },
      {
        "name" : "miRNA",
        "color": node_color("M")
      }
    ]

    const legendGroup = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate("+(-width / 2)+","+(-height / 2.1)+")"); // 设置图例组的位置

    // 添加图例项
    const legendItems = legendGroup.selectAll(".legend-item")
      .data(data_legend) // 图例项的数据
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`); // 设置每个图例项的位置

    // 在图例项中添加圆形
    legendItems.append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 5)
      .attr("fill", d => d.color); // 根据类型设置圆形的颜色

    // 在图例项中添加文本
    legendItems.append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text(d => d.name);

    svg.append("defs").selectAll("marker")
      .data(link_types)
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", -0.5)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", link_color)
      .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("id", function(d, i) { return "arc-" + i; }) // 唯一的ID用于文本Path引用
      .attr("stroke", function(d) {
        // console.log("d"+JSON.stringify(d));
        return (d.source.ID == target_mirna && d.target.ID == target_disease)? "#FF0000" :"#999";
      })
      .attr("stroke-width", function(d, i) { return Math.max(1, 5 * d.value) })
      .attr("stroke-opacity", 0.6)
      .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`)
      .on("mouseover", function(event, d) {
        // console.log("on")
        visible.value = true;
        linkRef.value = event.currentTarget;
        content = d.value
        //连线高亮
        pre_color = d3.select(this).attr("stroke")
        // console.log("color"+pre_color)
        d3.select(this)
        .attr("stroke", "#FFA500")
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
        .attr("stroke", pre_color)
        visible.value = false;
      })

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
      .attr("r", nodeR)
      .on("mouseover", function(event, d) {
        node_visible.value = true;
        nodeRef.value = event.currentTarget;
        content2 = d.ID
        //连线高亮
        d3.select(this)
        .attr("stroke", "#FFA500")
      })
      .on("mouseout", function(event, d) {
        node_visible.value = false;
        if (selectedNode !== this) {
          d3.select(this)
          .attr("stroke", "none")
        }
      })
      .on("click", function(event, d) {
        info_user.type = d.type
        info_user.id = d.ID
        console.log("info_user.type"+info_user.type)

        if (selectedNode == this) {
          d3.select(selectedNode)
            .attr("stroke", "none");
            selectedNode = null;
          return;
        }
        if (selectedNode) {
          // 移除之前选中的矩形的边框
          d3.select(selectedNode)
            .attr("stroke", "none");
        }

        selectedNode = this;
        // 给当前选中的矩形添加高亮的边框
        d3.select(this)
          .attr("stroke", highlight_color)
          .attr("stroke-width", highlight_width)
    })

    node.append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text(function(d) {
        // 根据条件判断是否显示文本元素
        // console.log("d.ID"+d.ID)
        return (d.ID == target_disease || d.ID == target_mirna) ? d.ID : "";
      })
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    // var arcText = svg.selectAll(".arc-text")
    //   .data(links)
    //   .enter()
    //   .append("text")
    //   .attr("class", "arc-text")
    //   .append("textPath")
    //   .attr("xlink:href", function(d, i) { return "#arc-" + i; }) // 弧线的ID
    //   .attr("startOffset", "20%") // 文本在路径上的起始偏移量
    //   .text(function(d) { return d.value; }); // 根据数据设置文本内容

    simulation.on("tick", () => {
      // nodes.forEach(node => {
      //   node.x = Math.max(nodeR, Math.min(width - nodeR, node.x));
      //   node.y = Math.max(nodeR, Math.min(height - nodeR, node.y));
      // });
        
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

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
</style>