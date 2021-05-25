<template>
  <div class="loading" v-show="show"><i class="el-icon-loading"></i>{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在加载中,请稍后",
    },
    show:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
.loading {
  text-align: center;
  margin: 20px 0px;
}
.el-icon-loading {
  font-size: 1.2rem;
}
</style>