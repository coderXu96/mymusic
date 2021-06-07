<template>
  <div>
    <!-- 最新mv -->
    <div class="titleInfo">
      <div class="left">
        <div class="title">最新MV<i class="el-icon-arrow-right"></i></div>
      </div>
      <div class="right">
        <lable-tag
          :item="area"
          defaultChecked="内地"
          @changetag="newMvChangetag"
          type="area"
        >
        </lable-tag>
      </div>
    </div>
    <el-row :gutter="20" class="row-flex">
      <el-col v-for="(item, index) in newMvList" :key="item + index" :span="6">
        <mv-card :item="item"></mv-card>
      </el-col>
    </el-row>

    <!-- 网易出品 -->
    <div class="marginTop">
      <div class="titleInfo">
        <div class="left">
          <div class="title">网易出品<i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
      <el-row :gutter="20" class="row-flex">
        <el-col
          v-for="(item, index) in officialMvList"
          :key="item + index"
          :span="6"
        >
          <mv-card :item="item"></mv-card>
        </el-col>
      </el-row>
    </div>

    <!-- MV排行榜 -->
    <div class="marginTop">
      <div class="titleInfo">
        <div class="left">
          <div class="title">MV排行榜<i class="el-icon-arrow-right"></i></div>
        </div>
        <div class="right">
          <lable-tag
            :item="area"
            defaultChecked="内地"
            @changetag="topMvChangetag"
            type="area"
          >
          </lable-tag>
        </div>
      </div>
      <el-row :gutter="20" class="row-flex">
        <el-col
          v-for="(item, index) in topMvList"
          :key="item + index"
          :span="12"
        >
          <relevant-card :item="item"></relevant-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 引入网络连接
import { getNewMv, getOfficialMv, getTopMv } from "@/networks/networks.js";

import LableTag from "../common/tag/LableTag.vue";
import MvCard from "../common/card/MvCard.vue";
import RelevantCard from "../common/card/RelevantCard.vue";

export default {
  components: { LableTag, MvCard, RelevantCard },
  name: "mvList",

  data() {
    return {
      // 最新mv
      newMvList: [],
      // 查询条件
      newMvQueryInfo: {
        area: "内地",
        limit: 8,
      },

      // 网易出品
      officialMvList: [],
      // 查询条件
      officialMvQueryInfo: {
        limit: 8,
        offset: 0,
      },

      // mv排行榜
      topMvList: [],
      // 查询条件
      topMvQueryInfo: {
        area: "内地",
        limit: 10,
        offset: 0,
      },

      // 地区
      area: [
        { id: "内地", name: "内地" },
        { id: "港台", name: "港台" },
        { id: "欧美", name: "欧美" },
        { id: "日本", name: "日本" },
        { id: "韩国", name: "韩国" },
      ],
    };
  },

  created() {
    // 获取最新mv
    this.get_new_mv();
    // 获取网易出品
    this.get_official_mv();
    // 获取mv排行榜
    this.get_top_mv();
  },

  methods: {
    get_new_mv() {
      getNewMv(this.newMvQueryInfo).then((res) => {
        this.newMvList = res.data.data;
        this.newMvList.forEach((item) => {
          item.imgurl = item.cover;
          item.playCount = item.playCount;
          item.duration = item.duration;
          item.userName = item.artists[0].name;
          item.userId = item.artists[0].id;
        });
      });
    },

    get_official_mv() {
      getOfficialMv(this.officialMvQueryInfo).then((res) => {
        this.officialMvList = res.data.data;
        this.officialMvList.forEach((item) => {
          item.imgurl = item.cover;
          item.playCount = item.playCount;
          item.duration = item.duration;
          item.userName = item.artists[0].name;
          item.userId = item.artists[0].id;
        });
      });
    },

    get_top_mv() {
      getTopMv(this.topMvQueryInfo).then((res) => {
        this.topMvList = res.data.data;
      });
    },

    newMvChangetag(id, type) {
      //设置查询条件的标签筛选
      this.newMvQueryInfo[type] = id;
      this.get_new_mv();
    },

    topMvChangetag(id, type) {
      //设置查询条件的标签筛选
      this.topMvQueryInfo[type] = id;
      this.get_top_mv();
    },

  },
};
</script>
<style lang='less' scoped>
.marginTop {
  margin-top: 30px;
}

.titleInfo {
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .left {
    .title {
      font-size: 1.1rem;
    }
  }
}
</style>