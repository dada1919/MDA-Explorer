<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="rank" label="Rank"></el-table-column>
      <el-table-column prop="score" label="Score"></el-table-column>
      <el-table-column prop="entity" label="Entity"></el-table-column>
      <el-table-column label="Action">
        <template #default="{row}">
          <el-button v-if="row.rank !== 3" type="primary">{{ row.action }}</el-button>
          <el-popover v-else trigger="hover" placement="top">
            <p>{{ row.action }}</p>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableData = ref([
      { rank: 1, score: 0.995, entity: 'Hepatomegaly', action: 'GO!' },
      { rank: 2, score: 0.971, entity: 'Liver Abscess', action: 'GO!' },
      { rank: 3, score: 0.868, entity: 'Peliosis Hepatis', action: '...' },
    ]);

    return {
      tableData,
    };
  },
};
</script>