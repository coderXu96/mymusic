<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="active"
        :router="true"
        mode="horizontal"
        class="header_menu"
      >
        <el-menu-item :index="searchBySong"> 单曲 </el-menu-item>
        <el-menu-item :index="searchBySinger"> 歌手 </el-menu-item>
        <el-menu-item :index="searchByAlbum">专辑 </el-menu-item>
        <el-menu-item :index="searchByVideo"> 视频 </el-menu-item>
        <el-menu-item :index="searchByPlayList"> 歌单 </el-menu-item>
        <!-- <el-menu-item>歌词</el-menu-item>
        <el-menu-item>主播电台</el-menu-item>
        <el-menu-item>用户</el-menu-item> -->
      </el-menu>
    </el-header>

    <el-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "searchPage",
  data() {
    return {
      //将当前路由的路径设为选中值,有中文的话需要解码
      active: decodeURIComponent(this.$route.path),
    };
  },
  computed: {
    searchBySong() {
      return "/searchBySong/" + decodeURIComponent(this.$route.params.data);
    },
    searchBySinger() {
      return "/searchBySinger/" + decodeURIComponent(this.$route.params.data);
    },
    searchByAlbum() {
      return "/searchByAlbum/" + decodeURIComponent(this.$route.params.data);
    },
    searchByVideo() {
      return "/searchByVideo/" + decodeURIComponent(this.$route.params.data);
    },
    searchByPlayList() {
      return "/searchByPlayList/" + decodeURIComponent(this.$route.params.data);
    },
  },
};
</script>

<style lang="less" scoped>
@themecolor: #e60026;
.header_menu {
  .el-menu-item {
    font-size: 1.1rem;
  }
  .is-active {
    font-weight: 900;
    color: black;
    border-bottom: 2px solid @themecolor !important;
  }
}
.el-header {
  position: fixed;
  top: 60px;
  left: 210px;
  width: 100%;
  z-index: 999;
  padding: 0px;
}
.el-main {
  padding: 0px;
  padding-top: 30px;
}
</style>
