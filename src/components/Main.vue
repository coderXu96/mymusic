<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="5">
          <el-image :src="logo_pic" class="logo_pic"> </el-image>
          V-Music
          <el-button
            style="margin-left: 20px"
            icon="el-icon-back"
            size="mini"
            circle
            @click="$router.go(-1)"
          ></el-button>
          <el-button
            icon="el-icon-right"
            size="mini"
            circle
            @click="$router.go(1)"
          ></el-button>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="searchData"
            placeholder="搜索"
            suffix-icon="el-icon-search"
            @change="toSearchPage"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-image :src="user_pic" class="logo_pic"> </el-image>
          未登录
        </el-col>
      </el-row>
    </el-header>

    <!-- 中间 -->
    <el-main class="main">
      <transition name="el-fade-in-linear" duration="400">
        <keep-alive exclude="musicDetail">
          <router-view ref="child"></router-view>
        </keep-alive>
      </transition>
    </el-main>

    <!-- 尾部 -->
    <el-footer height="70px" class="footer">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6">
          <el-image
            :src="$store.state.music.al.picUrl"
            class="music_pic"
            @click="toMusicDetailPage"
          >
          </el-image>
          <div style="margin-left: 10px; font-size: 0.9rem; line-height: 25px">
            {{ $store.state.music.name }}<br />
            {{ $store.state.music.ar[0].name }}
          </div>
        </el-col>
        <!-- 音乐进度条 -->
        <el-col :span="10">
          <div style="width: 100%; text-align: center">
            <div>
              <el-image
                :src="$store.state.isPlay ? music_pause_pic : music_play_pic"
                class="music_play_pic"
                @click="playtoggle"
              >
              </el-image>
            </div>
            <div
              class="slider_bar"
              @mousedown="$store.state.isChange = true"
              @mouseup="$store.state.isChange = false"
            >
              {{ $store.state.musicDuration | timeFormat }}
              <!--进度条-->
              <el-slider
                v-model="$store.state.musicDuration"
                :max="$store.state.totalDuration"
                @change="musicDurationChange"
                :show-tooltip="false"
                style="width: 100%; padding: 0 10px"
              ></el-slider>
              {{ $store.state.totalDuration || "" | timeFormat }}
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-image
            :src="volume == 0 ? mute_pic : volume_pic"
            class="volume_pic"
            @click="volumetoggle"
          ></el-image>
          <el-slider
            v-model="volume"
            :max="100"
            @input="volumeChange"
            :show-tooltip="false"
            style="width: 100%; margin: 0px 20px"
          ></el-slider>
        </el-col>
        <audio
          :src="$store.state.musicUrl"
          class="playMusicAudio"
          @canplay="canplay"
          @ended="ended"
        ></audio>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
//引用搜索页
import SearchPage from "./findMusic/search/SearchPage";

export default {
  data() {
    return {
      //播放音乐的链接
      musicUrl: "",
      searchData: "",
      logo_pic: require("@/assets/images/logo_pic.png"),
      user_pic: require("@/assets/images/user_pic.png"),
      music_play_pic: require("@/assets/images/music_play_pic.png"),
      music_pause_pic: require("@/assets/images/music_pause_pic.png"),
      volume_pic: require("@/assets/images/volume_pic.png"),
      mute_pic: require("@/assets/images/mute_pic.png"),
      //音乐的音量
      volume: 20,
    };
  },
  
  methods: {
    canplay() {
      // 获取音乐信息
      this.$store.commit("getMusicDuration");
    },

    // 播放暂停音乐
    playtoggle() {
      // 判断当前是否有歌
      if (this.$store.state.musicUrl) {
        let audio = document.querySelector(".playMusicAudio");
        if (audio.paused) {
          audio.play();
          this.$store.commit("musicPlaying");
          this.$store.state.isPlay = true;
        } else {
          audio.pause();
          this.$store.state.isPlay = false;
        }
      } else {
        this.$notify({
          title: "提示",
          message: "暂时没有歌曲在播放",
          position: "bottom-left",
          offset: 60,
          type: "error",
        });
      }
    },

    // 静音
    volumetoggle() {
      let audio = document.querySelector(".playMusicAudio");
      if (audio.volume == 0) {
        audio.volume = 0.2;
        this.volume = 20;
      } else {
        audio.volume = 0;
        this.volume = 0;
      }
    },

    // 音乐进度条值变化的方法
    musicDurationChange() {
      if (this.totalDuration === 0) return;
      let audio = document.querySelector(".playMusicAudio");
      audio.currentTime = this.$store.state.musicDuration;
      // 拖动进度条自动播放
      // audio.play();
      this.$store.commit("musicPlaying");
    },

    // 改变声音大小
    volumeChange(sum) {
      let audio = document.querySelector(".playMusicAudio");
      audio.volume = sum / 100;
      this.volume = sum;
    },

    // 搜索
    toSearchPage() {
      if (this.searchData.trim() !== "") {
        //encodeURIComponent参数转换 应对中文参数
        this.$router.replace("/search/" + encodeURIComponent(this.searchData));
        //调用子类的方法 实现搜索响应式
        this.$refs.child.toSingSearchPage();
      }
    },

    // 跳转到音乐播放详情
    toMusicDetailPage() {
      // 判断路径
      let reg = /musicDetail/gi;
      if (reg.test(this.$route.path)) {
        this.$router.go(-1);
      }
      if (this.$store.state.musicUrl) {
        this.$router.push("/musicDetail/" + this.$store.state.curId);
      } else {
        this.$notify({
          title: "提示",
          message: "暂时没有歌曲在播放",
          type: "error",
        });
      }
    },

    // 播放完毕
    ended() {
      this.$store.commit("musicEnded");
    },
  },

  components: {
    child: SearchPage,
  },
};
</script>

<style lang="less" scoped>
//头部高度为60px,底部高度为80px z-idnex为999
@themecolor: #e60026;

// 中间主体
.main {
  margin: 60px 0px 70px 0px;
}

.header {
  background: @themecolor;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw; //不要使用100%,避免出现滚动条时页面晃动
  z-index: 999;

  .el-row {
    height: 100%; //一定要设置高度为100%,不然不会居中
    .el-col {
      //内部设定为弹性布局，然后居中
      display: flex;
      align-items: center;
      .logo_pic {
        height: 25px;
        width: 25px;
        margin-right: 8px;
      }
    }
  }
}

.el-menu {
  .el-menu-item {
    font-size: 18px;
  }
  .is-active {
    font-weight: 900;
    color: black;
  }
}

.footer {
  width: 100%;
  //定位在底部
  position: fixed;
  border-top: 1px solid rgb(219, 219, 219);
  left: 0;
  bottom: 0;
  z-index: 999;
  background: rgb(255, 255, 255);
  .el-row {
    height: 100%; //一定要设置高度为100%,不然不会居中
    .el-col {
      //内部设定为弹性布局，然后居中
      display: flex;
      align-items: center;
      .music_pic {
        height: 50px;
        width: 50px;
        cursor: pointer;
      }
    }
  }
}

// 进度条播放颜色
/deep/.el-slider__bar {
  background-color: @themecolor !important;
}

/deep/.el-slider__button {
  width: 8px;
  height: 8px;
  border: 2px solid @themecolor !important;
}

// 进度条
.slider_bar {
  display: flex;
  align-items: center;
  width: 100%;
  color: gray;
  font-size: small;
}
// 播放按钮
.music_play_pic {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.volume_pic {
  width: 35px;
  cursor: pointer;
}
</style>



 




       