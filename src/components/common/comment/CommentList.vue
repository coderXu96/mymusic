<template>
  <div>
    <h4 v-if="offset == 0 && hottest.length > 0">精彩评论</h4>
    <!--精彩评论的信息-->
    <div
      v-for="(item, index) in hottest"
      :key="item + index"
      class="commentlist"
    >
      <comment-item :item="item"></comment-item>
      <el-divider></el-divider>
    </div>

    <h4>最新评论({{ total }})</h4>
    <!--所有评论的信息-->
    <div v-for="(item, index) in newest" :key="index" class="commentlist">
      <comment-item :item="item"></comment-item>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import CommentItem from "../../common/comment/CommentItem.vue";
export default {
  components: {
    CommentItem,
  },

  props: {
    hottest: {
      type: Array,
      default: () => {
        return [];
      },
    },
    newest: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {};
  },
  
};
</script>
<style lang='less' scoped>
</style>