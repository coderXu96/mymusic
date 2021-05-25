<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside class="aside">
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
            <i class="el-icon-headset"></i>本地音乐
          </el-menu-item>
          <el-menu-item index="">
            <i class="el-icon-download"></i>下载管理
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">创建的歌单</template>
          <el-menu-item index="">
            <i class="el-icon-star-off"></i>我喜欢的音乐
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>

    <!-- 中间主体 -->
    <el-container class="center">
      <el-main>
        <keep-alive>
          <router-view ref="child"></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
@themecolor: #e60026;

/deep/.el-menu-item-group__title {
  padding: 0px;
}

/deep/.el-menu-item i {
  color: #000;
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

// 侧边栏
.aside {
  position: fixed;
  top: 60px;
  left: 0px;
  bottom: 70px;
  width: 210px !important;
  z-index: 888;
  .el-menu {
    min-height: calc(100vh); //设置最小高度撑满侧边栏
  }
}

// 右边主体
.center {
  margin-left: 210px;
  width: 100%;
  .el-menu {
    min-height: calc(100vh); //设置最小高度撑满侧边栏
  }
}
</style>
