<template>
  <div>
    <!-- v-waves -->
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="search" placeholder="输入关键字搜索"></el-input>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Ip" prop="ip"></el-table-column>
      <el-table-column
        label="State"
        prop="state">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state ? 'success' : 'info' ">
            {{ scope.row.state ? "上线" : "闲置" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            v-if="!scope.row.state"
            type="success"
            @click="handleModifyState(scope.$index, true)">上线</el-button>
          <el-button
            size="mini"
            v-if="scope.row.state"
            @click="handleModifyState(scope.$index, false)">闲置</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Create" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="form">
        <el-form-item label="name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ip" prop="ip" :label-width="formLabelWidth">
            <el-input v-model="form.ip" autocomplete="off"></el-input>
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
  import {tableData} from "../config/global.config"
  import {parseTime} from "../utils"
  export default {
    data() {
      var validateIp = (rule, value, callback) => {
        var pattern = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
        if ( !pattern.test(value) ) {
          return callback(new Error('请输入正确的 ip 地址'));
        } else {
          return callback();
        }
      };
      return {
        tableData,
        search: '',
        downloadLoading: false,
        dialogFormVisible: false,
        rules: {
          name: [
            {required: true, message: '请输入机器名称', trigger: 'blur'}
          ],
          ip: [
            {required: true, validator: validateIp, trigger: 'blur'}
          ]
        },
        form: {
          name: '',
          ip: '',
          state: false
        },
        formLabelWidth: '120px'
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
          const tHeader = ['name', 'ip', 'state']
          const filterVal = ['name', 'ip', 'state']
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
      handleModifyState(index, state) {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        this.tableData[index].state = state;
      },
      handleCreate() {
        this.resetTemp()
        this.dialogFormVisible = true
      },
      resetTemp(){
        this.form = {
          name: '',
          ip: '',
          state: false
        }
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
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

<style scoped>
  .filter-container {
    margin: 10px 0;
  }
  .filter-container > * {
    margin-left: 10px;
  }
</style>