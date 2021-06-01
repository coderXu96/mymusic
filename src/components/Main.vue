<template>
  <el-container>
    <el-backtop :bottom="80" :visibility-height="400"> </el-backtop>
    <!-- 头部 -->
    <el-header class="header">
      <music-header></music-header>
    </el-header>

    <!-- 中间 -->
    <el-main class="main">
      <keep-alive exclude="mvPlay">
        <router-view ref="child"></router-view>
      </keep-alive>
    </el-main>

  </el-container>
</template>
<script>
import MusicFooter from './MusicFooter.vue';
import MusicHeader from "./MusicHeader.vue";

export default {
  components: {
    MusicHeader,
    MusicFooter,
  },
  data() {
    return {
      //播放音乐的链接
      musicUrl: "",
      searchData: "",
    };
  },
};
</script>

<style lang="less" scoped>
//头部高度为60px,底部高度为80px z-idnex为999
@themecolor: #e60026;

.header {
  background: @themecolor;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw; //不要使用100%,避免出现滚动条时页面晃动
  height: 60px;
  z-index: 999;
}

.main {
  margin: 60px 0px 70px 0px;
}

.el-menu {
  .el-menu-item {
    font-size: 18px;
  }
  .is-active {
    font-weight: 900;
    color: black;
  }
}
</style>



 




       