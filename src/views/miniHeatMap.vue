<template>
    <div id="miheatMap" ref="miRef"> </div>
    <!-- <div> {{ disease_index }}</div> -->
    <el-tooltip ref="tooltip" placement="top" v-model:visible="visible" :virtual-ref="buttonRef" virtual-triggering effect="light">
      <template #content> {{content1}} <br /> {{ content2 }} </template>
    </el-tooltip>
    
</template>
  <script setup>
  import * as d3 from "d3";
  import { onMounted , ref , watch} from "vue";
  // import data from '@/assets/data/data.json'
  // import data from '@/assets/data/news_data.json'
  import raw_data from '@/assets/data/array'
  import { useUserStore } from '@/stores/counter';
  import { storeToRefs } from 'pinia'
  import { useGraphStore } from '@/stores/graph'

  const user = useUserStore()
  // const index = storeToRefs(user.value)
  const { disease_index, mirna_index, fix, fix_disease, fix_mirna } = storeToRefs(user)

  const graph_user = useGraphStore()
  // const { graph_disease, graph_mirna } = storeToRefs(graph_user)

  var data = {'values': '', 'disease':'', 'mirna':''}

  const miRef = ref()
  const unit = 40 //矩阵缩放单位
  const tooltip = ref()
  const visible = ref(false);  //控制tooltip显示或隐藏
  const buttonRef = ref(null);  //鼠标选中的元素
  var content1 = ref()      //提示框内容
  var content2 = ref()      //提示框内容
  var selectedRect = null;

  const marginTop = 30;
  const marginRight = 5;
  const marginBottom = 5;
  const marginLeft = 5;
  
  const legendMargin = 8;
  const legendWidth = 200;
  const legendMarginTop = 2;
  const legendRectHeight = 8;
  const data_max = 1;

  const highlight_color = "red"
  const over_color = "#ff9300"
  const highlight_width = 2
  const color = d3.scaleSequentialSqrt([0, data_max], d3.interpolateGreens);
  
  onMounted(()=>{
    
    try {
      
      console.log("disease_index"+disease_index)
      if(fix.value) {
        update(fix_disease.value, fix_mirna.value);
      } else {
        update(disease_index.value, mirna_index.value);
      }

      watch([fix, fix_disease, fix_mirna], (newValue, oldValue) => {
        if(newValue[0] && oldValue[0])
          update(newValue[1], newValue[2])
        if(newValue[0] && !oldValue[0])
          update(newValue[1], newValue[2])
      })

      watch([disease_index, mirna_index], (newValue, oldValue) => {
        // 返回的数据是数组
        // console.log("new", newValue[0], "old", oldValue);
        console.log("fix"+fix.value)
        if(!fix.value)
          update(newValue[0], newValue[1]);
      });
    } catch (error) {
      console.error("Error in mounted:", error);
    }
  })
  
  function mySlice(disease_index, mirna_index) {
    if(disease_index == -1)
      return {'values': '', 'disease':'', 'mirna':''}
    var array = raw_data.values
    var sub_array = array.slice(mirna_index * unit, (mirna_index+1) * unit).map(row => row.slice(disease_index*unit, (disease_index+1)*unit));
    var disease_ids = raw_data.disease.slice(disease_index*unit, (disease_index+1)*unit)
    var mirna_ids = raw_data.mirna.slice(mirna_index*unit, (mirna_index+1)*unit)
    return {'values':sub_array, 'disease': disease_ids, 'mirna': mirna_ids}
  }


  function update(disease_index, mirna_index) {
    const width = miRef.value.clientWidth;
    const height = miRef.value.clientHeight;

    data = mySlice(disease_index, mirna_index)
    // console.log("data"+JSON.stringify(data))
    const x = d3.scaleBand()
      .domain(data.disease)
      .range([marginLeft, width - marginRight])
    
    const y = d3.scaleBand()
      .domain(data.mirna)
      .range([marginTop, height - marginBottom])
    
    var svg = d3.select("#miheatMap").select("svg")
    if(svg.size() === 0) {
      svg = d3
        .select("#miheatMap")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: 100%;");
    }
    
    svg.selectAll("rect").remove()
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
      .attr("fill", d => d === 0.0 ? "#eee" : color(d))
      .append("title")
    // const svg = d3.select("#miheatMap").select("svg")
    // svg.selectAll("rect").data(data.values).attr("fill", d => d === 0.0 ? "#eee" : color(d))

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

    svg.selectAll(".heatRect")
      // .on("click", handleClick)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick)

    function handleMouseOver(event, d) {

      const xy = d3.pointer(event, svg.node());
      const xv = xy[0]
      const yv = xy[1]
      const index_d = Math.floor((xv-marginLeft)/ x.bandwidth());
      const index_m = Math.floor((yv-marginTop) / y.bandwidth());
      content1 = "("+data.disease[index_d]+","+data.mirna[index_m]+")";
      content2 = data.values[index_m][index_d]

      buttonRef.value = event.currentTarget;
      visible.value = true;

      if (selectedRect == this)
          return;
      d3.select(this)
        .attr("stroke", over_color)
        .attr("stroke-width", highlight_width)
    }

    function handleMouseOut(event, d) {
      visible.value = false;
      if (selectedRect !== this) {
      d3.select(this)
        .attr("stroke", "none");
      }
    }

    function handleClick(event, d) {
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
        .attr("stroke", highlight_color)
        .attr("stroke-width", highlight_width)
      // console.log(user.disease_index)

      const xy = d3.pointer(event, svg.node());
      const xv = xy[0]
      const yv = xy[1]
      const index_d = Math.floor((xv-marginLeft)/ x.bandwidth());
      const index_m = Math.floor((yv-marginTop) / y.bandwidth());
      
      graph_user.graph_disease = data.disease[index_d]
      graph_user.graph_mirna = data.mirna[index_m]
    }
  }

  function init(disease_index, mirna_index) {
    const width = miRef.value.clientWidth;
    const height = miRef.value.clientHeight;
    // console.log(data)
    // const height = 150;
    console.log(height)
    // const interval = 5
    // const disease_index = 0;
    // const mirna_index = 0;
    const data = mySlice(disease_index, mirna_index)
    // const smally = mySlice(data.mirna, interval)
    // console.log("smallx"+smallx)
    // console.log("smally"+smally)
    // console.log("data"+data.values.length)
  
    const svg = d3
        .select("#miheatMap")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: 100%;");
  
        // Create the scales.
    const x = d3.scaleBand()
      .domain(data.disease)
      .rangeRound([marginLeft, width - marginRight])
    
      // console.log(x)
  
  
    const y = d3.scaleBand()
      .domain(data.mirna)
      .rangeRound([marginTop, height - marginBottom])
    
  
    // Append the axes.
    // svg.append("g")
    //     .call(g => g.append("g")
    //       .attr("transform", `translate(0,${marginTop})`)
    //       .call(d3.axisTop(x).ticks(null, "d").tickValues(smallx))
    //       .call(g => g.select(".domain").remove()))
    
    // svg.append("g")
    //     .attr("transform", `translate(${marginLeft},0)`)
    //     .call(d3.axisLeft(y).tickSize(0).tickValues(smally))
    //     .call(g => g.select(".domain").remove());
  
    // Create a cell for each (state, year) value.
    // const f = d3.format(",d");
    // const format = d => isNaN(d) ? "N/A cases"
    //     : d === 0 ? "0 cases"
    //     : d < 1 ? "<1 case"
    //     : d < 1.5 ? "1 case"
    //     : `${f(d)} cases`;
  
    svg.append("g")
      .selectAll("g")
      .data(data.values)
      .join("g")
        .attr("transform", (d, i) => `translate(0,${y(data.mirna[i])})`)
      .selectAll("rect")
      .data(d => d)
      .join("rect")
        .attr("x", (d, i) => x(data.disease[i]) + 1)
        .attr("width", x.bandwidth()-1)
        .attr("height", y.bandwidth()-1)
        .attr("fill", d => d === 0.0 ? "#eee" : color(d))
      .append("title")
        // .text((d, i) => `${format(d)} per 100,000 people in ${data.years[i]}`);
    
    

    return Object.assign(svg.node(), {scales: {color}});
  
  }
</script>

<style scoped>
#miheatMap{
  width:100%;
  height: 100%;
}
</style>