<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="active"
        class="header_menu"
        :router="true"
        mode="horizontal"
      >
        <el-menu-item index="/diyRecommend">个性推荐</el-menu-item>
        <el-menu-item index="/musicList">歌单</el-menu-item>
        <el-menu-item index="/musicRank">排行榜</el-menu-item>
        <el-menu-item index="/singerList">歌手</el-menu-item>
        <el-menu-item index="/newMusicList">最新音乐</el-menu-item>
      </el-menu>
    </el-header>

    <!-- 中间主体 -->
    <el-main class="main">
      <keep-alive exclude="ShowMusicList">
        <router-view ref="child"></router-view>
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
  watch:{
    $route(to){
      this.active = to.path
    }
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
@themecolor: #e60026;

/deep/.el-menu-item-group__title {
  padding: 0px;
}

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

.aside_menu {
  border-bottom: 0;
  .el-menu-item {
    font-size: 1.1rem;
  }
  .is-active {
    font-weight: 900;
    color: black;
  }
}

// 上边有60px
.main {
  padding: 10px;
  padding-top:40px;
}

.el-header {
  position: fixed;
  top: 60px;
  left: 210px;
  width: 100%;
  z-index: 999;
  padding: 0px;
}

.el-aside {
  position: fixed;
  top: 60px;
  left: 0px;
  width: 210px !important;
  z-index: 888;
  .el-menu {
    min-height: calc(100vh); //设置最小高度撑满侧边栏
  }
}
</style>
