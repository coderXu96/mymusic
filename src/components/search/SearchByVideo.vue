<template>
  <div>
    <loading :show="loading"></loading>
    <el-row :gutter="20" class="row-flex" v-show="!loading">
      <el-col v-for="(item, index) in videoList" :key="item + index" :span="6">
        <mv-card :item="item"></mv-card>
      </el-col>
    </el-row>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="queryInfo.limit"
      :total="videoTotal"
      @current-change="handleCurrentChange"
      v-show="!loading"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入axios
import { getSearchResult } from "@/networks/networks";

import Loading from "../common/loading/Loading.vue";
import MvCard from "../common/card/MvCard.vue";

export default {
  name: "searchByVideo",
  components: { Loading, MvCard },
  data() {
    return {
      searchData: decodeURIComponent(this.$route.params.data),
      // 当前的搜索条件
      queryInfo: {
        keywords: this.$route.params.data,
        limit: 60,
        offset: 0,
        type: 1014,
      },
      // 查询结果总数
      videoTotal: 0,
      // 歌曲数的结果集
      videoList: [],
      // 加载动画
      loading: false,
    };
  },

  // 监听搜索变化
  watch: {
    "$store.state.search"(newVal) {
      this.queryInfo.keywords = newVal;
      this.getVideoResult();
    },
  },

  created() {
    this.getVideoResult();
  },

  methods: {
    // 查询搜索的视频结果集
    getVideoResult() {
      this.loading = true;
      getSearchResult(this.queryInfo).then((res) => {
        this.videoList = res.data.result.videos;
        this.videoTotal = res.data.result.videoCount;
        this.videoList.forEach((item) => {
          item.id = item.vid;
          item.playCount = item.playTime;
          item.duration = item.durationms;
          item.imgurl = item.coverUrl;
          item.name = item.title;
          item.userName = item.creator[0].userName;
          item.userId = item.creator[0].userId;
        });
        console.log(this.videoList);
        this.loading = false;
      });
    },

    // 分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      if (this.queryInfo.offset >= this.songTotal)
        this.queryInfo.offset = this.songTotal;
      this.getVideoResult();
    },
  },
};
</script>

<style lang="less" scoped>
[class*="el-col-"] {
  display: inline-block;
  float: none;
}

h1 {
  font-weight: 500;
}
</style>
