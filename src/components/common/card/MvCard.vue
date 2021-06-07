<template>
  <div class="card">
    <div class="image_cont">
      <div class="imagebox">
        <img class="image" :src="item.imgurl" @click="toplay" lazy />
      </div>

      <span class="playCount" v-if="item.playCount">
        <i class="el-icon-caret-right"></i>
        {{ item.playCount | to10000 }}
      </span>
      <span class="duration" v-if="item.duration">
        {{ (item.duration / 1000) | timeFormat }}
      </span>
    </div>

    <div @click="toplay" class="info">
      <el-tag v-if="item.type == 0" size="mini" effect="plain" type="danger">
        MV
      </el-tag>
      <span class="title" :title="item.name">{{ item.name }}</span>
      <div class="userName" v-if="item.userName">by {{ item.userName }}</div>
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
    // 跳转播放界面
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
@graycolor: #909399;
.card {
  position: relative;
  margin-bottom: 15px;

  .imagebox {
    position: relative;
    content: "";
    width: 100%;
    padding-top: 66%;
    display: block;
    .image {
      border-radius: 4px;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
    }
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

  .info {
    margin-top: 7px;
    font-size: 0.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .title {
      margin-left: 2px;
    }
    .userName {
      margin-top: 3px;
      color: @graycolor;
      cursor: pointer;
    }
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