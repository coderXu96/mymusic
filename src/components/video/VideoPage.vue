<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="active"
        class="header_menu"
        :router="true"
        mode="horizontal"
      >
        <el-menu-item index="/videoList">视频</el-menu-item>
        <el-menu-item index="/mvList">MV</el-menu-item>
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

</style>
