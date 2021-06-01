<template>
  <div>
    <loading :show="loading"></loading>
    <el-row :gutter="20" class="row-flex" v-show="!loading">
      <el-col
        v-for="(item, index) in videoList"
        :key="item + index"
        class="five-eq"
      >
        <music-card :list="item"></music-card>
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
import MusicCard from "../common/card/MusicCard";
import { MUSICLIST } from "../common/card/MusicClass";
import Loading from "../common/loading/Loading.vue";

export default {
  name: "searchByVideo",
  components: { MusicCard, Loading },
  data() {
    return {
      searchData: decodeURIComponent(this.$route.params.data),
      //当前的搜索条件
      queryInfo: {
        keywords: this.$route.params.data,
        limit: 30,
        offset: 0,
        type: 1014,
      },
      //查询结果总数
      videoTotal: 0,
      //歌曲数的结果集
      videoList: [],
      // 加载动画
      loading: false,
    };
  },

  created() {
    this.getVideoResult();
  },

  methods: {
    //查询搜索的视频结果集
    getVideoResult() {
      this.loading = true;
      this.$http.get("/search", { params: this.queryInfo }).then((res) => {
        let temarr = [];
        for (const item of res.data.result.videos) {
          let linkurl = "";
          if (item.vid.match(/\D/) != null) {
            linkurl = "/videoPlay/" + item.vid;
          } else {
            linkurl = "/mvPlay/" + item.vid;
          }
          let tem = new MUSICLIST(
            item.coverUrl,
            item.title,
            item.playTime,
            linkurl
          );
          temarr.push(tem);
        }
        this.videoList = temarr;
        this.videoTotal = res.data.result.videoCount;
        this.loading = false;
      });
    },
    //跳转视频播放页
    toVideoPage(id) {
      if (id.match(/\D/) != null) {
        this.$router.push("/videoPlay/" + id);
      } else {
        this.$router.push("/mvPlay/" + id);
      }
    },
    //分页插件页数改变
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
