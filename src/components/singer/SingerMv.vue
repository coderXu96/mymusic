<template>
  <div>
    <loading :show="loading"></loading>

    <el-row :gutter="20" class="row-flex" v-show="!loading">
      <el-col
        v-for="(item, index) in singerMvList"
        :key="item + index"
        class="five-eq"
      >
        <mv-card :item="item"></mv-card>
      </el-col>
    </el-row>

    <!--分页-->
    <el-pagination
      background
      :page-size="queryInfo.limit"
      layout="prev, next"
      @current-change="handleCurrentChange"
      v-show="!loading"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getSingerMv } from "@/networks/networks";

import MvCard from "../common/card/MvCard.vue";
import Loading from '../common/loading/Loading.vue';

export default {
  components: {MvCard, Loading },
  data() {
    return {
      //当前歌手id
      singerId: this.$route.params.id,
      //查询条件
      queryInfo: {
        id: this.$route.params.id,
        limit: 40,
        offset: 0,
      },
      //当前歌手mv信息
      singerMvList: [],
      // 加载动画
      loading: false,
    };
  },
  activated(){
    console.log('666');
  },
  created() {
    //查询当前歌手mv的信息
    this.getCurrentSingerMv();
  },

  methods: {
    //查询当前歌手mv的信息
    getCurrentSingerMv() {
      this.loading = true
      getSingerMv(this.queryInfo).then((res) => {
        this.singerMvList = res.data.mvs;
        this.loading = false
      });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.getCurrentSingerMv();
    },
  },
};
</script>

<style scoped>
</style>
