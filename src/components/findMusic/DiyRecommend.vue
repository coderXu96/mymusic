<template>
  <el-container>
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
      <div class="title">推荐歌单</div>
      <el-row :gutter="20" class="row-flex">
        <el-col
          v-for="(item, index) in musiclist"
          :key="item + index"
          class="five-eq"
        >
          <music-card :item="item" :hover="true"></music-card>
        </el-col>
      </el-row>

      <!-- 独家放送 -->
      <div class="title">独家放送</div>
      <el-row :gutter="20" class="row-flex">
        <el-col
          :span="8"
          v-for="(item, index) in privateList"
          :key="index"
          style="margin-bottom: 10px"
          class="mark-img"
        >
          <el-image :src="item.sPicUrl" @click="mvPlay(item.id)" class="image">
          </el-image>
          <div class="name" @click="mvPlay(item.id)">{{ item.name }}</div>
          <span class="playvideo"><i class="el-icon-video-play"></i></span>
        </el-col>
      </el-row>

      <div class="title">最新音乐</div>
      <el-row :gutter="20">
        <el-col
          :span="8"
          v-for="(item, index) in newmusiclist"
          :key="item + index"
          class="newmusiclist"
        >
          <new-music :item="item" class="newmusiccont"></new-music>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MusicCard from "../common/card/MusicCard.vue";
import NewMusic from "../common/table/NewMusic.vue";

// 引入networks
import {
  getBannerInfo,
  getMusicList,
  getPrivateList,
  getNewmusicList,
} from "@/networks/networks.js";

// 引入mixin
import { mixPlayMusic } from "../common/mixin/mixin.js";

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
    this.get_banner_info();
    this.get_music_list();
    this.get_newmusic_list();
    this.get_private_list()
  },
  
  methods: {
    // 获取轮播图数据
    get_banner_info() {
      getBannerInfo().then((res) => {
        if (res.status !== 200) this.$message.error("轮播图数据获取失败");
        this.bannerinfo = res.data.banners;
      });
    },

    // 获取推荐歌单数据
    get_music_list() {
      getMusicList().then((res) => {
        this.musiclist = res.data.playlists;
        this.musiclist.forEach((item) => {
          item.linkurl = "/songlist/" + item.id;
          item.coverImgUrl = item.coverImgUrl;
          item.name = item.name;
          item.playCount = item.playCount;
        });
      });
    },

    // 独家放送
    get_private_list(){
      getPrivateList().then(res => {
        this.privateList = res.data.result
      })  
    },

    // 获取最新音乐的推送信息
    get_newmusic_list() {
      getNewmusicList().then((res) => {
        this.newmusiclist = res.data.result;
        this.newmusiclist.forEach((item) => {
          item.id = item.id;
          item.picUrl = item.picUrl;
          item.songName = item.name;
          item.aliasName = item.song.alias[0];
          item.singerName = item.song.artists[0].name;
          item.singerId = item.song.artists[0].id;
        });
      });
    },

    // 点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },

    // 点击独家放松的图片跳转mv页面
    mvPlay(mvId) {
      this.$router.push("mvPlay/" + mvId);
    },

    // 点击歌手名跳转歌手详细页面
    toSingerPage(row) {
      this.$router.push("/singer/" + row.song.artists[0].id);
    },
  },
};
</script>

<style lang="less" scoped>
.newmusiclist {
  margin-bottom: 10px;
}
.title {
  margin: 20px 0px;
  font-size: 1.4rem;
}
// 角标
.mark-img {
  position: relative;
  .image,
  .name {
    cursor: pointer;
  }
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
