<template>
  <div>
    

    <el-descriptions
    direction="horizontal"
    :column="1"
    :size="size"
    border
  >
    <el-descriptions-item label="Disease ID:">D000006</el-descriptions-item>
    <el-descriptions-item label="Disease Name: ">Abdomen, Acute</el-descriptions-item>
    <el-descriptions-item label="MeSH Scope Note:" :span="2">A clinical syndrome with acute abdominal pain that is severe, localized, and rapid in onset. Acute abdomen may be caused by a variety of disorders, injuries, or diseases.</el-descriptions-item>
    
    <el-descriptions-item label="Link to MeSH: ">
      <a href="https://meshb.nlm.nih.gov/record/ui?ui=D000006">https://meshb.nlm.nih.gov/record/ui?ui=D000006</a></el-descriptions-item>

   
  
  </el-descriptions>

</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const size = ref('')
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>