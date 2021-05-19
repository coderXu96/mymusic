<template>
  <div>
    <div v-show="toggle == 1" style="margin-top: 30px; text-align: center">
      <i class="el-icon-loading" style="font-size: 20px"></i>数据加载中
    </div>
    <el-table
      :data="songList"
      stripe
      v-show="toggle == 2"
      @row-dblclick="playMusic"
    >
      <el-table-column
        label="音乐标题"
        prop="name"
        min-width="30%"
        style="cursor: pointer"
      ></el-table-column>

      <el-table-column label="歌手" min-width="20%" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            v-for="(item, index) in scope.row.artists"
            style="cursor: pointer"
            :key="index"
            @click="toSingerPage(item.id)"
          >
            {{
              index === 0 &&
              scope.row.artists.length > 1 &&
              index !== scope.row.artists.length - 1
                ? item.name + "/"
                : item.name
            }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="专辑"
        prop="album.name"
        min-width="20%"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column
        label="时长"
        prop="duration"
        min-width="10%"
      ></el-table-column>
      <el-table-column label="热度" min-width="10%">
        <template>
          <el-progress
            :percentage="50"
            color="#C0C4CC"
            :show-text="false"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column min-width="5%"><!-- 占位置 --></el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      v-show="toggle == 2"
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
export default {
  data() {
    return {
      searchData: decodeURIComponent(this.$route.params.data),
      //当前的搜索条件
      queryInfo: {
        keywords: this.$route.params.data,
        limit: 100,
        offset: 0,
        type: 1,
      },
      //查询结果总数
      songTotal: 0,
      //歌曲数的结果集
      songList: [],
      //父组件当前播放的音乐的id
      curId: parseInt(window.localStorage.getItem("curPlayMusicId")),
      //用来显示加载数据,默认不显示
      toggle: 2,
      //分页器当前页码
      cur_page: 1,
    };
  },
   activated(){
    console.log('我处于活跃');
  },
  created() {
    //获取搜索结果集
    this.getSearchResult();
    //注册监听的事件 在main.js中定义了
    window.addEventListener("setItem", () => {
      this.curId = parseInt(localStorage.getItem("curPlayMusicId"));
    });
  },
  methods: {
    async getSearchResult() {
      this.toggle = 1;
      await this.$http
        .get("/search", { params: this.queryInfo })
        .then((res) => {
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
          });
        });
      this.toggle = 2;
    },

    //双击歌曲添加数据进去,并循环播放(向父组件传递参数)
    playMusic(row) {
      this.$http.get("song/url", { params: { id: row.id } }).then((res) => {
        if (res.data.data[0].url !== "") {
          this.$http
            .get("song/detail", { params: { ids: row.id } })
            .then((r) => {
              // this.$emit("setMusicUrl", res.data.data[0].url, r.data.songs[0]);
              this.$store.commit("playMusic", {
                murl: res.data.data[0].url,
                detail: r.data.songs[0],
              });
            });
        }
      });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      if (this.queryInfo.offset >= this.songTotal)
        this.queryInfo.offset = this.songTotal;
      this.getSearchResult();
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
