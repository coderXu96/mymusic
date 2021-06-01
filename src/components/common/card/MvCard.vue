<template>
  <div class="card">
    <div class="image_cont">
      <img
        class="image"
        :src="item.imgurl"
        @click="toMvPage"
        lazy
      />
      <span class="playCount" v-if="item.playCount">
        <i class="el-icon-caret-right"></i>
        {{
          item.playCount >= 10000
            ? (item.playCount / 10000).toFixed(0) + "万"
            : item.playCount
        }}
      </span>
      <span class="duration">
        {{ (item.duration / 1000) | timeFormat }}
      </span>
    </div>

    <div @click="toMvPage" class="name">{{ item.name }}</div>

    <span class="playCount" v-if="item.playCount">
      <i class="el-icon-caret-right"></i>
      {{
        item.playCount >= 10000
          ? (item.playCount / 10000).toFixed(0) + "万"
          : item.playCount
      }}
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
  },
  data() {
    return {
      newmusic_icon: require("@/assets/images/newmusic_icon.png"),
    };
  },
  methods: {
    // 跳转mv界面
    toMvPage() {
      this.$router.push("/mvPlay/" + this.item.id);
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
    font-size: 0.7rem;
    color: white;
    position: absolute;
    top: 5px;
    right: 5px;
    overflow: hidden;
  }
  .duration {
    font-size: 0.7rem;
    color: white;
    position: absolute;
    bottom: 10px;
    right: 5px;
    overflow: hidden;
  }
}
</style>