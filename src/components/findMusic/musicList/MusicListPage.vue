<template>
  <el-container style="margin-bottom: 55px">
    <el-header class="tag">
      <lable-tag
        :taglist="hotMusicListTags"
        :title="'分类'"
        :type="'cat'"
        @changetag="changetag"
      ></lable-tag>
    </el-header>

    <el-main>
      <el-row v-show="toggle == 1" type="flex" justify="center">
        <i class="el-icon-loading" style="font-size: 20px"></i>数据加载中
      </el-row>
      <music-card :musiclist="goodMusicList" v-show="toggle == 2"></music-card>
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
import MusicCard from "../../common/card/MusicCard.vue";
import LableTag from "../../common/tag/LableTag.vue";

import { MUSICLIST } from "../../common/card/MusicClass";


export default {
  components: { MusicCard, LableTag },
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
  methods: {
    //获取热门歌单标签信息
    getHotMusicListTags() {
      this.$http.get("playlist/hot").then((res) => {
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
      //将查询偏移量变成0,查询完然后将cur_page(当前页码)变成1
      this.queryInfo.offset = 0;
      this.cur_page = 1;
      this.getGoodMusicList();
    },

    //获取精品歌单
    getGoodMusicList() {
      this.toggle = 1;
      this.$http
        .get("/top/playlist", { params: this.queryInfo })
        .then((res) => {
          let temarr = [];
          for (const item of res.data.playlists) {
            let linkurl = "/songlist/" + item.id;
            let tem = new MUSICLIST(
              item.coverImgUrl,
              item.name,
              item.playCount,
              linkurl
            );
            temarr.push(tem);
          }
          this.goodMusicList = temarr;
          this.goodMusicListTotal = res.data.total;
          this.toggle = 2;
        });
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
  },
};
</script>