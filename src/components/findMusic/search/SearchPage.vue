<template>
  <el-container :key="this.$route.params.data">
    <el-header>
      <el-menu
        :default-active="/searchBySong/ + `${this.$route.params.data}`"
        :router="true"
        mode="horizontal"
      >
        <el-menu-item
          :index="/searchBySong/ + `${this.$route.params.data}`"
          ref="songClick"
          >单曲</el-menu-item
        >
        <el-menu-item :index="/searchBySinger/ + `${this.$route.params.data}`"
          >歌手</el-menu-item
        >
        <el-menu-item>专辑</el-menu-item>
        <el-menu-item :index="/searchByVideo/ + `${this.$route.params.data}`"
          >视频</el-menu-item
        >
        <el-menu-item :index="/searchByPlayList/ + `${this.$route.params.data}`"
          >歌单</el-menu-item
        >
        <el-menu-item>歌词</el-menu-item>
        <el-menu-item>主播电台</el-menu-item>
        <el-menu-item>用户</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <router-view ref="child" @setMusicUrl="setMusicUrl"></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
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
    //调用父类方法
    setMusicUrl(url, detail) {
      this.$emit("setMusicUrl", url, detail);
    },
  },
};
</script>

<style lang="less" scoped>
@themecolor: #E60026;
.el-menu.el-menu--horizontal {
  border-bottom: 0; //去除底部细线
  .el-menu-item {
    font-size: 0.9rem;
  }
  .is-active {
    font-weight: 900;
    color: black;
    border-bottom: 0;
  }
}
.el-header {
  position: fixed;
  top: 60px;
  left: 210px;
  width: 100%;
  z-index: 999;
}
</style>
