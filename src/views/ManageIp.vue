<template>
  <div class="block">
    <tables :tableData="ipData" :device="device" :state="state_table"></tables>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import {ipData, device} from "../config/global.config"
  import ResizeMixin from "../utils/ResizeHandler.js" 
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
        ipData,
        rules: {
          name: [
            {required: true, message: '请输入机器名称', trigger: 'blur'}
          ],
          ip: [
            {required: true, validator: validateIp, trigger: 'blur'}
          ]
        },
        device,
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
      }
    },
    mixins: [ResizeMixin],
    computed: {
      state_table () {
        return {
          rules: this.rules,  // 新增约束
          upload: true,       // 上传
          add: true,          // 增加
          search: true,       // 搜索
          state: true         // 状态tag
        }
      }
    },
    mounted(){
      this.total = this.ipData.length
    },
    methods: {
      getList() {
        console.log(1);
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>