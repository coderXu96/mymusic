<template>
  <el-container style="margin-bottom: 45px">
    <el-header height="300px;">
      <!--轮播图-->
      <el-carousel type="card">
        <el-carousel-item v-for="(item, index) in bannerinfo" :key="index">
          <div class="mark-img">
            <el-image
              :src="item.imageUrl"
              fit="contain"
              style="border-radius: 4px"
              @click="changeUrl(item.targetId)"
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
          :key="index"
          class="mark-img five-eq"
        >
          <el-image :src="item.coverImgUrl"></el-image>
          <p>{{ item.name }}</p>
          <span class="playCount"
            ><i class="el-icon-caret-right"></i
            >{{
              item.playCount >= 10000
                ? (item.playCount / 10000).toFixed(0) + "万"
                : item.playCount
            }}</span
          >
          <!-- 默认不显示 -->
          <el-image
            :src="playhover"
            class="playhover"
            v-show="false"
          ></el-image>
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
          <el-image :src="item.sPicUrl" style="border-radius: 4px"> </el-image>
          <div class="name">{{ item.name }}</div>
          <span class="playvideo"><i class="el-icon-video-play"></i></span>
        </el-col>
      </el-row>

      <!-- 最新音乐 -->
      <p style="margin-bottom: 10px; font-size: 22px">最新音乐</p>
      <el-row>
        <el-col :span="8">
          <el-table :data="newmusiclist.slice(0, 4)" :show-header="false">
            <el-table-column>
              <template scope="scope">
                <div class="newmusiclist">
                  <el-image
                    :src="scope.row.picUrl"
                    class="newmusic_img"
                  ></el-image>
                  <el-image
                    :src="newmusic_icon"
                    class="newmusic_icon"
                  ></el-image>
                  <div class="newmusic_text">
                    <div class="name">{{ scope.row.name }}</div>
                    <div class="song">{{ scope.row.song.artists[0].name }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table :data="newmusiclist.slice(4, 8)" :show-header="false">
            <el-table-column>
              <template scope="scope">
                <div class="newmusiclist">
                  <el-image
                    :src="scope.row.picUrl"
                    class="newmusic_img"
                  ></el-image>
                  <el-image
                    :src="newmusic_icon"
                    class="newmusic_icon"
                  ></el-image>
                  <div class="newmusic_text">
                    <div class="name">{{ scope.row.name }}</div>
                    <div class="song">{{ scope.row.song.artists[0].name }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8">
          <el-table :data="newmusiclist.slice(8, 12)" :show-header="false">
            <el-table-column>
              <template scope="scope">
                <div class="newmusiclist">
                  <el-image
                    :src="scope.row.picUrl"
                    class="newmusic_img"
                  ></el-image>
                  <el-image
                    :src="newmusic_icon"
                    class="newmusic_icon"
                  ></el-image>
                  <div class="newmusic_text">
                    <div class="name">{{ scope.row.name }}</div>
                    <div class="song">{{ scope.row.song.artists[0].name }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
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
  props: {},
  created() {
    //获取轮播图数据
    this.getbannerinfo();
    //获取推荐歌单数据
    this.getmusiclist();
    //获取独家放送的数据
    this.getPrivateList();
    //获取最新音乐的推送信息
    this.getnewmusiclist();
  },
  methods: {
    //获取轮播图数据
    getbannerinfo() {
      this.$http.get("banner").then((res) => {
        if (res.status !== 200) this.$message.error("轮播图数据获取失败");
        this.bannerinfo = res.data.banners;
      });
    },
    //点击banner想父组件传递切换对应的音乐,和专辑封面
    // https://autumnfish.cn/song/detail?ids=1471057078
    changeUrl(musicId) {
      
      if (musicId === null) return;
      this.getMusicUrl(musicId);
      this.getMusicDetail(musicId);

      //防止url未获得提交信息到父组件
      if (this.musicUrl !== "") {
        this.$emit("setParentMusicUrl", this.musicUrl, this.music);
      }
    },

    //根据id获取音乐url
    getMusicUrl(musicId) {
      this.$http.get("song/url", { params: { id: musicId } }).then((res) => {
        this.musicUrl = res.data.data[0].url;
      });
    },

    //根据id获取音乐详情
    getMusicDetail(musicId) {
      this.$http
        .get("song/detail", { params: { ids: musicId } })
        .then((res) => {
          this.music = res.data.songs[0];
        });
    },

    //获取推荐歌单数据
    getmusiclist() {
      // 随机取出精品歌单,避免数据是流动的
      this.$http
        .get("/top/playlist", {
          params: {
            offset: (Math.random() * 1297).toFixed(0) - 10,
            limit: 10,
          },
        })
        .then((res) => {
          this.musiclist = res.data.playlists;
        });
    },

    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },

    //获取独家放送数据
    getPrivateList() {
      this.$http.get("/personalized/privatecontent").then((res) => {
        this.privateList = res.data.result;
      });
    },

    //点击独家放松的图片跳转mv页面
    toVideoPage(mvId) {
      this.$router.push("toVideoPage/" + mvId);
    },

    //推荐最新音乐
    getnewmusiclist() {
      this.$http
        .get("personalized/newsong", { params: { limit: 12 } })
        .then((res) => {
          this.newmusiclist = res.data.result;
        });
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
    border-radius: 4px;
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
