<template>
  <div class="newmusicitem" @dblclick="playMusic(item.id)">
    <el-image :src="item.picUrl" class="newmusic_img" lazy></el-image>
    <el-image :src="newmusic_icon" class="newmusic_icon"></el-image>
    <div class="newmusic_text">
      <div class="name">
        {{ item.songName }}
        <span v-if="item.aliasName" class="aliasName">
          ({{ item.aliasName }})
        </span>
      </div>
      <div class="song" @click="toSinger">{{ item.singerName }}</div>
    </div>
  </div>
</template>

<script>
// 引入mixin
import { mixPlayMusic } from "../../common/mixin/mixin";

export default {
  mixins: [mixPlayMusic],
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
    toSinger() {
      this.$router.push("singer/" + this.item.singerId);
    },
  },
};
</script>

<style lang='less' scoped>
.newmusicitem {
  user-select: none;
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  .newmusic_img {
    width: 50px;
    height: 50px;
    min-width: 50px;
    cursor: pointer;
    user-select: none;
  }
  .newmusic_icon {
    height: 25px;
    width: 25px;
    position: absolute;
    cursor: pointer;
    top: 12.5px;
    left: 12.5px;
    background: rgba(255, 255, 255, 0.712);
    border-radius: 50%;
  }
  .newmusic_text {
    line-height: 25px;
    font-size: 0.8rem;
    margin-left: 7px;
    overflow: hidden; //超出的文本隐藏
    white-space: nowrap; //溢出不换行 （只显示一行）
    .song {
      color: #909399;
      cursor: pointer;
    }
  }
}
</style>