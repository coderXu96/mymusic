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

    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside>
        <el-menu :router="true" default-active="/findMusic" class="aside_menu">
          <el-menu-item-group>
            <el-menu-item index="/findMusic">发现音乐</el-menu-item>
            <el-menu-item index="">视频</el-menu-item>
            <el-menu-item index="">朋友</el-menu-item>
            <el-menu-item index="">直播</el-menu-item>
            <el-menu-item index="">私人FM</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">我的音乐</template>
            <el-menu-item index="">
              <i class="el-icon-headset"> 本地音乐</i>
            </el-menu-item>
            <el-menu-item index="">
              <i class="el-icon-download"> 下载管理</i>
            </el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">创建的歌单</template>
            <el-menu-item index="">
              <i class="el-icon-star-off"> 我喜欢的音乐</i>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <!-- 中间主体 -->
      <el-container>
        <el-main>
          <keep-alive exclude="ShowMusicList">
            <router-view ref="child"></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
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
.container {
  padding-top: 50px;
}

.el-main {
  padding: 0px;
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
