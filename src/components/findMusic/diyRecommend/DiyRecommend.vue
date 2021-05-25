<template>
  <el-container>
    <el-backtop :bottom="80" :visibility-height="400"> </el-backtop>
    <el-header height="200px">
      <el-carousel type="card" height="200px">
        <el-carousel-item
          v-for="(item, index) in bannerinfo"
          :key="index"
          height="200px"
        >
          <div style="position: relative">
            <el-image
              :src="item.imageUrl"
              @dblclick="playMusic(item.targetId)"
            ></el-image>
            <el-tag
              :type="item.typeTitle === '独家' ? 'danger' : 'primary'"
              effect="dark"
              class="mark-tag"
            >
              {{ item.typeTitle }}
            </el-tag>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-header>

    <el-main>
      <!-- 推荐歌单 -->
      <p style="margin-bottom: 10px; font-size: 22px">推荐歌单</p>

      <el-row :gutter="20" class="row-flex">
        <el-col
          v-for="(item, index) in musiclist"
          :key="item + index"
          class="five-eq"
        >
          <music-card :list="item" :hover="true"></music-card>
        </el-col>
      </el-row>

      <!-- 独家放送 -->
      <p style="margin-bottom: 10px; font-size: 22px">独家放送</p>
      <el-row :gutter="20" class="row-flex">
        <el-col
          :span="8"
          v-for="(item, index) in privateList"
          :key="index"
          style="margin-bottom: 10px"
          class="mark-img"
        >
          <el-image :src="item.sPicUrl"> </el-image>
          <div class="name">{{ item.name }}</div>
          <span class="playvideo"><i class="el-icon-video-play"></i></span>
        </el-col>
      </el-row>

      <!-- 最新音乐 -->
      <p style="margin-bottom: 10px; font-size: 22px">最新音乐</p>

      <el-row :gutter="20">
        <el-col
          :span="8"
          v-for="(item, index) in newmusiclist"
          :key="item + index"
          class="mar_top_20"
        >
          <new-music
            :list="item"
            class="newmusiccont"
            @dblclick="playMusic"
          ></new-music>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MusicCard from "../../common/card/MusicCard.vue";
import NewMusic from "../../common/table/NewMusic.vue";

import { MUSICLIST } from "../../common/card/MusicClass";
import { NEWMUSIC } from "../../common/table/NewMusic";

// 引入networks
import {
  getBannerInfo,
  getMusicList,
  getPrivateList,
  getNewmusicList,
} from "@/networks/networks.js";

// 引入mixin
import { mixPlayMusic } from "../../common/mixin/mixin.js";

export default {
  mixins: [mixPlayMusic],
  components: {
    MusicCard,
    NewMusic,
  },
  data() {
    return {
      //轮播图数据列表
      bannerinfo: [],
      //推荐歌单的数据
      musiclist: [],
      //独家放送的信息
      privateList: [],
      //最新音乐的推送列表
      newmusiclist: [],
      playhover: require("@/assets/images/play.png"),
      newmusic_icon: require("@/assets/images/newmusic_icon.png"),
    };
  },
  created() {
    //获取轮播图数据
    getBannerInfo().then((res) => {
      if (res.status !== 200) this.$message.error("轮播图数据获取失败");
      this.bannerinfo = res.data.banners;
    });

    //获取推荐歌单数据
    getMusicList().then((res) => {
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
      this.musiclist = temarr;
    });

    //获取独家放送数据
    getPrivateList().then((res) => {
      this.privateList = res.data.result;
    });

    //获取最新音乐的推送信息
    getNewmusicList().then((res) => {
      let temarr = [];
      for (const item of res.data.result) {
        let tem = new NEWMUSIC(
          item.id,
          item.picUrl,
          item.name,
          item.song.alias[0],
          item.song.artists[0].name
        );
        temarr.push(tem);
      }
      this.newmusiclist = temarr;
    });
  },
  methods: {
    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },

    //点击独家放松的图片跳转mv页面
    toVideoPage(mvId) {
      this.$router.push("toVideoPage/" + mvId);
    },

    //点击歌手名跳转歌手详细页面
    toSingerPage(row) {
      this.$router.push("/singer/" + row.song.artists[0].id);
    },
  },
};
</script>

<style lang="less" scoped>
// 角标
.mark-img {
  position: relative;
}

.mark-tag {
  position: absolute;
  top: 0px;
  right: 0px;
  overflow: hidden;
}

.playvideo {
  font-size: 30px;
  color: white;
  position: absolute;
  top: 4px;
  left: 20px;
}

.newmusiccont:hover {
  background-color: rgb(234, 234, 234);
  border-radius: 5px;
}
</style>
