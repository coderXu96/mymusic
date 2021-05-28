<template>
  <div>
    <el-container>
      <el-main>
        <keep-alive exclude="musicDetail">
          <router-view></router-view>
        </keep-alive>
      </el-main>

      <!-- 尾部 -->
      <el-footer height="70px" class="footer">
        <music-footer></music-footer>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import MusicFooter from "./MusicFooter.vue";
export default {
  name: "conten",
  components: { MusicFooter },
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.footer {
  width: 100%;
  //定位在底部
  position: fixed;
  border-top: 1px solid rgb(219, 219, 219);
  left: 0;
  bottom: 0;
  z-index: 999;
  background: rgb(255, 255, 255);
}
</style>