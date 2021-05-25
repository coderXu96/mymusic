<template>
  <el-table :data="list" stripe @row-dblclick="getmusic" lazy class="table">
    <el-table-column width="5%"></el-table-column>
    <el-table-column type="index" min-width="15%">
      <template slot-scope="scope">
        {{ scope.$index + 1 + pnum }}
      </template>
    </el-table-column>

    <el-table-column
      label="音乐标题"
      prop="name"
      min-width="30%"
      style="cursor: pointer"
      show-overflow-tooltip
    ></el-table-column>

    <el-table-column label="歌手" min-width="15%" show-overflow-tooltip>
      <template slot-scope="scope">
        <span
          v-for="(item, index) in scope.row.artists"
          style="cursor: pointer"
          :key="index"
          @click="toSingerPage(item.id)"
        >
          {{
            index === 0 &&
            scope.row.artists.length > 1 &&
            index !== scope.row.artists.length - 1
              ? item.name + "/"
              : item.name
          }}
        </span>
      </template>
    </el-table-column>

    <el-table-column
      label="专辑"
      prop="album.name"
      min-width="15%"
      show-overflow-tooltip
    ></el-table-column>

    <el-table-column
      label="时长"
      prop="duration"
      min-width="10%"
    ></el-table-column>
  </el-table>
</template>

<script>
import { mixPlayMusic } from "../../common/mixin/mixin.js";

export default {
  mixins: [mixPlayMusic],
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pnum: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    getmusic(row) {
      this.playMusic(row.id);
    },
  },
};
</script>
<style lang='less' scoped>
</style>