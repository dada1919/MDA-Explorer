<template>
    <!-- <color-legend></color-legend> -->
    <div id="heatMap" ref="heatMapRef"> </div>
    
  </template>
  
  <script setup>
  
  import * as d3 from "d3";
  import { onMounted , ref } from "vue";
  // import data from '@/assets/data/data.json'
  // import data from '@/assets/data/news_data.json'
  import data from '@/assets/data/smaller_data'
  import miniHeatMap from "./miniHeatMap.vue";
  import { useUserStore } from '@/stores/counter'

  const popupVisible = ref(false); // 弹出窗口的可见性
  const popupData = ref(null); // 弹出窗口的数据
  const heatMapRef = ref();
  var selectedRect = null;
  
  onMounted(()=>{
    init();
  })
  
  // function mySlice(array, interval) {
  //   var new_array = []
  //   var len = 0
  //   for(var i = 0; i < array.length; i++) {
  //     if(i % interval == 0) {
  //       new_array[len] = array[i]
  //       len ++
  //     }
  //   }
  //   return new_array
  // }



  function handleMouseOut() {
    if (selectedRect !== this) {
      d3.select(this)
        .attr("stroke", "none");
    }
    const user = useUserStore()
    user.disease_index = -1;
    user.mirna_index = -1;
  }
    
  // function closePopup() {
  //   popupVisible.value = false; // 关闭弹出窗口
  //   popupData.value = null; // 清空弹出窗口的数据
  // }

  function init() {
    
    // console.log(data)
  
    const marginTop = 30;
    const marginRight = 5;
    const marginBottom = 5;
    const marginLeft = 5;
    // const rowHeight = 10;
    // const colWidth = 10;
    // const width = colWidth * data.disease.length + marginLeft + marginRight;
    // const height = rowHeight * data.mirna.length + marginTop + marginBottom;
    const width = heatMapRef.value.clientWidth;
    const height = heatMapRef.value.clientHeight;
    const legendMargin = 2;
    const legendWidth = 240;
    const legendMarginTop = 5;
    const legendRectHeight = 8;
    const data_max = 300;
    // console.log("size"+data.values.length)

    // const interval = 5
    // const smallx = mySlice(data.disease, interval*3)
    // const smally = mySlice(data.mirna, interval)
    // console.log("smallx"+smallx)
    // console.log("smally"+smally)
  
    const svg = d3
        .select("#heatMap")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; max-height: 100%;");
  
        // Create the scales.
    const x = d3.scaleBand()
      .domain(data.disease)
      .range([marginLeft, width - marginRight])
  
    // console.log(x(data.disease[0]))
    // console.log(marginLeft)
    // console.log(x.bandwidth())
  
    const y = d3.scaleBand()
      .domain(data.mirna)
      .range([marginTop, height - marginBottom])
    
  
    // const color = d3.scaleSequentialSqrt([0, d3.max(data.values, d => d3.max(d))], d3.interpolatePuRd);
  
    const color = d3.scaleSequentialSqrt([0, data_max], d3.interpolateBlues);
    // Append the axes.
    //svg.append("g")
    //    .call(g => g.append("g")
    //      .attr("transform", `translate(0,${marginTop})`)
    //      .call(d3.axisTop(x).ticks(null, "d").tickValues(smallx))
    //      .call(g => g.select(".domain").remove()))
    
    //svg.append("g")
    //    .attr("transform", `translate(${marginLeft},0)`)
    //    .call(d3.axisLeft(y).tickSize(0).tickValues(smally))
    //    .call(g => g.select(".domain").remove());
  
    // Create a cell for each (state, year) value.
    // const f = d3.format(",d");
    // const format = d => isNaN(d) ? "N/A cases"
    //     : d === 0 ? "0 cases"
    //     : d < 1 ? "<1 case"
    //     : d < 1.5 ? "1 case"
    //     : `${f(d)} cases`;
  
    // svg.append("text")
    //   .x

    svg.append("g")
      .selectAll("g")
      .data(data.values)
      .join("g")
      .attr("transform", (d, i) => `translate(0,${y(data.mirna[i])})`)
      .selectAll(".heatRect")
      .data(d => d)
      .join("rect")
      .attr("class", "heatRect")
      .attr("x", (d, i) => x(data.disease[i]) + 1)
      .attr("width", x.bandwidth()-1)
      .attr("height", y.bandwidth()-1)
      .attr("fill", d => d === 0? "#eee" : color(d))
      .append("title")
        // .text((d, i) => `${format(d)} per 100,000 people in ${data.years[i]}`);
    
    //绘制图例
    var legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(" + (legendMargin) + "," + legendMarginTop + ")");
    
    var legendScale = d3.scaleLinear()
      .domain([0, data_max]) // 根据您的数据范围设置图例的域
      .range([0, legendWidth]); // 设置图例的高度范围

    console.log("max"+d3.max(data.values, d => d3.max(d)))

    var legendAxis = d3.axisBottom(legendScale)
      .ticks(5) // 根据需要设置刻度数量
      .tickSize(2)

    legend.append("g")
      .attr("class", "legend-axis")
      .attr("transform", "translate(" + "0" + ", " + (legendRectHeight+1.5) + ")")
      .call(legendAxis);

    // 添加图例标题
    // legend.append("text")
    //   .attr("class", "legend-title")
    //   .attr("x", 0)
    //   .attr("y", -10)
    //   .text("Legend");

    console.log("colortick"+color.ticks(5))
    // 添加图例矩形
    var legendRect = legend.selectAll(".legend-rect")
      .data(color.ticks(5).slice(0, -1))
      .enter()
      .append("rect")
      .attr("class", "legend-rect")
      .attr("x", function(d) {
        return legendScale(d);
      })
      .attr("y", 1)
      .attr("width", function(d, i) {
        if (i === 0) {
          return legendScale(color.ticks(5)[1]) - legendScale(color.ticks(5)[0]);
        }
        return legendScale(d) - legendScale(color.ticks(5)[i-1]);
      })
      .attr("height", legendRectHeight)
      .attr("fill", function(d) {
        return color(d)
      })

    // 添加图例标签
    // var legendLabel = legend.selectAll(".legend-label")
    //   .data(color.ticks(6))
    //   .enter()
    //   .append("text")
    //   .attr("class", "legend-label")
    //   .attr("x", function(d, i) {
    //     return legendScale(d) ;
    //   })
    //   .attr("y", 15)
    //   .attr("dy", "0.25em")
    //   .attr("font-size", 10)
    //   .text(function(d) {
    //     return d.toFixed(1); // 根据需要格式化标签文本
    //   });

    svg.selectAll(".heatRect")
      .on("mouseover", function(event, d) {
        if (selectedRect == this)
          return;
        d3.select(this)
          // .attr("fill", "red")
          .attr("stroke", "red")
          .attr("stroke-width", 1)
          
          
        const xy = d3.pointer(event, svg.node());
        const xv = xy[0]
        const yv = xy[1]
        const index_d = Math.floor((xv-marginLeft)/ x.bandwidth());
        const index_m = Math.floor((yv-marginTop) / y.bandwidth());
        // console.log("点击了热力图矩形", index_d);
        // console.log(index_m)

        const user = useUserStore()
        user.disease_index = index_d;
        user.mirna_index = index_m;
        // console.log(user.disease_index)
        
      })
      .on("mouseout", handleMouseOut)
      .on("click", function(event, d) {  
        const xy = d3.pointer(event, svg.node());
        const xv = xy[0]
        const yv = xy[1]
        const index_d = Math.floor((xv-marginLeft)/ x.bandwidth());
        const index_m = Math.floor((yv-marginTop) / y.bandwidth());
        // console.log("点击了热力图矩形", index_d);
        // console.log(index_m)
        
        const user = useUserStore()
        console.log("userfix"+user.fix)
        if(user.fix) {
          console.log("compare"+(user.fix_disease == index_d))
          if(user.fix_disease == index_d && user.fix_mirna == index_m) {
            user.fix = false
          } else {
            user.fix_disease = index_d;
            user.fix_mirna = index_m;
          }
        } else {
          user.fix = true
          user.fix_disease = index_d;
          user.fix_mirna = index_m;
        }
        
        
        if (selectedRect == this) {
          d3.select(selectedRect)
            .attr("stroke", "none");
          selectedRect = null;
          return;
        }
        if (selectedRect) {
          // 移除之前选中的矩形的边框
          d3.select(selectedRect)
            .attr("stroke", "none");
        }

        selectedRect = this;
        // 给当前选中的矩形添加高亮的边框
        d3.select(this)
          // .attr("fill", "red")
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
        // console.log(user.disease_index)
      })

    return Object.assign(svg.node(), {scales: {color}});
  
  }
</script>

<style scoped>
#heatMap{
  width:100%;
  height: 100%;
}
</style>
