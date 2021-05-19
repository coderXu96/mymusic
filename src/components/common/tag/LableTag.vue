<template>
  <el-row type="flex" justify="left" class="tagname">
    <el-col class="left">{{ title }}:</el-col>
    <el-col class="right">
      <div class="tagtext" v-for="(item, index) in taglist" :key="index">
        <span :class="{ actived: id == item.id }" @click="changetag(item.id)">
          {{ item.name }}
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    taglist: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "分类",
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      id:-1,
    };
  },
  methods: {
    changetag(id) {
      this.id = id;
      // 向外发射方法
      this.$emit("changetag", id, this.type);
    },
  },
};
</script>
<style lang='less' scoped>
@themecolor: #E60026;
//标签
.tag {
  .tagname {
    font-size: 0.7rem;
    color: #909399;
    flex: 1;
    display: flex;
    align-items: top;

    .left {
      width: 50px;
    }

    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;

      .tagtext {
        min-width: 77px; //设置最小宽度撑开
        text-align: center;

        span {
          padding: 2px 12px;
          margin: 0px 8px;
          border-radius: 30px;
          cursor: pointer;
        }
      }
    }

    .actived {
      //被选中的tag标签
      color: @themecolor;
      background: rgb(255, 232, 232);
    }
  }
}
</style>