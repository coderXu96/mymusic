<template>
  <div>
    <!--最新音乐-->
    <el-row style="margin-top: 25px">
      <el-header class="tag">
        <lable-tag
          :taglist="musicType"
          :title="'语种'"
          :type="'type'"
          @changetag="changetag"
        ></lable-tag>
      </el-header>
    </el-row>

    <el-row v-show="toggle == 1" type="flex" justify="center">
      <i class="el-icon-loading" style="font-size: 20px"></i>数据加载中
    </el-row>
    <div class="muscilist" v-show="toggle == 2">
      <el-row
        v-for="(item, index) in newMusicInfo"
        :key="item.index"
        :style="index % 2 === 0 ? 'background: rgb(245,245,247)' : ''"
      >
        <el-col :span="24">
          <el-image
            :src="item.album.picUrl"
            @dblclick="playMusic(item.id)"
            lazy
          ></el-image>
          <span>{{ item.name }}</span
          ><br />
          <span> {{ item.album.name }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LableTag from "../../common/tag/LableTag.vue";

export default {
  components: { LableTag },
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
      newMusicInfo: [
        {
          id: 0,
          album: {
            picUrl: "",
          },
        },
      ],
      toggle: 2,
    };
  },
  created() {
    //获取最新音乐
    this.getNewMusic();
  },
  methods: {
    changetag(id, type) {
      // 修改查询条件
      this.queryInfo[type] = id;
      // 将查询偏移量变成0
      this.queryInfo.offset = 0;
      this.getNewMusic();
    },
    getNewMusic() {
      this.toggle = 1;
      this.$http.get("top/song", { params: this.queryInfo }).then((res) => {
        this.newMusicInfo = res.data.data;
        this.toggle = 2;
      });
    },
    //播放点击的最新音乐
    changeNewUrl(musicId) {
      var playlist = [];
      this.newMusicInfo.forEach((item) => {
        playlist.push(item.id);
      });
      this.$emit("setSongListInfo", playlist, musicId);
      this.playMusic(musicId);
    },

    playMusic(musicId) {
      console.log(musicId);
      this.$http.get("song/url", { params: { id: musicId } }).then((res) => {
        if (res.data.data[0].url !== "") {
          this.$http
            .get("song/detail", { params: { ids: musicId } })
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
  },
};
</script>
<style lang="less" scoped>
.muscilist {
  margin-bottom: 75px;
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

