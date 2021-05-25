<template>
  <el-container :key="this.$route.params.data">

    <el-header>
      <el-menu
        :default-active="active"
        :router="true"
        mode="horizontal"
        class="header_menu"
      >
        <el-menu-item :index="/searchBySong/ + `${this.$route.params.data}`">
          单曲
        </el-menu-item>
        <el-menu-item :index="/searchBySinger/ + `${this.$route.params.data}`">
          歌手
        </el-menu-item>
        <el-menu-item :index="/searchByVideo/ + `${this.$route.params.data}`">
          视频
        </el-menu-item>
        <el-menu-item
          :index="/searchByPlayList/ + `${this.$route.params.data}`"
        >
          歌单
        </el-menu-item>
        <el-menu-item>歌词</el-menu-item>
        <el-menu-item>主播电台</el-menu-item>
        <el-menu-item>用户</el-menu-item>
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
  data() {
    return {
      //将当前路由的路径设为选中值,有中文的话需要解码
      active: decodeURIComponent(this.$route.path),
      //当前搜索的字幕
      searchData: decodeURIComponent(this.$route.params.data),
    };
  },
  created() {
    this.toSingSearchPage();
  },

  //decodeURIComponent参数解码
  methods: {
    toSingSearchPage() {
      this.searchData = this.$route.params.data;
      //如果为自跳转则执行
      this.$router.push(
        "/searchBySong/" + decodeURIComponent(this.$route.params.data)
      );
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
