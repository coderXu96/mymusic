<template>
  <el-container style="margin-bottom: 55px">
    <el-header class="tag">
      <el-row type="flex" class="tagname">
        <el-col class="left">分类:</el-col>
        <el-col class="right">
          <div class="tagtext">
            <span
              :class="{ actived: '全部' == catname }"
              @click="changeMusicListCat('全部')"
            >
              全部
            </span>
          </div>
          <div
            class="tagtext"
            v-for="(item, index) in hotMusicListTags"
            :key="index"
          >
            <span
              :class="{ actived: item.name == catname }"
              @click="changeMusicListCat(item.name, item.id)"
            >
              {{ item.name }}
            </span>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row v-show="toggle == 1" type="flex" justify="center">
        <i class="el-icon-loading" style="font-size: 20px"></i>数据加载中
      </el-row>
      <el-row :gutter="20" class="row-flex" v-show="toggle == 2">
        <el-col
          v-for="(item, index) in goodMusicList"
          :key="index"
          class="mark-img five-eq"
        >
          <el-image :src="item.coverImgUrl"></el-image>
          <div class="name">{{ item.name }}</div>
          <span class="playCount"
            ><i class="el-icon-caret-right"></i
            >{{
              item.playCount >= 10000
                ? (item.playCount / 10000).toFixed(0) + "万"
                : item.playCount
            }}</span
          >
          <!-- 默认不显示 -->
          <el-image
            :src="playhover"
            class="playhover"
            v-show="false"
          ></el-image>
        </el-col>
      </el-row>
      <!--分页-->
      <el-pagination
        v-show="toggle == 2"
        background
        layout="prev, pager, next"
        :page-size="queryInfo.limit"
        :total="goodMusicListTotal"
        :current-page.sync="cur_page"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //精品歌单分类查询条件
      queryInfo: {
        cat: "全部",
        limit: 60,
        offset: 0,
      },
      //热门歌单分类标签
      hotMusicListTags: [],
      //精品歌单的列表
      goodMusicList: [],
      //精品歌单的总数
      goodMusicListTotal: 0,
      //选中的标签
      catname: "全部",
      playhover: require("@/assets/images/play.png"),
      //用来显示加载数据,默认不显示
      toggle: 2,
      //分页器当前页码
      cur_page: 1,
    };
  },
  created() {
    //获取热门歌单标签信息
    this.getHotMusicListTags();
    //获取精品歌单
    this.getGoodMusicList();
  },
  mounted() {
    console.log(this);
  },
  methods: {
    //获取热门歌单标签信息
    getHotMusicListTags() {
      this.$http.get("playlist/hot").then((res) => {
        this.hotMusicListTags = res.data.tags;
      });
    },

    //获取精品歌单
    async getGoodMusicList() {
      this.toggle = 1;
      await this.$http
        .get("/top/playlist", { params: this.queryInfo })
        .then((res) => {
          this.goodMusicList = res.data.playlists;
          this.goodMusicListTotal = res.data.total;
        });
      this.toggle = 2;
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.getGoodMusicList();
    },
    
    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },

    //点击标签筛选(index+jquery辅助我们切换点击后的文本的样式)
    async changeMusicListCat(newCat, index) {
      this.catname = newCat;
      console.log(this.catname);

      //设置查询条件的标签筛选
      this.queryInfo.cat = newCat;

      //将查询偏移量变成0,查询完然后将cur_page(当前页码)变成1
      this.queryInfo.offset = 0;
      await this.getGoodMusicList();
      this.cur_page = 1;
    },
  },
};
</script>