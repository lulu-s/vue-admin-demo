<template>
  <div class="navbar">
    <avatar class="avatar" :title="title" :user="user"></avatar>
    <hamburger id="hamburger-container" :opened="state.opened" class="hamburger-container"></hamburger>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> 
  </div>
</template>

<script>
export default {
    props: ["state", "user", "title"]
}
</script>

<style lang="scss" scoped>
    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
    // .breadcrumb-container {
    //     float: left;
    // }
    .breadcrumb-container {
      float: left;
    }
    .avatar {
      float: right;
    }
</style>