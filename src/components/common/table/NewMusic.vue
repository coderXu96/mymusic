<template>
  <div class="newmusiclist" @dblclick="dblclick(list.id)">
    <el-image :src="list.picUrl" class="newmusic_img" lazy></el-image>
    <el-image :src="newmusic_icon" class="newmusic_icon"></el-image>
    <div class="newmusic_text">
      <div class="name">
        {{ list.songName }}
        <span v-if="list.aliasName" class="aliasName"
          >({{ list.aliasName }})</span
        >
      </div>
      <div class="song">{{ list.artists }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: ()=>{
        return {}
      },
    },
  },
  data() {
    return {
      newmusic_icon: require("@/assets/images/newmusic_icon.png"),
    };
  },
  methods: {
    dblclick(id) {
      this.$emit("dblclick", id);
    },
  },
};
</script>
<style lang='less' scoped>
.newmusiclist {
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
    .song,
    span {
      color: #909399;
    }
  }
}
</style>