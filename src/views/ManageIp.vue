<template>
  <div>
    <!-- v-waves -->
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="search" placeholder="输入关键字搜索"></el-input>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="Date"
        prop="date">
      </el-table-column>
      <el-table-column
        label="Name"
        prop="name">
      </el-table-column>
      <el-table-column label="Action" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {tableData} from "../config/global.config"
  import {parseTime} from "../utils"
  export default {
    data() {
      return {
        tableData,
        search: '',
        downloadLoading: false
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        // https://element.eleme.cn/#/zh-CN/component/notification
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.tableData.splice(index, 1)
      },
      handleDownload() {
        this.downloadLoading = true
        import('../utils/Export2Excel').then(excel => {
          const tHeader = ['date', 'name']
          const filterVal = ['date', 'name']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal) {
        return this.tableData.map(v => filterVal.map(j => {
          if (j === 'Date') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
    },
  }
</script>

<style scoped>
  .filter-container {
    margin: 10px 0;
  }
  .filter-container > * {
    margin-left: 10px;
  }
</style>