<template>
  <el-container style="margin-bottom: 45px">
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
              @dblclick="changeUrl(item.targetId)"
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

      <music-card :musiclist="musiclist" :hover="true"></music-card>

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

      <el-row>
        <el-col
          :span="8"
          v-for="(item, index) in newmusiclist"
          :key="item + index"
          class="mar_top_20"
        >
          <div
            class="newmusiclist"
            @dblclick="changeUrl(item.id)"
            style="cursor: pointer"
          >
            <el-image :src="item.picUrl" class="newmusic_img"></el-image>
            <el-image :src="newmusic_icon" class="newmusic_icon"></el-image>
            <div class="newmusic_text">
              <div class="name">{{ item.name }}</div>
              <div class="song">{{ item.song.artists[0].name }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MusicCard from "../../common/card/MusicCard";
import { MUSICLIST } from "../../common/card/MusicClass";

// axios
import {
  getBannerInfo,
  getMusicList,
  getPrivateList,
  getNewmusicList,
  getMusicUrl,
  getMusicDetail,
} from "../../../networks/networks";

export default {
  components: {
    MusicCard,
  },
  data() {
    return {
      //轮播图数据列表
      bannerinfo: [],
      //需要播放的音乐地址
      musicUrl: "",
      //当前音乐的详情对象
      music: {},
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
      console.log(this.bannerinfo);
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
      this.newmusiclist = res.data.result;
    });
  },
  methods: {
    // 切换歌曲
    async changeUrl(musicId) {
      if (musicId) {
        console.log("当前音乐:" + musicId);
        await this.getmusicurl(musicId);
        await this.getmusicdetail(musicId);

        //防止url未获得提交信息到父组件
        if (this.musicUrl !== "") {
          this.$store.commit("playMusic", {
            murl: this.musicUrl,
            detail: this.music,
          });
        } else {
          this.$notify({
            title: "警告",
            message: "歌曲信息未知",
            type: "warning",
          });
        }
      } else {
        this.$notify({
          title: "警告",
          message: "未能获取到歌曲",
          type: "warning",
        });
        return
      }
    },

    // 根据id获取音乐url
    async getmusicurl(musicId) {
      await getMusicUrl(musicId).then((res) => {
        this.musicUrl = res.data.data[0].url;
      });
    },

    //根据id获取音乐详情
    async getmusicdetail(musicId) {
      await getMusicDetail(musicId).then((res) => {
        this.music = res.data.songs[0];
      });
    },

    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },

    //点击独家放松的图片跳转mv页面
    toVideoPage(mvId) {
      this.$router.push("toVideoPage/" + mvId);
    },

    //双击播放音乐
    dblclickPlayMusic(row) {
      this.changeUrl(row.id);
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
.newmusiclist {
  position: relative;
  display: flex;
  align-items: center;
  .newmusic_img {
    width: 50px;
    height: 50px;
  }
  .newmusic_icon {
    height: 25px;
    width: 25px;
    position: absolute;
    top: 12.5px;
    left: 12.5px;
    background: rgba(255, 255, 255, 0.712);
    border-radius: 50%;
  }
  .newmusic_text {
    margin-left: 7px;
    .song {
      color: #909399;
    }
  }
}
</style>
