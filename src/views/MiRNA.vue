<template>
  <div class="table-container">
    <el-table :data="computedTableData" :show-header="false">
    <el-table-column label="姓名" :width='col_width'>
      <template v-slot="{ row }">
        <div class="first-column">
          {{ row.label }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="年龄">
      <template #default="{ row }">
        <template v-if="isLink(row.value)">
          <a :href="row.value" target="_blank">{{ row.value }}</a>
        </template>
        <template v-else>
          {{ row.value }}
        </template>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script setup>
import { onMounted, watch, ref , computed} from "vue";
import { useInfoStore } from '@/stores/info'
import { storeToRefs } from 'pinia'
import * as d3 from "d3";
import d_info from '@/assets/data/info_diseases.json'
import mi_info from '@/assets/data/info_mirnas.json'

const user = useInfoStore()
const { type, id } = storeToRefs(user)

var tableData= ref([])
// var tableData= ref([
//     { label: 'Accession', value: 'MI0000009' },
//     { label: 'ID', value: 'cel-mir-38' },
//     { label: 'Sequence', value: 'GUGAGCCAGGUCCUGUUCCGGUUUUUUCCGUGGUGAUAACGCAUCCAAAAGUCUCUAUCACCGGGAGAAAAACUGGAGUAGGACCUGUGACUCAU' },
//     { label: 'Mature1_Acc', value: 'MIMAT0020305' },
//     { label: 'Mature1_ID', value: 'cel-miR-38-5p' },
//     { label: 'Mature1_Seq', value: 'UCCGGUUUUUUCCGUGGUGAUA' },
//     { label: 'Mature2_Acc', value:  'MIMAT0000009'},
//     { label: 'Mature2_ID', value: 'cel-miR-38-3p' },
//     { label: 'Mature2_Seq', value: 'UCACCGGGAGAAAAACUGGAGU' },
//     { label: 'Link to miRBase', value: 'https://mirbase.org/hairpin/MI0000009' }
//   ])

// var tableData = ref([])
const col_width = '200px'
const labelColor = "lightblue" // 设置第一列的背景颜色

const mi_label = ['Accession', 'ID', 'Sequence', 'Mature1_Acc', 'Mature1_ID', 'Mature1_Seq', 'Mature2_Acc', 'Mature2_ID', 'Mature2_Seq', 'Link to miRBase']
// const data = ['MI0000009', 'MI0000009', 'cel-mir-38', 'GUGAGCCAGGUCCUGUUCCGGUUUUUUCCGUGGUGAUAACGCAUCCAAAAGUCUCUAUCACCGGGAGAAAAACUGGAGUAGGACCUGUGACUCAU', 'MIMAT0020305', 'cel-miR-38-5p', 'UCCGGUUUUUUCCGUGGUGAUA', 'MIMAT0000009', 'cel-miR-38-3p', 'UCACCGGGAGAAAAACUGGAGU', 'https://mirbase.org/hairpin/MI0000009']

const di_label = ['ID', 'Disease Name', 'MeSH Scope Note', 'Link to MeSH']
const di_link = "https://meshb.nlm.nih.gov/record/ui?ui="
const mi_link = "https://mirbase.org/hairpin/"

watch([type, id], (newValue, oldValue) => {
    if(newValue[0] == 'M') {
      tableData.value = []
      for(var i = 0; i < mi_info.length; i ++) {
        if(mi_info[i].Accession == newValue[1]) {
          // console.log("--------")
          for(var j = 0; j < mi_label.length; j ++) {
            tableData.value[j] = {label:mi_label[j], value:''}
            tableData.value[j].value = mi_info[i][mi_label[j]]
          }
          tableData.value[mi_label.length-1].value = mi_link+tableData.value[0].value
          break ;
        }
      }
    } else {
      tableData.value = []
      for(var i = 0; i < d_info.length; i ++) {
        // console.log("mi_info[i].ID"+mi_info[i].Accession)
        // console.log("user.id.value"+newValue[1])
        if(d_info[i].ID == newValue[1]) {
          // console.log("--------")
          for(var j = 0; j < di_label.length; j ++) {
            // console.log("new_data"+ JSON.stringify(new_data[j]))
            tableData.value[j] = {label:di_label[j], value:''}
            tableData.value[j].value = d_info[i][di_label[j]]
          }
          tableData.value[di_label.length-1].value = di_link+tableData.value[0].value
          break ;
        }
      }
    }
    
  });

const computedTableData = computed(() => {
  console.log("computed")
  return tableData.value;
});

function isLink(content) {
  return /^https?:\/\//.test(content);
}

onMounted(()=>{
  
  
})
</script>

<style scoped>
.table-container {
  max-height: 250px; /* 设置表格容器的最大高度 */
  overflow-y: auto; /* 垂直方向滚动 */
}
.first-column {
  background-color: rgb(238, 239, 240);
  padding-left: 20px;
}
</style>