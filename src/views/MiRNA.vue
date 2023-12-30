<template>
  <div>
    
  

    <el-descriptions
    direction="horizontal"
    :column="1"
   
    border
  >
    <el-descriptions-item class="miRNA-label" label="miRNA ID:">MI0000009</el-descriptions-item>
    <el-descriptions-item class="miRNA-label" label="Accession:">MI0000009</el-descriptions-item>
    <el-descriptions-item class="miRNA-label" label="ID: " :span="2">cel-mir-38</el-descriptions-item>
    <el-descriptions-item label="Sequence:">GUGAGCCAGGUCCUGUUCCGGUUUUUUCCGUGGUGAUAACGCAUCCAAAAGUCUCUAUCACCGGGAGAAAAACUGGAGUAGGACCUGUGACUCAU</el-descriptions-item>
    <el-descriptions-item label="Mature1_Acc: ">MIMAT0020305</el-descriptions-item>
    <el-descriptions-item label="Mature1_ID: ">cel-miR-38-5p</el-descriptions-item>
    <el-descriptions-item label="Mature1_Seq:">UCCGGUUUUUUCCGUGGUGAUA</el-descriptions-item>
    <el-descriptions-item label="Mature2_Acc:">MIMAT0000009</el-descriptions-item>
    <el-descriptions-item label="Mature2_ID:">cel-miR-38-3p</el-descriptions-item>
    <el-descriptions-item label="Mature2_Seq: ">UCACCGGGAGAAAAACUGGAGU</el-descriptions-item>


    <el-descriptions-item label="Link to miRBase:">
      <a href="https://mirbase.org/hairpin/MI0000009">https://mirbase.org/hairpin/MI0000009</a></el-descriptions-item>

   
  
  </el-descriptions>

</div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.el-descriptions {
  font-size: 10px;
  margin-top: 2px;
}
.miRNA-label {
  font-size: 4px;
}
</style>