<template>
  <div>
    <div class="filter-container" >
      <el-input v-if="state.search" style="width: 200px;" v-model="search" placeholder="输入关键字搜索"></el-input>
      <el-button v-if="state.add" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-if="device!=='mobile' && state.upload"  :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>
    
    <el-table
      border
      :data="filter_data"
      style="width: 100%">

      <el-table-column v-for="h in header" :key="h" :label="h">
        <template slot-scope="{row}">
          <template v-if="h !== 'state'">
            <template v-if="row.edit">
              <el-input v-model="row[h]" class="edit-input" size="small" />
            </template>
            <span v-else>{{ row[h] }}</span>
          </template>

          <!-- tag -->
          <template v-else>
            <!-- effect="dark" -->
            <el-tag :type="row.state ? 'success' : 'info' ">
              {{ row.state ? "上线" : "闲置" }}
            </el-tag>
          </template>
        </template>  
      </el-table-column>

      <el-table-column label="Action" >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            size="mini"
            type="success"
            @click="confirmEdit(scope.$index, scope.row)">OK</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            v-if="!scope.row.state && state.state"
            type="success"
            @click="handleModifyState(scope.$index, true)">上线</el-button>
          <el-button
            size="mini"
            v-if="scope.row.state && state.state"
            @click="handleModifyState(scope.$index, false)">闲置</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 弹出框 -->
    <el-dialog title="Create" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="state.rules" :model="form">

        <el-form-item  v-for="h in header" :key="h + '_header'" v-if="h != 'state'"  :label="h" :prop="h" :label-width="formLabelWidth">
            <el-input v-model="form[h]" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {parseTime} from "../utils"
  export default {
    props: ['tableData', 'device', 'state'],
    data() {
      return {
        search: '',
        downloadLoading: false,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px',
        header: [],
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    computed: {
      filter_data () {
        let {limit, page} = this.listQuery
        let data = this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()) || data.ip.toLowerCase().includes(this.search.toLowerCase()) )
        this.total = data.length
        return data.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      }
    },
    mounted(){
      this.getkey();
      this.total = this.tableData.length
      // this.getList(this.tableData);
    },
    methods: {
      getList() {
        let {limit, page} = this.listQuery
        this.list = this.tableData.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return this.list
      },
      initForm(){
        this.form = {}
      },
      getkey(){
        for( let key in this.tableData[0] ) {
          if(key == "edit") return;
          this.header.push(key);
        }
      },
      handleEdit(index, row) {
        this.tableData[index].edit = !this.tableData[index].edit;
      },
      confirmEdit(index, row) {
        row.edit = false
        this.tableData[index].name = row.name
        this.$message({
          message: 'The name has been edited',
          type: 'success'
        })
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
          const filterVal = this.header
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: this.header,
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
      handleModifyState(index, state) {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        this.tableData[index].state = state;
      },
      handleCreate() {
        this.initForm();
        this.dialogFormVisible = true
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$set(this.form, 'edit', false)
            this.tableData.unshift(this.form);
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .filter-container {
    margin: 10px 0;
  }
  .filter-container > * {
    margin-left: 10px;
  }

  .mobile {
    .el-button+.el-button {
        margin-top: 10px;
        margin-left: 0;
    }

    // .el-dialog {
    //   width: auto;
    // }

    .el-table .cell {
      word-break: normal;
    }
  }
</style>