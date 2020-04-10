<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == breadlist.length - 1" class="no-redirect">{{ item.name }}</span>
        <a v-else @click.prevent="handleLink(item, index)" >{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  data() {
    return {
      breadlist: [],
      metaName: ""
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.breadListStateAdd(this.breadlist, { name: '仪表盘', path: '/Dashboard' })
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {

      let breadNumber = this.$route.meta.breadNum || 1;//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；
      var breadLength = this.breadlist.length;//目前breadlist集合数组个数
      var curName = this.$route.name;
      var curPath = this.$route.path;
      var newBread = {name: curName, path: curPath};
      var ishome = curName == '仪表盘';
      this.breadListStateRemove(this.breadlist, 1);

      if(breadNumber === 1){ // 点击一级菜单
          this.breadListStateRemove(this.breadlist, 1);
          if(!ishome)//如果不是首页
              this.breadListStateAdd(this.breadlist, newBread); // 当前页面添加到breadlist集合
      }
      else if(breadNumber === 2){
          // console.log(this.$route.meta);
          this.metaName = this.$route.meta.name || "";
          if(this.metaName){
            this.breadListStateAdd(this.breadlist, {name: this.metaName, redirect: "noRedirect", path: `/${this.metaName}`}); 
          }
          this.breadListStateAdd(this.breadlist, newBread); 
      }
      else{
          this.breadListStateRemove(this.breadlist, 1 ); // 如果往回点面包屑导航，截取；
      }

    },
    handleLink(item) {
      const { name, path } = item
      if (name) {
        this.$router.push(path)
        return
      }
    },
    breadListStateAdd(list, obj){
        list.push(obj);
    },
    breadListStateRemove(list, num){
      this.breadlist = this.breadlist.slice(0, num)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
