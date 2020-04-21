<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <el-row >
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart :chart-data="RaddarChart"  />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart :chart-data="BarChart"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken } from "../utils/auth.js"
import { dashboard } from "../config/global.config"
export default {
  props: ["state"],
  data() {
    return {
      lineChartData: dashboard.lineChartData.newVisitis,
      pieChartData: dashboard.pieChartData,
      RaddarChart: dashboard.RaddarChart,
      BarChart: dashboard.BarChart
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = dashboard.lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
@media (max-width: 550px){
  .card-panel-icon-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0!important;
  }

}

</style>