<template>
  <el-row type="flex" align="middle" @click.native="toAlbumDetail">
    <el-col :span="12" class="coverinfo">
      <el-image :src="item.picUrl" class="cover" lazy></el-image>
      <div class="name">{{ item.name }}</div>
    </el-col>
    <el-col :span="8" class="textinfo" @click.stop.native="toSinger">
      {{ item.artist.name }}
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  data() {
    return {};
  },

  methods: {
    toAlbumDetail() {
      this.$router.push("/albumDetail/" + this.item.id);
    },
    toSinger() {
      this.$router.push("/singer/" + this.item.artist.id);
    },
  },
};
</script>
<style lang='less' scoped>
.coverinfo {
  display: flex;
  align-items: center;
  .cover {
    height: 60px;
    width: 60px;
  }
  .name {
    margin-left: 10px;
  }
}
.textinfo {
  color: #0036a3;
  font-size: 0.8rem;
}
.el-row:hover {
  background-color: rgb(235, 236, 237) !important;
  border-radius: 5px;
  cursor: pointer;
}
</style>