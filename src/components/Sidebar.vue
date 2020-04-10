<template>
  <div>
    <div class="logo">
        <a target="_blank" :href="title.href" >
          <img :src="title.src">
          <h1>{{title.name}}</h1>
        </a>
    </div>
    <el-row>
      <el-col :span="12">
        
        <!-- unique-opened -->
        <el-menu
        unique-opened 
          :default-active="default_active"
          router
          :collapse="state.opened"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#304156"
          text-color="rgb(191, 203, 217)"
          active-text-color="#1890ff">

          <div v-for="item in menu" :key="item.id">
            <!-- 一级菜单 -->
            <el-menu-item v-show="!item.sub" :index="item.id">
                <i :class="item.icon"></i>
                <span slot="title" :style="{opacity: state.opened ? 0 : 1}">{{item.name}}</span>
            </el-menu-item>
            <!-- 包含二级菜单 -->
            <el-submenu v-show="item.sub" :index="item.id">
              <template class="el-submenu__title" slot="title">
                <i :class="item.icon"></i>
                <span :style="{opacity: state.opened ? 0 : 1}" class="el-submenu__title__name">{{item.name}}</span>
              </template>
              <el-menu-item v-for="sub in item.sub" :key="sub.id" :index="sub.id">
                <i :class="sub.icon"></i>
                {{sub.name}}
              </el-menu-item>
            </el-submenu>
          </div>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: ["menu", "title", "state"],
    data(){
      return {
        default_active: "Dashboard"
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      def_active(){
        let reg = /\//;
        this.default_active = window.location.pathname.replace(/\//, "")
        // console.log(this.default_active);
      }
    },
    created(){
      this.def_active();
    },
    watch: {
      $route(route){
        this.def_active();
      }
    }
  }
</script>


<style> 
  /* 设置总导航的宽度 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 100%;
  }
  /* 去掉导航右侧白条 */
  .el-menu {
    border-right: 0;
  }
  /* 修改导航hover样式 */
  .sidebar-container .el-submenu .el-menu-item:hover {
    background-color: #001528 !important;
  }
  /* 修改导航active的样式 */
  .is-active {
    color: rgb(64, 158, 255) !important;
    /* background-color: rgb(24, 144, 255) !important; */
  }
  .is-active .el-submenu__title__name,
  .is-active .el-submenu__title,
  .is-active .el-submenu__title > i {
      color: #f4f4f5 !important;
      transition: color 0.3s ease-in-out;
  }
  /* 修改导航每个区块的高度 */
  .el-submenu .el-menu-item {
    height: 56px !important;
    line-height: 56px !important;
  }

  /* logo */
  a,
  a:active {
      color: #fff;
      text-decoration: none;
  }

  .logo {
      position: relative;
      padding: 0 24px;
      overflow: hidden;
      /* background: #001529; */
      cursor: pointer;
      transition: all 0.3s;
  }
  .logo > a {
      display: flex;
      align-items: center;
      height: 64px;
  }
  .logo img {
      display: inline-block;
      height: auto;
      vertical-align: middle;
  }
  .logo h1 {
      display: inline-block;
      margin: 0 0 0 12px;
      color: white;
      font-weight: 600;
      font-size: 20px;
      vertical-align: middle;
      animation: fade-in;
      animation-duration: 0.3s;
  }

  /* 适配点击收缩导航栏后的样式 */
  .hideSidebar .logo {
    padding: 0 15px;
  }
  .hideSidebar .logo h1 {
      opacity: 0;
  }
  .hideSidebar .logo img {
      max-width: 30px;
  }
</style>