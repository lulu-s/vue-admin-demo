<template>
  <div class="app-container">
    <div>
      <upload-excel class="upload-excel" :on-success="handleSuccess" :before-upload="beforeUpload" />   
    </div>
    
    <el-table :data="tableData" border highlight-current-row style="position:relative;width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    test(){
      console.log(this.tableData, this.tableHeader);
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      console.log(222);
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>


<style lang="scss">
  .upload-excel {
    margin-top: 10px;
  }

  .mobile {
    .drop {
      width: auto!important;
    }
  }

</style>