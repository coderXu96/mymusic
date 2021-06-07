<template>
  <el-container>
    <el-header class="tag" height="30px">
      <lable-tag
        title="分类"
        :item="category"
        defaultChecked="58100"
        type="id"
        @changetag="changetag"
      ></lable-tag>
    </el-header>

    <el-main>
      <loading :show="loading"></loading>
      <el-row :gutter="20" class="row-flex" v-show="!loading">
        <el-col
          v-for="(item, index) in videoList"
          :key="item + index"
          :span="6"
        >
          <mv-card :item="item"></mv-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getVideoGroup } from "@/networks/networks.js";

import LableTag from "../common/tag/LableTag.vue";
import Loading from "../common/loading/Loading.vue";
import MvCard from "../common/card/MvCard.vue";

export default {
  components: { LableTag, Loading, MvCard },
  name: "videoList",
  data() {
    return {
      // 查询条件
      queryInfo: {
        offset: 0,
        // 只能是8
        limit: 8,
        id: 58100,
      },
      // 视频合集
      videoList: [],
     
      // 分类
      category: [
        { id: 58100, name: "现场" },
        { id: 60100, name: "翻唱" },
        { id: 1101, name: "舞蹈" },
        { id: 58101, name: "听BGM" },
        { id: 2100, name: "生活" },
        { id: 2103, name: "游戏" },
        { id: 57104, name: "ACG音乐" },
        { id: 1105, name: "最佳饭制" },
      ],
      // 加载动画
      loading: false,

      // 滚动加载
      newPage: 1,
      isRefreshBool: true,
      isLoadEnd: false,
    };
  },

  created() {
    this.get_video_group();
    this.videoList = [];
  },

  mounted() {
    //监视scroll滚动条
    window.addEventListener("scroll", this.isRefresh, true);
  },

  methods: {
    isRefresh() {
      let scrollTop = document.documentElement.scrollTop;

      //变量windowHeight是可视区的高度
      let windowHeight = document.documentElement.clientHeight;

      //变量scrollHeight是滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight;

      //滚动条到底部的条件
      if (
        scrollTop + windowHeight >= scrollHeight - 300 &&
        this.isRefreshBool
      ) {
        // false防止refresh()加载数据函数多次触发
        this.isRefreshBool = false;
        this.queryInfo.offset = this.newPage * this.queryInfo.limit;
        this.newPage++;
        this.get_video_group();
      }
    },

    // 更改标签
    changetag(id, type) {
      // 设置查询条件的标签筛选
      this.queryInfo[type] = id;
      // 将查询偏移量变成0
      this.queryInfo.offset = 0;
      this.videoList = [];
      this.loading = true;
      this.get_video_group();
    },

    // 获取分类下的视频
    get_video_group() {
      getVideoGroup(this.queryInfo).then((res) => {
        res.data.datas.forEach((item) => {
          item.id = item.data.vid;
          item.name = item.data.title;
          item.imgurl = item.data.coverUrl;
          item.playCount = item.data.playTime;
          item.duration = item.data.durationms;
          item.userName = item.data.creator.nickname;
          item.userId = item.data.creator.userId;
        });
        this.videoList.push(...res.data.datas)
        // 防止没有数据还一直加载
        if (res.data.datas.length > 0) {
          this.isRefreshBool = true;
        } else {
          this.isLoadEnd = true;
        }
        this.loading = false
      });
    },
   
  },
};
</script>
<style lang='less' scoped>
.tag {
  margin-bottom: 20px;
}
</style>