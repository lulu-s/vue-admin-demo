<template>
  <div class="block">
    <tables :tableData="userData" :device="device" :state="state_table"></tables>
  </div>
</template>

<script>
  import {userData, device} from "../config/global.config"
  import ResizeMixin from "../utils/ResizeHandler.js" 
  export default {
    data() {
      const validatePassword = (rule, value, callback) => {
        if(!value){
          callback(new Error('密码不能为空'))
        } else if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        userData,
        rules: {
          name: [
            {required: true, message: '请输入管理员名称', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ]
        },
        device
      }
    },
    mixins: [ResizeMixin],
    computed: {
      state_table () {
        return {
          rules: this.rules,
          upload: true,
          add: true,
          search: true,
          state: false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>