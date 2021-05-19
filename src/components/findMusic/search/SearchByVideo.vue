<template>
  <div style="margin-bottom: 55px">
    <el-row v-show="toggle == 1" type="flex" justify="center">
      <i class="el-icon-loading" style="font-size: 20px"></i>数据加载中
    </el-row>
    <music-card :musiclist="videoList" v-show="toggle == 2"></music-card>
    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="queryInfo.limit"
      :total="videoTotal"
      v-show="toggle == 2"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import MusicCard from "../../common/card/MusicCard.vue";
import { MUSICLIST } from "../../common/card/MusicClass";

export default {
  components: { MusicCard },
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
      toggle: 2,
    };
  },

  created() {
    this.getVideoResult();
  },
  methods: {
    //查询搜索的视频结果集
    getVideoResult() {
      this.toggle = 1
      this.$http.get("/search", { params: this.queryInfo }).then((res) => {
        let temarr = [];
        for (const item of res.data.result.videos) {
          let linkurl = "";
          if (item.vid.match(/\D/) != null) {
            linkurl = "/videoPlay/" + item.vid;
          } else {
            linkurl = "/toVideoPage/" + item.vid;
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
        this.toggle = 2
      });
    },
    //跳转视频播放页
    toVideoPage(id) {
      if (id.match(/\D/) != null) {
        this.$router.push("/videoPlay/" + id);
      } else {
        this.$router.push("/toVideoPage/" + id);
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
