<template>
  <div class="block">
    <tables :tableData="testData" :device="device" :state="state_table"></tables>
  </div>
</template>

<script>
  import {testData, device} from "../config/global.config"
  import ResizeMixin from "../utils/ResizeHandler.js" 
  export default {
    data() {
      return {
        testData,
        device
      }
    },
    mixins: [ResizeMixin],
    computed: {
      state_table () {
        return {
          upload: false,
          add: false,
          search: true,
          state: false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>