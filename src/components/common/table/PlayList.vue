<template>
  <el-row type="flex" align="middle" @click.native="tomusiclist">
    <el-col :span="12" class="coverinfo">
      <el-image :src="item.coverImgUrl" class="cover" lazy></el-image>
      <div class="name" @click="click">{{ item.name }}</div>
    </el-col>
    <el-col :span="4" class="textinfo"> {{ item.trackCount }}首 </el-col>
    <el-col :span="8" class="textinfo"> by {{ item.creator.nickname }} </el-col>
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

  methods:{
    click(){
      alert(1)
    },
    tomusiclist(){
      let id = this.item.id
      this.$router.push('/showMusicList/'+id)
    }
  }
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
  .name{
    margin-left: 10px;
  }
}
.textinfo{
  color:#909399;
  font-size: 0.8rem;
}
.el-row:hover {
  background-color: rgb(235, 236, 237) !important;
  border-radius: 5px;
  cursor: pointer;
}
</style>