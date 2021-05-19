<template>
  <el-row :gutter="20" class="row-flex">
    <el-col
      v-for="(item, index) in musiclist"
      :key="item+index"
      class="mark-img five-eq"
    >
      <div class="image_cont">
        <el-image :src="item.image" @click="linkto(item.linkurl)" fit='cover' lazy> </el-image>
        <!-- 悬停播放按钮 -->
        <el-image :src="playhover" class="playhover" v-if="hover"></el-image>
      </div>

      <p @click="linkto(item.linkurl)">{{ item.name }}</p>
      <span class="playCount" v-if="item.playCount">
        <i class="el-icon-caret-right"></i>
        {{
          item.playCount >= 10000
            ? (item.playCount / 10000).toFixed(0) + "万"
            : item.playCount
        }}
      </span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    musiclist: {
      type: Array,
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
    },
  },
};
</script>
<style lang='less' scoped>
//卡片
.five-eq {
  width: 20%;
}

.row-flex {
  display: flex;
  flex-flow: row wrap;

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
  }
}
</style>