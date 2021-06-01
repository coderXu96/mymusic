<template>
  <el-container>
    <!-- 官方榜 -->
    <el-header height="auto" class="title">官方榜</el-header>
    <el-main>
      <el-row
        :gutter="20"
        class="RankList"
        type="flex"
        justify="space-around"
        v-for="(item, index) in official"
        :key="index"
      >
        <el-col :span="4">
          <el-image
            :src="item.coverImgUrl"
            @click="toSongListPage(item.id)"
          ></el-image>
        </el-col>
        <el-col :span="20" @click.native="toSongListPage(item.id)">
          <el-table :data="item.tracks" stripe :show-header="false">
            <el-table-column type="index">
              <template scope="scope">
                <span style="color: red; font-weight: 400"  >
                  {{ scope.$index + 1 }}
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="first"></el-table-column>

            <el-table-column
              prop="second"
              align="right"
              class-name="second"
            ></el-table-column>

          </el-table>
        </el-col>
      </el-row>

      <!-- 歌手榜 -->
      <el-row
        :gutter="20"
        class="RankList"
        type="flex"
        justify="space-around"
        singerRankInfo
      >
        <el-col :span="4">
          <el-image
            :src="singerRankInfo.coverUrl"
            @click="toSongListPage(singerRankInfo.id)"
          ></el-image>
        </el-col>
        <el-col :span="20">
          <el-table :data="singerRankInfo.artists" stripe :show-header="false">
            <el-table-column type="index">
              <template scope="scope">
                <span style="color: red; font-weight: 400">{{
                  scope.$index + 1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="first"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>

    <!-- 全球榜 -->
    <el-header height="auto" class="title">全球榜</el-header>
    <el-main>
      <el-row :gutter="20" class="row-flex">
        <el-col
          v-for="(item, index) in globa"
          :key="item + index"
          class="five-eq"
        >
          <music-card :list="item"></music-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import MusicCard from "../common/card/MusicCard.vue";
import { MUSICLIST } from "../common/card/MusicClass";

import { getOfficialRankList } from "@/networks/networks.js";
import {mixPlayMusic} from '../common/mixin/mixin.js'
export default {
  mixins:[mixPlayMusic],
  components: { MusicCard },

  data() {
    return {
      //排行榜的所有数据
      musicRankList: [
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
      ],
      //歌手榜的信息
      singerRankInfo: {
        coverUrl: "",
        artists: [],
      },
      playhover: require("@/assets/images/play.png"),
    };
  },

  computed: {
    official() {
      return this.musicRankList.slice(0, 4);
    },
    globa() {
      let temarr = [];
      for (const item of this.musicRankList.slice(4, 30)) {
        let linkurl = "/songlist/" + item.id;
        let tem = new MUSICLIST(
          item.coverImgUrl,
          item.name,
          item.playCount,
          linkurl
        );
        temarr.push(tem);
      }
      return temarr;
    },
  },

  created() {
    // 获取官方榜单的数据
    this.get_official_ranklist();
  },

  methods: {
    get_official_ranklist() {
      getOfficialRankList().then((res) => {
        this.musicRankList = res.data.list;
        this.singerRankInfo = res.data.artistToplist;
      });
    },

    // 点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/songlist/" + id);
    },

    toplayMusic(id){
      console.log(id);
    }
  },
};
</script>

<style lang='less' scoped>
.title {
  font-size: 1.2rem;
  font-weight: bold;
}
.RankList {
  margin: 0px 0px 50px 0px;
  align-items: center;
  .el-image {
    border-radius: 15px;
    cursor: pointer;
  }
  /deep/.second {
    color: #909399 !important;
  }
}
</style>
