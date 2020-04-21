<template>
    <div class="demo-type"  @click="toggleClick">  
        <el-dropdown trigger="click">
            <el-avatar :src="user" size="small" shape="circle"></el-avatar>
            <el-dropdown-menu slot="dropdown">
            <router-link to="/Dashboard">
                <el-dropdown-item>Dashboard</el-dropdown-item>
            </router-link>
            <a target="_blank" :href="title.href">
                <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" :href="title.href">
                <el-dropdown-item>Emerge</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">Log Out</span>
            </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { removeToken } from "../utils/auth.js"
export default {
    props: ["user", "title"],
    methods: {
        toggleClick(){
        },
        logout() {
            // await this.$store.dispatch('logo')
            removeToken();
            this.$router.push(`/Login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style >
    .demo-type {
        float: right;
        padding: 5px 15px 5px 0;
        cursor: pointer;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    /* 点击头像去掉蓝框 */
    .el-avatar {
        outline: none;
    }
    /* 修改弹出菜单和头像的距离 */
    .el-popper[x-placement^=bottom] {
        margin-top: -5px !important;
    }
</style>