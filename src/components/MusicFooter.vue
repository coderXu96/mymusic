<template>
  <el-row type="flex" justify="space-between" align="middle">
    <el-col :span="6" class="left">
      <img
        :src="$store.state.music.al.picUrl"
        class="musicpic"
        @click="toMusicDetailPage"
      />
      <div class="musicinfo">
        <div
          class="musicname"
          ref="musicname"
          :class="{ scroll: scrollshow }"
          @mouseover="scroll"
          @mouseleave="scroll"
        >
          {{ $store.state.music.name }}
        </div>
        {{ $store.state.music.ar[0].name }}
      </div>
    </el-col>

    <!-- 音乐进度条 -->
    <el-col :span="10" class="center">
      <div class="progress">
        <div>
          <el-image
            :src="$store.state.isPlay ? music_pause_pic : music_play_pic"
            class="musicplaypic"
            @click="playtoggle"
          >
          </el-image>
        </div>
        <div
          class="sliderbar"
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
            class="duration"
          ></el-slider>
          {{ $store.state.totalDuration || "" | timeFormat }}
        </div>
      </div>
    </el-col>

    <el-col :span="6" class="right">
      <div class="volume">
        <el-image
          :src="volume == 0 ? mute_pic : volume_pic"
          class="volumepic"
          @click="volumetoggle"
        ></el-image>
        <el-slider
          v-model="volume"
          :max="100"
          @input="volumeChange"
          :show-tooltip="false"
          class="volumepg"
        ></el-slider>
      </div>
    </el-col>

    <audio
      :src="$store.state.musicUrl"
      class="playMusicAudio"
      @canplay="canplay"
      @ended="ended"
    ></audio>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      music_play_pic: require("@/assets/images/music_play_pic.png"),
      music_pause_pic: require("@/assets/images/music_pause_pic.png"),
      volume_pic: require("@/assets/images/volume_pic.png"),
      mute_pic: require("@/assets/images/mute_pic.png"),
      // 音乐的音量
      volume: 20,
      // 滚动
      scrollshow: false,
    };
  },

  methods: {
    // 鼠标悬停
    scroll() {
      this.scrollshow = !this.scrollshow;
    },
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

    // 跳转到音乐播放详情
    toMusicDetailPage() {
      // 判断路径
      let reg = /musicDetail/gi;
      if (reg.test(this.$route.path)) {
        this.$router.go(-1);
      }
      if (this.$store.state.music) {
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
};
</script>

<style lang='less' scoped>
@themecolor: #e60026;
.left {
  .musicpic {
    height: 50px;
    width: 50px;
    min-width: 50px;
    cursor: pointer;
    border-radius: 5px;
  }
  .musicinfo {
    overflow: hidden;
    margin-left: 10px;
    font-size: 0.9rem;
    line-height: 25px;
  }
  .musicname {
    white-space: nowrap;
  }

  // 滚动
  .scroll {
    animation: 15s wordsLoop linear infinite normal;
  }
  @keyframes wordsLoop {
    0% {
      transform: translateX(0px);
      -webkit-transform: translateX(0px);
    }
    100% {
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
    }
  }
}

.center {
  // 中间进度条
  .progress {
    width: 100%;
    text-align: center;

    // 进度条
    .sliderbar {
      display: flex;
      align-items: center;
      width: 100%;
      color: gray;
      font-size: small;
    }
    // 播放按钮
    .musicplaypic {
      height: 20px;
      width: 20px;
      cursor: pointer;
    }
    .duration {
      width: 100%;
      padding: 0 10px;
    }
  }
}

// 右边
.right {
  .volume {
    width: 60%;
    display: flex;
    margin-left: auto;
  }
  .volumepg {
    width: 100%;
    margin: 0px 20px;
  }
  .volumepic {
    max-width: 35px;
    cursor: pointer;
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

.el-row {
  height: 100%; //一定要设置高度为100%,不然不会居中
  .el-col {
    //内部设定为弹性布局，然后居中
    display: flex;
    align-items: center;
  }
}
</style>