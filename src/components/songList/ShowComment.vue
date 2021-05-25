<template>
  <div>
    <el-backtop :bottom="80" :visibility-height="400"> </el-backtop>
    <!-- 评论信息 -->
    <loading :show='loading'></loading>

    <comment-list
      :hottest="hotCommentList"
      :newest="commentList"
      :total="total"
      :offset="queryInfo.offset"
      v-show="!loading"
    ></comment-list>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="queryInfo.limit"
      :total="total"
      @current-change="handleCurrentChange"
      v-show="!loading"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入 networks
import { getCommentList } from "@/networks/networks.js";

// 引入 mixin
import { mixComment } from "../common/mixin/mixin.js";

// 引入 评论组件
import CommentList from "../common/comment/CommentList.vue";

import Loading from "../common/loading/Loading.vue";

export default {
  name: "ShowComment",
  mixins: [mixComment],
  components: {
    CommentList,
    Loading
  },
  data() {
    return {};
  },
  methods: {
    // 查询评论
    get_Comment() {
      this.loading = true
      getCommentList(this.queryInfo).then((res) => {
        console.log(this.queryInfo);
        this.commentList = res.data.comments;
        this.hotCommentList = res.data.hotComments;
        this.total = res.data.total;
        this.loading = false
        this.cur_page = 1;
      });
    },
  },
};
</script>
<style lang='less' scoped>
</style>