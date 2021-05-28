<template>
  <el-row type="flex" justify="space-between" align="middle">
    <!-- logo -->
    <el-col :span="5">
      <div @click="toIndex" class="logo">
        <el-image :src="logo_pic" class="logo_pic"> </el-image>
        V-Music
      </div>
      <el-button
        style="margin-left: 20px"
        icon="el-icon-back"
        size="mini"
        circle
        @click="$router.go(-1)"
      ></el-button>
      <el-button
        icon="el-icon-right"
        size="mini"
        circle
        @click="$router.go(1)"
      ></el-button>
    </el-col>

    <!-- 搜索 -->
    <el-col :span="12">
      <el-input
        clearable
        v-model="search"
        placeholder="搜索"
        suffix-icon="el-icon-search"
        @change="toSearchPage"
        @keyup.enter.native="toSearchPage"
      ></el-input>
    </el-col>

    <!-- 个人 -->
    <el-col :span="3">
      <el-image :src="user_pic" class="logo_pic"> </el-image>
      未登录
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      logo_pic: require("@/assets/images/logo_pic.png"),
      user_pic: require("@/assets/images/user_pic.png"),
    };
  },
  methods: {
    // 搜索
    toSearchPage() {
      this.search = this.search.replace(/(^\s*)|(\s*$)/g, "")
      if (this.search != "") {
        // 给 vuex 发送更改后的数据
        this.$store.commit('changeSearch',{search : this.search})
        this.$router.push(
          //encodeURIComponent参数转换 应对中文参数
          "/searchBySong/" + encodeURIComponent(this.search)
        );
      }
    },

    // 回到主页
    toIndex(){
      this.$router.push('/diyRecommend')
    }
  },
};
</script>
<style lang='less' scoped>
@themecolor: #e60026;
.logo{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.el-row {
  height: 100%; //一定要设置高度为100%,不然不会居中
  .el-col {
    //内部设定为弹性布局，然后居中
    display: flex;
    align-items: center;
    .logo_pic {
      height: 25px;
      width: 25px;
      margin-right: 8px;
    }
  }
}
</style>