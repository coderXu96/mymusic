<template>
  <div>
    <loading :show="loading"></loading>
    <music-info
      :list="songList"
      :pnum="queryInfo.offset"
      v-show="!loading"
    ></music-info>

    <!--分页-->
    <el-pagination
      v-show="!loading"
      background
      layout="prev, pager, next"
      :page-size="queryInfo.limit"
      :total="songTotal"
      :current-page.sync="cur_page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入axios
import { getSearchResult } from "@/networks/networks.js";

import MusicInfo from "../common/music/MusicInfo.vue";
import Loading from "../common/loading/Loading.vue";

export default {
  name: 'searchBySong',
  components: { MusicInfo, Loading },
  data() {
    return {
      //当前的搜索条件
      queryInfo: {
        keywords: decodeURIComponent(this.$route.params.data),
        limit: 100,
        offset: 0,
        type: 1,
      },
      // 查询结果总数
      songTotal: 0,
      // 歌曲数的结果集
      songList: [],
      // 用来显示加载数据,默认不显示
      loading: false,
      // 分页器当前页码
      cur_page: 1,
    };
  },

  // 监听搜索变化
  watch:{
    "$store.state.search"(newVal){
      this.queryInfo.keywords = newVal
      this.get_search_result();
      this.cur_page = 1
    }
  },

  created() {
    //获取搜索结果集
    this.get_search_result();
  },

  methods: {
    get_search_result() {
      this.loading = true;
      getSearchResult(this.queryInfo).then((res) => {
        this.songList = res.data.result.songs;
        this.songTotal = res.data.result.songCount;

        //处理时长dt
        this.songList.forEach((item) => {
          var time = item.duration / 1000;
          //分钟
          var minute = time / 60;
          var minutes = parseInt(minute);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          //秒
          var second = time % 60;
          var seconds = Math.round(second);
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          item.duration = `${minutes}:${seconds}`;
          this.loading = false;
        });
      });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      if (this.queryInfo.offset >= this.songTotal)
        this.queryInfo.offset = this.songTotal;
      this.get_search_result();
    },

    //跳转歌手
    toSingerPage(id) {
      this.$router.push("/singer/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
.toolicon {
  font-size: 1.1rem;
  margin-left: 5px;
}
</style>
