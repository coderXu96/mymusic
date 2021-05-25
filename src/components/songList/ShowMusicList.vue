<template>
  <div>
    <loading :show="loading"></loading>
    <music-info v-show="!loading" :list="currentMusicListInfo"></music-info>
  </div>
</template>

<script>
import MusicInfo from "../common/music/MusicInfo.vue";

// 引入axios
import { getMusicDetail } from "@/networks/networks.js";
import Loading from "../common/loading/Loading.vue";

export default {
  name: "ShowMusicList",
  props: {
    tracks: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { MusicInfo, Loading },
  data() {
    return {
      // 显示加载与隐藏
      loading: false,
      //查询当前歌单所有音乐的name url 作者等等
      currentMusicListInfo: [],
      //歌单的歌曲id合集
      songListInfo: [],
    };
  },
  watch: {
    tracks: function (newval) {
      this.getAllMusic();
    },
  },
  activated() {
    // 获取歌曲详情
    console.log("我被缓存了");
  },
  created() {
    // 获取歌曲详情
    this.getAllMusic();
  },

  methods: {
    getAllMusic() {
      // 将tracks 分隔
      let queryIds = "";
      this.tracks.forEach((item, index) => {
        queryIds += item.id;
        if (index < this.tracks.length - 1) {
          queryIds += ",";
        }
      });
      this.loading = true;
      getMusicDetail(queryIds).then((res) => {
        if (res.data.songs) {
          this.currentMusicListInfo = res.data.songs;
          // 处理时长数据
          this.currentMusicListInfo.forEach((item) => {
            const dt = new Date(item.dt);
            const mm = (dt.getMinutes() + "").padStart(2, "0");
            const ss = (dt.getSeconds() + "").padStart(2, "0");
            // 处理成子组件可用
            item.duration = mm + ":" + ss;
            item.artists = item.ar;
            item.album = item.al;
          });
        }
        this.loading = false;
      });
    },
  },
};
</script>
<style lang='less' scoped>
</style>