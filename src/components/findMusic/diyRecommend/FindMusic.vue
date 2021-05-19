<template>
  <el-container>
    <el-header>
      <el-menu :default-active="active" :router="true" mode="horizontal">
        <el-menu-item index="/diyRecommend">个性推荐</el-menu-item>
        <el-menu-item index="/musicListPage">歌单</el-menu-item>
        <el-menu-item index="/musicRank">排行榜</el-menu-item>
        <el-menu-item index="/singerList">歌手</el-menu-item>
        <el-menu-item index="/newMusicList">最新音乐</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <keep-alive>
        <router-view
          ref="child"
          @setParentMusicUrl="setParentMusicUrl"
          @setSongListInfo="setSongListInfo"
        ></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //将当前路由的路径设为选中值
      active: this.$route.path,
    };
  },
  methods: {
    //调用父组价设置音乐url
    setParentMusicUrl(url, detail) {
      console.log(url);
      this.$emit("setMusicUrl", url, detail);
    },
    //调用父组件设置歌单信息, 跟当前曲目
    setSongListInfo(playlist, musicId) {
      this.$emit("setSongListInfo", playlist, musicId);
    },
  },
};
</script>

<style lang="less" scoped>
@themecolor: #E60026;
.el-menu.el-menu--horizontal {
  border-bottom: 0; //去除底部细线
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
}
.el-main {
  margin-top: 30px;
}
</style>
