<template>
  <el-row :gutter="30">
    <el-col :span="12" :offset="4">
      <div class="title" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>MV详情
      </div>
      
      <!-- 视频播放和相关信息 -->
      <video-info :item="mvDetailInfo" :url="mvUrl"></video-info>

      <loading :show="loading"></loading>
      <div>
        <comment-list
          :hottest="hotCommentList"
          :newest="commentList"
          :total="total"
          :offset="queryInfo.offset"
          v-show="!loading"
        ></comment-list>
      </div>

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
    </el-col>

    <!--右侧mv详细信息-->
    <el-col :span="6">
      <div class="title">相关推荐</div>

      <!--可点击的视频推荐区域-->
      <el-row v-for="(item, index) in simiMvList" :key="index">
        <el-col :span="24">
          <relevant-card :item="item"></relevant-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {
  getMvUrl,
  getMvDetailInfo,
  getMvCommentList,
  getSimiMvs,
} from "@/networks/networks.js";

import CommentList from "../common/comment/CommentList.vue";
import { mixComment } from "../common/mixin/mixin.js";
import Loading from "../common/loading/Loading.vue";
import RelevantCard from "../common/card/RelevantCard.vue";
import VideoInfo from "./components/VideoInfo.vue";

export default {
  mixins: [mixComment],
  components: { CommentList, Loading, RelevantCard, VideoInfo },
  name: "mvPlay",
  data() {
    return {
      // 当前mv的id
      curMvId: this.$route.params.id,
      // 当前mv的详细数据
      mvDetailInfo: {},
      // 当前mv的url
      mvUrl: "",
      // 与当前mv相关的mv
      simiMvList: [],
    };
  },

  watch: {
    "$route.params.id"(newval) {
      this.curMvId = newval;
      this.queryInfo.id = newval;
      this.cur_page = 1;
      // 获取当前mv的详细数据
      this.get_mvdetail_info();
      // 获取当前mv的url
      this.get_mvurl();
      // 获取相关mv
      this.get_simimvs();
      // 获取评论
      this.get_Comment();
    },
  },

  created() {
    // 获取当前mv的详细数据
    this.get_mvdetail_info();
    // 获取当前mv的url
    this.get_mvurl();
    // 获取相关mv
    this.get_simimvs();
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    //获取当前mv的详细数据
    get_mvdetail_info() {
      getMvDetailInfo(this.curMvId).then((res) => {
        this.mvDetailInfo = res.data.data;
      });
    },

    //获取当前mv的url
    get_mvurl() {
      getMvUrl(this.curMvId).then((res) => {
        this.mvUrl = res.data.data.url;
      });
    },

    //获取当前mv的评论数据
    get_Comment() {
      this.loading = true;
      getMvCommentList(this.queryInfo).then((res) => {
        this.commentList = res.data.comments;
        this.hotCommentList = res.data.hotComments;
        this.total = res.data.total;
        this.loading = false;
        this.cur_page = 1;
      });
    },

    //获取相关的mv
    get_simimvs() {
      getSimiMvs(this.curMvId).then((res) => {
        this.simiMvList = res.data.mvs;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 1.2rem;
  margin: 10px 0px;
  cursor: pointer;
}
.el-collapse {
  border: none;
  width: 100%;
  margin: 10px 0px;
}
/deep/.el-collapse-item__header {
  font-size: 1.4rem;
  line-height: 30px;
  border: none;
}
</style>
