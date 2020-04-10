<template>
  <div class="app-wrapper" :class="{hideSidebar: state.opened, mobile: device==='mobile'}">
    <div v-if="device==='mobile'" v-show="!state.opened" class="drawer-bg" @click="handleClickOutside" ></div>
    <el-aside>
      <sidebar class="sidebar-container" :menu="menu" :title="title" :state="state"></sidebar>
    </el-aside>
    
    <el-container>
      <el-header>
        <navbar :state="state" :user="user" :title="title"></navbar>
      </el-header>
      <!-- <el-footer>Footer</el-footer> -->
      <el-main>
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getToken } from "../utils/auth.js"
import {title, menu, state, user, device} from '../config/global.config'
import ResizeMixin from "../utils/ResizeHandler.js" 
export default {
    data(){
      return {
        title,
        menu,
        state,
        user,
        device
      }
    },
    mixins: [ResizeMixin],
    watch: {
      device(){
        window.data.device = this.device
      }
    },
    created(){
      // console.log(getToken());
      if(!getToken()){
        this.$router.push( '/Login' )
      }
    },
    mounted(){
      if(this.device == "mobile"){
        this.state.opened = true;
      }
    },
    methods: {
      handleClickOutside(){
        this.state.opened = !this.state.opened
      }
    }
}
</script>


<style lang="scss" scoped>
  $sideBarWidth: 240px;
  .app-wrapper {
    /* @include clearfix; */
    position: relative;
    height: 100%;
    width: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-header {
    height: 50px!important;
    padding: 0!important;
    background:#fff;
    z-index: 1;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  } 
  .el-aside {
    background-color: #D3DCE6;
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 240px !important;
    /* #001529;  #1890ff */
    background-color: #304156; 
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  
  .el-main {
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 0 !important;
    background-color: rgb(240, 242, 245);
    /* background: #ccc; */
    /* padding: 32px; */
  }
  
  .el-container {
    min-height: 100%;
    -webkit-transition: margin-left .28s;
    transition: margin-left .28s;
    margin-left: 240px;
    position: relative;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
    min-height: 100%;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /* 适配点击收缩导航栏后的样式 */
  .hideSidebar .el-aside {
      width: 60px !important;
  }
  .hideSidebar .el-container {
      margin-left: 60px;
  }


// mobile responsive
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  .el-container {
    margin-left: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
    .el-aside {
      width: 0 !important;
    }
    .el-container {
      margin-left: 0;
    }
  }

}


.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
  
</style>