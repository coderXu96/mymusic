<template>
  <div class="tag">
    <div class="left" v-if="title">{{ title }}:</div>
    <div class="right">
      <div class="tagtext" v-for="(row, index) in item" :key="index">
        <span
          :class="{ actived: checked == row.id }"
          @click="changetag(row.id)"
        >
          {{ row.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 默认选中
    defaultChecked: {
      default: -1,
    },
    // 元素对象
    item: {
      type: Array,
      default: () => [],
    },
    // 左边title
    title: {
      type: String,
    },
    // 返回的键值
    type: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      // 默认选中
      checked: this.defaultChecked,
    };
  },

  methods: {
    changetag(id) {
      this.checked = id;
      // 向外发射方法
      this.$emit("changetag", id, this.type);
    },
  },
};
</script>
<style lang='less' scoped>
@themecolor: #e60026;
//标签
.tag {
  display: flex;
  justify-content: left;
  font-size: 0.7rem;
  color: #909399;
  display: flex;
  line-height: 2rem;
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
</style>