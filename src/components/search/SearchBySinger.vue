<template>
  <div class="singerlist">
    <el-row
      v-for="(item, index) in singerList"
      :key="item.index"
      :style="index % 2 === 0 ? 'background: rgb(245,245,247)' : ''"
    >
      <el-col :span="24" @click.native="toSingerPage(item.id)">
        <el-image :src="item.picUrl"></el-image>
        <span>{{ item.name }}</span>
      </el-col>
    </el-row>

    <!--分页-->
    <el-pagination
      style="display: block; width: 20%; margin: 15px auto"
      layout="prev, pager, next"
      background
      :page-size="queryInfo.limit"
      :total="singerTotal"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'searchBySinger',
  data() {
    return {
      searchData: decodeURIComponent(this.$route.params.data),
      //当前的搜索条件
      queryInfo: {
        keywords: this.$route.params.data,
        limit: 30,
        offset: 0,
        type: 100,
      },
      //查询结果总数
      singerTotal: 0,
      // 歌手
      singerList: [],
    };
  },
  created() {
    this.getSingerResult();
  },
  methods: {
    //查询搜索的歌手结果集
    getSingerResult() {
      this.$http.get("/search", { params: this.queryInfo }).then((res) => {
        this.singerList = res.data.result.artists;
        this.singerTotal = res.data.result.artistCount;
      });
    },
    //跳转歌手页
    toSingerPage(id) {
      this.$router.push("/singer/" + id);
    },
    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      if (this.queryInfo.offset >= this.songTotal)
        this.queryInfo.offset = this.songTotal;
      this.getSingerResult();
    },
  },
};
</script>

<style lang="less" scoped>
.singerlist {
  margin-bottom: 75px;
  .el-row {
    padding: 10px 0px;
    .el-col {
      display: flex;
      align-items: center;
      span{
        margin-left: 10px;
      }
    }
  }
  .el-image {
    height: 60px;
    width: 60px;
    border-radius: 5px;
  }
}
.el-row:hover {
  background-color: rgb(235, 236, 237) !important;
  cursor: pointer;
}
</style>
