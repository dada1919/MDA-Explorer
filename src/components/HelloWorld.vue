<script setup></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-header>
          <div class="header-content">
            <span>MDA-EXPLOER</span>
            <div class="right-align">
              <el-input placeholder="搜索..."></el-input>
            </div>
          </div>
        </el-header>
        <el-main
          ><el-container
            ><div class="element-with-border1">这是一个有边框的元素</div>
            <div class="element-with-border2">这是一个有边框的元素</div></el-container
          >

          <el-container
            ><div class="element-with-border3">这是一个有边框的元素</div>
            <div class="element-with-border4">这是一个有边框的元素</div></el-container
          >
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
