<template>
  <div>
    <div v-for="(item,index) in singerDesc" :key="index">
      <h4>{{ item.ti }}</h4>
      <span v-html="item.txt"></span>
    </div>
  </div>
</template>

<script>
import { getSingerDesc } from "@/networks/networks.js";

export default {
  data() {
    return {
      // 当前歌手id
      singerId: this.$route.params.id,
      // 当前歌手详情
      singerDesc: [],
    };
  },
  created() {
    // 获取歌手的详细经历
    this.get_singer_desc();
  },
  methods: {
    get_singer_desc() {
      getSingerDesc(this.singerId).then((res) => {
        this.singerDesc = res.data.introduction;
        this.singerDesc.forEach((item) => {
          item.txt = item.txt.replace(/▪/g, "<br/>▪");
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
