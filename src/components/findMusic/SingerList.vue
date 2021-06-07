<template>
  <el-container>
    <el-header height="auto">
      <lable-tag
        :item="areaList"
        title="语种"
        type="area"
        @changetag="changetag"
      ></lable-tag>

      <lable-tag
        :item="typeList"
        title="分类"
        type="type"
        @changetag="changetag"
      ></lable-tag>

      <lable-tag
        :item="initialList"
        title="筛选"
        type="initial"
        @changetag="changetag"
      ></lable-tag>
    </el-header>

    <el-main>
      <loading :show="loading"></loading>

      <el-row :gutter="20" class="row-flex" v-show="!loading">
        <el-col
          v-for="(item, index) in singerList"
          :key="item + index"
          class="five-eq"
        >
          <music-card :item="item"></music-card>
        </el-col>
      </el-row>

      <!--分页-->
      <el-pagination
        class="pagination"
        v-show="!loading"
        background
        layout="prev, next"
        :page-size="queryInfo.limit"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
// 引入网络连接
import { getSingerList } from "@/networks/networks.js";

import MusicCard from "../common/card/MusicCard.vue";
import LableTag from "../common/tag/LableTag.vue";
import Loading from "../common/loading/Loading.vue";

export default {
  components: { MusicCard, LableTag, Loading },
  data() {
    return {
      // 歌手列表
      singerList: [],
      //歌手分类查询条件
      queryInfo: {
        area: -1,
        type: -1,
        initial: -1,
        limit: 50,
        offset: 0,
      },
      // 歌手语种分类
      areaList: [
        { id: -1, name: "全部" },
        { id: 7, name: "华语" },
        { id: 96, name: "欧美" },
        { id: 8, name: "日本" },
        { id: 16, name: "韩国" },
        { id: 0, name: "其他" },
      ],
      //歌手类型分类标签
      typeList: [
        { id: -1, name: "全部" },
        { id: 1, name: "男歌手" },
        { id: 2, name: "女歌手" },
        { id: 3, name: "乐队" },
      ],

      //字段开头
      initialList: [
        { id: -1, name: "热门" },
        { id: "A", name: "A" },
        { id: "B", name: "B" },
        { id: "C", name: "C" },
        { id: "D", name: "D" },
        { id: "E", name: "E" },
        { id: "F", name: "F" },
        { id: "G", name: "G" },
        { id: "H", name: "H" },
        { id: "I", name: "I" },
        { id: "J", name: "J" },
        { id: "K", name: "K" },
        { id: "L", name: "L" },
        { id: "M", name: "M" },
        { id: "N", name: "N" },
        { id: "O", name: "O" },
        { id: "P", name: "P" },
        { id: "Q", name: "Q" },
        { id: "R", name: "R" },
        { id: "S", name: "S" },
        { id: "T", name: "T" },
        { id: "U", name: "U" },
        { id: "V", name: "V" },
        { id: "W", name: "W" },
        { id: "X", name: "X" },
        { id: "Y", name: "Y" },
        { id: "Z", name: "Z" },
        { id: 0, name: "#" },
      ],
      //用来显示加载数据,默认不显示
      loading: false,
    };
  },
  created() {
    //获取歌手数据s
    this.get_singer_list();
  },
  methods: {
    // 改变标签选择
    changetag(id, type) {
      // 修改查询条件
      this.queryInfo[type] = id;
      // 将查询偏移量变成0
      this.queryInfo.offset = 0;
      this.get_singer_list();
    },

    // 获取歌手数据
    get_singer_list() {
      this.loading = true;
      getSingerList(this.queryInfo).then((res) => {
        this.singerList = res.data.artists;
        this.singerList.forEach((item) => {
          item.linkurl = "/singer/" + item.id;
          item.coverImgUrl = item.img1v1Url;
          item.name = item.name;
        });
        this.loading = false;
      });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.get_singer_list();
    },

    //跳转歌手详情页
    toSingerDetailPage(id) {
      this.$router.push("/singer/" + id);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-main {
  height: 100% !important;
  overflow-y: hidden;
}
.tag {
  .el-row {
    line-height: 30px;
  }
}
</style>

