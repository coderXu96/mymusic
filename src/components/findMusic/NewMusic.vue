<template>
  <div>
    <!--最新音乐-->
    <el-row>
      <el-header class="tag" height="30px">
        <lable-tag
          :item="musicType"
          :title="'语种'"
          :type="'type'"
          @changetag="changetag"
        ></lable-tag>
      </el-header>
    </el-row>

    <loading :show="loading"></loading>

    <div class="muscilist" v-show="!loading">
      <el-row
        v-for="(item, index) in newMusicInfo"
        :key="item.index"
        :style="index % 2 === 0 ? 'background: rgb(245,245,247)' : ''"
      >
        <el-col :span="24">
          <new-music :item="item"></new-music>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 引入网络连接
import { getNewMusic } from "../../networks/networks.js";

import NewMusic from "../common/table/NewMusic.vue";
import LableTag from "../common/tag/LableTag.vue";
import Loading from "../common/loading/Loading.vue";

export default {
  components: { LableTag, NewMusic, Loading },
  data() {
    return {
      //筛选条件
      queryInfo: {
        type: 0,
      },
      //标签数据
      musicType: [
        { id: 0, name: "全部" },
        { id: 7, name: "华语" },
        { id: 96, name: "欧美" },
        { id: 16, name: "韩国" },
        { id: 8, name: "日本" },
      ],
      //最新音乐的数据
      newMusicInfo: [],
      loading: false,
    };
  },
  created() {
    // 获取最新音乐
    this.get_new_music();
  },
  methods: {
    get_new_music() {
      this.loading = true;
      getNewMusic(this.queryInfo).then((res) => {
        this.newMusicInfo = res.data.data;
        this.newMusicInfo.forEach((item) => {
          item.id = item.id;
          item.picUrl = item.album.picUrl;
          item.songName = item.name;
          item.aliasName = item.alias[0];
          item.singerName = item.artists[0].name;
          item.singerId = item.artists[0].id;
        });
        this.loading = false;
      });
    },

    // 切换标签
    changetag(id, type) {
      // 修改查询条件
      this.queryInfo[type] = id;
      // 将查询偏移量变成0
      this.queryInfo.offset = 0;
      // 查询
      this.get_new_music();
    },
  },
};
</script>
<style lang="less" scoped>
.tag {
  margin-bottom: 20px;
}
.muscilist {
  .el-row {
    padding: 10px 0px;
    .el-col {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
    }
  }
  .el-row:hover {
    background-color: rgb(235, 236, 237) !important;
  }
  .el-image {
    height: 60px;
    width: 60px;
    border-radius: 5px;
  }
  .el-image:hover {
    cursor: pointer;
  }
}
</style>

