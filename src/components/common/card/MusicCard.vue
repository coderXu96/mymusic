<template>
  <div class="card">
    <div class="image_cont">
      <img
        class="image"
        :src="item.coverImgUrl"
        @click="linkto(item.linkurl)"
        lazy
      />
      <!-- 悬停播放按钮 -->
      <el-image :src="playhover" class="playhover" v-if="hover"></el-image>
    </div>

    <div @click="linkto(item.linkurl)" class="name">{{ item.name }}</div>
    <span class="playCount" v-if="item.playCount">
      <i class="el-icon-caret-right"></i>
      {{ item.playCount | to10000 }}
    </span>
  </div>
</template>

<script>
export default {
  name: "musicCard",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      playhover: require("@/assets/images/play.png"),
      newmusic_icon: require("@/assets/images/newmusic_icon.png"),
    };
  },
  methods: {
    linkto(linkurl) {
      this.$router.push(linkurl);
    },
  },
};
</script>

<style lang='less' scoped>
.card {
  position: relative;
  margin-bottom: 15px;
  .image {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
  }
  .image_cont {
    position: relative;
  }

  .image_cont .playhover {
    display: none;
  }

  .image_cont:hover .playhover {
    display: block;
  }

  .el-col {
    margin-bottom: 20px;
    cursor: pointer;
  }

  .name {
    margin-top: 7px;
  }

  .playCount {
    color: white;
    position: absolute;
    top: 5px;
    right: 10px;
    overflow: hidden;
  }

  .playhover {
    position: absolute;
    height: 40px;
    width: 40px;
    bottom: 20px;
    right: 10px;
  }
}
</style>