<template>
  <el-container>
    <el-header height="20px" class="tag">
      <lable-tag
        :item="hotMusicListTags"
        :title="'分类'"
        :type="'cat'"
        @changetag="changetag"
      ></lable-tag>
    </el-header>

    <el-main>
      <loading :show="loading"></loading>

      <el-row :gutter="20" class="row-flex" v-show="!loading">
        <el-col
          v-for="(item, index) in goodMusicList"
          :key="item + index"
          class="five-eq"
        >
          <music-card :item="item" :hover="true"></music-card>
        </el-col>
      </el-row>

      <!--分页-->
      <el-pagination
        v-show="!loading"
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
import MusicCard from "../common/card/MusicCard.vue";
import LableTag from "../common/tag/LableTag.vue";
import Loading from "../common/loading/Loading.vue";

// 引入networks
import { getHotMusicListTags, getGoodMusicList } from "@/networks/networks.js";

export default {
  components: { MusicCard, LableTag, Loading },
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
      //用来显示加载数据,默认不显示
      loading: false,
      //分页器当前页码
      cur_page: 1,
    };
  },
  created() {
    //获取热门歌单标签信息
    this.get_hot_musiclist_tags();
    //获取精品歌单
    this.get_good_musiclist();
  },
  methods: {
    // 获取热门歌单标签信息
    get_hot_musiclist_tags() {
      getHotMusicListTags().then((res) => {
        let temarr = [];
        for (const item of res.data.tags) {
          let tem = {
            id: item.name,
            name: item.name,
          };
          temarr.push(tem);
        }
        this.hotMusicListTags = temarr;
      });
    },

    changetag(id, type) {
      //设置查询条件的标签筛选
      this.queryInfo[type] = id;
      console.log(this.queryInfo[type]);
      //将查询偏移量变成0,查询完然后将cur_page(当前页码)变成1
      this.queryInfo.offset = 0;
      this.cur_page = 1;
      this.get_good_musiclist();
    },

    // 获取精品歌单
    get_good_musiclist() {
      this.loading = true;
      getGoodMusicList(this.queryInfo).then((res) => {
        this.goodMusicList = res.data.playlists;
        this.goodMusicListTotal = res.data.total;
        this.goodMusicList.forEach((item) => {
          item.linkurl = "/songlist/" + item.id;
          item.coverImgUrl = item.coverImgUrl;
          item.name = item.name;
          item.playCount = item.playCount;
        });
        this.loading = false;
      });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.get_good_musiclist();
    },

    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },
  },
};
</script>
<style lang="less" scoped>
.tag {
  margin-bottom: 20px;
}
</style>