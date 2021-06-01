<template>
  <div>
    <!--默认的头部热门五十首-->
    <div class="content">
      <div class="left">
        <img :src="top50img" class="cover" />
      </div>
      <div class="right">
        <div class="title">热门50曲</div>
        <el-table
          :data="hot50Songs.slice(0, defaultShow)"
          stripe
          :show-header="false"
          @row-dblclick="playHot50Music"
        >
          <el-table-column label="#" type="index">
            <template scope="scope">
              <img
                v-if="$store.state.music.id === scope.row.id"
                :src="playing"
                alt=""
                class="playing"
              />
              <p class="index" v-else>{{ scope.$index + 1 }}</p>
            </template>
          </el-table-column>

          <el-table-column label="音乐标题" prop="name"></el-table-column>

          <el-table-column
            label="时长"
            prop="dt"
            width="80px;"
          ></el-table-column>
        </el-table>
        <p class="showmore" @click="changeDefaultNum">查看全部50首></p>
      </div>
    </div>

    <!-- 其他专辑 -->
    <div class="content" v-for="(item, index) in albumMusicInfo" :key="index">
      <div class="left">
        <img :src="item.album.picUrl" class="cover" />
        <div class="time">{{ item.album.publishTime | dateFormatToYMD }}</div>
      </div>
      <div class="right">
        <div class="title">{{ item.album.name }}</div>
        <el-table
          :data="item.songs"
          stripe
          :show-header="false"
          @row-dblclick="playHot50Music"
        >
          <el-table-column label="#" type="index">
            <template scope="scope">
              <img
                v-if="$store.state.music.id === scope.row.id"
                :src="playing"
                alt=""
                class="playing"
              />
              <p class="index" v-else>{{ scope.$index + 1 }}</p>
            </template>
          </el-table-column>

          <el-table-column v-if="false" label="id" prop="id"></el-table-column>

          <el-table-column prop="name"></el-table-column>

          <el-table-column
            label="时长"
            prop="dt"
            width="80px;"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-divider content-position="center" v-if="isLoadEnd" class="divider">
      到底了
    </el-divider>
  </div>
</template>

<script>
import { mixPlayMusic } from "../common/mixin/mixin.js";

// 引入网络请求
import { getHot50Music, getHotAlbum } from "@/networks/networks.js";

export default {
  mixins: [mixPlayMusic],
  data() {
    return {
      // 歌手专辑查询条件
      queryInfo: {
        id: this.$route.params.id,
        limit: 4,
        offset: 0,
      },
      //当前歌手的id
      singerId: this.$route.params.id,
      // 歌手热门50首
      hot50Songs: [],

      //50首默认展示10首
      defaultShow: 10,
      //当前歌手热门专辑信息(不包含专辑内含的歌曲)
      hotAlbum: [],
      //当前歌手专辑内歌曲信息
      albumMusicInfo: [],
      // 图片
      top50img: require("../../assets/images/top50.png"),
      playing: require("../../assets/images/playing_pic.png"),

      // 滚动加载
      newPage: 1,
      isRefreshBool: true,
      isLoadEnd: false,
    };
  },

  created() {
    // 获取歌手热门50首歌
    this.get_Hot50Music();
    // 获取歌手的热门专辑信息
    this.get_HotAlbum();
  },
  mounted() {
    //监视scroll滚动条
    window.addEventListener("scroll", this.isRefresh, true);
  },

  methods: {
    isRefresh() {
      let scrollTop = document.documentElement.scrollTop;

      //变量windowHeight是可视区的高度
      let windowHeight = document.documentElement.clientHeight;

      //变量scrollHeight是滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight;

      //滚动条到底部的条件
      if (
        scrollTop + windowHeight >= scrollHeight - 300 &&
        this.isRefreshBool
      ) {
        // false防止refresh()加载数据函数多次触发
        this.isRefreshBool = false;
        this.queryInfo.offset = this.newPage * this.queryInfo.limit;
        this.newPage++;
        this.get_HotAlbum();
      }
    },

    // 获取歌曲热门50首歌
    get_Hot50Music() {
      getHot50Music(this.singerId).then((res) => {
        this.hot50Songs = res.data.songs;
        //处理时长数据
        this.hot50Songs.forEach((item) => {
          const dt = new Date(item.dt);
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");
          item.dt = mm + ":" + ss;
        });
      });
    },

    //切换当前显示热门50首
    changeDefaultNum() {
      document.querySelector(".showmore").style.display = "none";
      this.defaultShow = 50;
    },

    //获取歌手热门专辑
    get_HotAlbum() {
      getHotAlbum(this.queryInfo).then((res) => {
        this.hotAlbum = res.data.hotAlbums;
        this.hotAlbum.forEach((item) => {
          this.$http.get("album", { params: { id: item.id } }).then((res) => {
            //处理时长 再放入数据
            res.data.songs.forEach((item) => {
              const dt = new Date(item.dt);
              const mm = (dt.getMinutes() + "").padStart(2, "0");
              const ss = (dt.getSeconds() + "").padStart(2, "0");

              item.dt = mm + ":" + ss;
            });
            this.albumMusicInfo.push(res.data);
          });
        });
        //处理时长数据
        this.hotAlbum.forEach((item) => {
          const dt = new Date(item.dt);
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");
          item.dt = mm + ":" + ss;
        });
        // 防止没有数据还一直加载
        if (res.data.hotAlbums.length > 0) {
          this.isRefreshBool = true;
        } else {
          this.isLoadEnd = true;
        }
      });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.getHotAlbum();
    },

    //播放热门五十首
    playHot50Music(row) {
      var playList = [];
      this.hot50Songs.forEach((item) => {
        playList.push(item.id);
      });
      // 播放音乐
      this.playMusic(row.id);
    },
  },
};
</script>

<style lang='less' scoped>
@graycolor: #909399;
.content {
  display: flex;
  margin: 20px 0px 30px 0px;
  .left {
    width: 150px;
    .cover {
      width: 150px;
      height: 150px;
      border-radius: 5px;
    }
    .time {
      font-size: 0.8rem;
      color: @graycolor;
    }
  }
  .right {
    flex: 1;
    margin-left: 40px;
    .title {
      font-size: 1.1rem;
      font-weight: bolder;
      margin-bottom: 10px;
    }
    .index {
      text-align: center;
    }
    .playing {
      padding: 10px 0px;
      width: 100%;
      height: 100%;
    }
    .showmore {
      margin-top: 15px;
      font-size: 0.8rem;
      color: @graycolor;
      cursor: pointer;
    }
  }
}
/deep/.el-table td,
.el-table th {
  padding: 0px;
}
.divider {
  margin-top: 50px;
}
</style>
