<template>
  <div>
    <loading :show="loading"></loading>
    <music-info v-show="!loading" :list="songs"></music-info>
  </div>
</template>

<script>
import MusicInfo from "../common/music/MusicInfo.vue";

import Loading from "../common/loading/Loading.vue";

export default {
  name: "ShowMusicList",
  props: {
    songs: {
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
    };
  },

  created() {
  },
  
};
</script>
<style lang='less' scoped>
</style>