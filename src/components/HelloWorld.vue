
<script setup>

</script>

<template>
  
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main><el-container><div class="element-with-border1" >这是一个有边框的元素</div>
          <div class="element-with-border2">这是一个有边框的元素</div></el-container>
        
        <el-container><div class="element-with-border3" >这是一个有边框的元素</div>
          <div class="element-with-border4" >这是一个有边框的元素</div></el-container>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
  

 

</template>

<script>
import { ElButton, ElInput } from 'element-plus'
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  components: {
    ElButton,ElInput,
  //   'el-container': Container,
  //   'el-header': Header,
  //   'el-main': Main,
  },

};
</script>
<style>
.el-container {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 260px;
    width: 1200px;
  }

.element-with-border1 {
  border: 1px solid #090808;
  padding: 10px;
  width: 530px;
}
.element-with-border2 {
  border: 1px solid #090808;
  padding: 10px;
  width: 385px;
}
.element-with-border3 {
  border: 1px solid #090808;
  padding: 10px;
  width: 460px;
}
.element-with-border4 {
  border: 1px solid #090808;
  padding: 10px;
  width: 455px;
}
.el-header, .el-footer {
    background-color: #b9b3d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 1000px;
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 260px;
  }

  .el-main {
    background-color: #7a8793;
    color: rgb(32, 41, 28);
    text-align: center;
    line-height: 200px;
    height: 500px;
  }
  .el-container {
    background-color: #7a8793;
    color: rgb(32, 41, 28);
    text-align: center;
    line-height: 200px;
    width: 1000;
    
  }

  body > .el-container {
    margin-bottom: 80px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  
</style>