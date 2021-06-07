<template>
  <div class="videoinfo">
    <div class="card">
      <div class="image_cont">
        <img class="image" :src="item.cover" lazy @click="toplay" />
      </div>
      <span class="playCount" v-if="item.playCount">
        <i class="el-icon-caret-right"></i>
        {{ item.playCount | to10000 }}
      </span>
      <span class="duration" v-if="item.duration">
        {{ (item.duration / 1000) | timeFormat }}
      </span>
    </div>

    <div class="info">
      <div class="name" :title="item.name">{{ item.name }}</div>
      <div class="artist" :title="item.artistName">
        by {{ item.artistName }}
      </div>
    </div>
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
    //跳转推荐mv界面
    toplay() {
      if (this.item.type == 1) {
        this.$router.push("/videoPlay/" + this.item.id);
      } else {
        this.$router.push("/mvPlay/" + this.item.id);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.videoinfo {
  display: flex;
  margin-bottom: 15px;
  .card {
    width: 50%;
    position: relative;
    .image {
      width: 100%;
      height: auto;
      border-radius: 4px;
      cursor: pointer;
    }
    .image_cont {
      position: relative;
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

    .playhover {
      position: absolute;
      height: 40px;
      width: 40px;
      bottom: 20px;
      right: 10px;
    }
  }

  .info {
    width: 50%;
    margin-left: 15px;
    padding-top: 10px;
    .name {
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 20px;
    }
    .artist {
      margin-top: 10px;
      font-size: 0.8rem;
      color: #909399;
    }
  }
}
</style>