<template>
  <div class="card">
    <div class="image_cont">
      <el-image
        :src="list.image"
        @click="linkto(list.linkurl)"
        fit="cover"
        lazy
      >
      </el-image>
      <!-- 悬停播放按钮 -->
      <el-image :src="playhover" class="playhover" v-if="hover"></el-image>
    </div>

    <p @click="linkto(list.linkurl)">{{ list.name }}</p>
    <span class="playCount" v-if="list.playCount">
      <i class="el-icon-caret-right"></i>
      {{
        list.playCount >= 10000
          ? (list.playCount / 10000).toFixed(0) + "万"
          : list.playCount
      }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: [],
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
      console.log(linkurl);
      this.$router.push(linkurl)
    },
  },
};
</script>
<style lang='less' scoped>

.card {
  position: relative;
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
    margin-top: 5px;
  }

  .playCount {
    color: white;
    position: absolute;
    top: 5px;
    right: 20px;
    overflow: hidden;
  }

  .playhover {
    position: absolute;
    height: 40px;
    width: 40px;
    bottom: 20px;
    right: 15px;
  }
  .el-image {
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>