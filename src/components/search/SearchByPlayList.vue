<template>
  <div>
    <loading :show="loading"></loading>
    <div v-for="(item, index) in playList" :key="index" v-show="!loading">
      <div :class="{ backg: index % 2 != 0 }">
        <play-list :item="item" class="playlist"></play-list>
      </div>
    </div>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="queryInfo.limit"
      :total="playListTotal"
      :current-page.sync="cur_page"
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
import PlayList from "../common/table/PlayList.vue";

export default {
  name: "searchByPlayList",
  components: { PlayList, Loading },
  data() {
    return {
      // 显示加载动画
      loading: false,
      searchData: decodeURIComponent(this.$route.params.data),
      // 当前的搜索条件
      queryInfo: {
        keywords: this.$route.params.data,
        limit: 20,
        offset: 0,
        type: 1000,
      },
      // 查询结果总数
      playListTotal: 0,
      // 歌曲数的结果集
      playList: [],
      // 分页器当前页码
      cur_page: 1,
    };
  },

  // 监听搜索变化
  watch: {
    "$store.state.search"(newVal) {
      this.queryInfo.keywords = newVal;
      this.getPlayListResult();
      this.cur_page = 1
    },
  },

  created() {
    this.getPlayListResult();
  },

  methods: {
    // 查询搜索的歌手结果集
    getPlayListResult() {
      this.loading = true;
      getSearchResult(this.queryInfo).then((res) => {
        this.playList = res.data.result.playlists;
        this.playListTotal = res.data.result.playlistCount;
        this.loading = false;
      });
    },

    // 分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      if (this.queryInfo.offset >= this.songTotal)
        this.queryInfo.offset = this.songTotal;
      this.getPlayListResult();
    },
  },
};
</script>

<style lang="less" scoped>
.playlist {
  padding: 10px 0px;
}
.backg {
  background: #f9f9f9;
  border-radius: 5px;
}
</style>
