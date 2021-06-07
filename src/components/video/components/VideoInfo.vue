<template>
  <div>
    <!--视频播放区域-->
    <video
      width="100%"
      height="450px"
      :src="url"
      controls="controls"
      id="video"
      autoplay
      style="background-color: black"
    >
      很抱歉,您的浏览器当前不支持最新播放标签!
    </video>

    <div>
      <div class="artis">发布人: {{ item.artistName }}</div>
      <div class="decinfo">
        发布时间:{{ item.publishTime | dateFormatToYMD }}
        <span style="margin-left: 15px">
          播放次数:{{ item.playCount | to10000 }}
        </span>
      </div>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div class="videoname">{{ item.name }}</div>
            <br />
          </template>
          <p>{{ item.desc }}</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  mounted(){
    // 将音量默认设置为20%
    document.querySelector('#video').volume = 0.2
  }
};
</script>
<style lang='less' scoped>
.title {
  font-size: 1.2rem;
  margin: 10px 0px;
  cursor: pointer;
}
.artis {
  margin-top: 15px;
  font-size: 1.2rem;
}
.decinfo {
  margin: 10px 0px;
  font-size: 0.8rem;
  color: #909399;
}
</style>