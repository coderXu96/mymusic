<template>
  <el-container>
    <el-header height="220px;">
      <div class="songlistcont">
        <div class="cover">
          <!--歌单图标-->
          <el-image :src="album.blurPicUrl" class="coverimg" lazy />
        </div>

        <!--右侧歌曲信息-->
        <div class="songinfo">
          <!--标签及名字-->
          <div class="flex">
            <el-tag type="danger" effect="plain" size="small">歌单 </el-tag>
            <div class="albumname">{{ album.name }}</div>
          </div>

          <!--按钮组-->
          <div class="flex">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-caret-right"
              round
            >
              播放全部
            </el-button>

            <el-button icon="el-icon-folder-add" size="mini" round>
              收藏
            </el-button>

            <el-button icon="el-icon-share" size="mini" round>
              分享({{ album.info.shareCount }})
            </el-button>
          </div>

          <!-- 歌手 -->
          <div class="flex">
            <div class="info">
              歌手:<span class="artist">{{ album.artist.name }}</span>
            </div>
          </div>

          <!-- 时间 -->
          <div class="flex">
            <div class="info">
              时间:<span class="publishTime">{{
                album.publishTime | dateFormatToYMD
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-header>

    <el-main>
      <el-menu :default-active="index" class="childmenu" mode="horizontal">
        <el-menu-item index="1" @click="showMusicList">歌曲列表</el-menu-item>
        <el-menu-item index="2" @click="showComment">
          评论({{ album.info.commentCount }})
        </el-menu-item>
      </el-menu>

      <router-view ref="child" :songs="songs"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { getAlbumInfo } from "@/networks/networks.js";

export default {
  name: "SongList",
  data() {
    return {
      index: "1",
      currentId: this.$route.params.id,
      album: {
        blurPicUrl: "",
        name: "",
        //创建人信息
        info: {
          shareCount: "",
        },
        artist: {
          name: "",
        },
        songs: [],
      },
    };
  },

  created() {
    // 首次进入页面获取
    this.get_album_info();
  },

  activated() {
    window.scrollTo(0, 0);
    // 重置 index
    this.index = "1";
    // 判断传入的歌单id是否和之前的一样
    let cid = this.$route.params.id;
    if (cid != this.currentId) {
      this.currentId = cid;
      // 重新获取歌单信息
      this.get_album_info();
    }
  },

  methods: {
    // 获取歌单信息
    get_album_info() {
      getAlbumInfo(this.currentId).then((res) => {
        this.songs = res.data.songs;
        // 处理时长数据
        this.songs.forEach((item) => {
          const dt = new Date(item.dt);
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");
          // 处理成子组件可用
          item.duration = mm + ":" + ss;
          item.artists = item.ar;
          item.album = item.al;
        });

        this.album = res.data.album;
      });
    },

    // 跳转到歌单列表页面
    showMusicList() {
      this.index = "1";
      this.$router.replace("/albumMusicList/" + this.currentId);
    },

    // 跳转到评论页面
    showComment() {
      this.index = "2";
      this.$router.replace("/albumComment/" + this.currentId);
    },
  },
};
</script>

<style lang="less" scoped>
@themecolor: #e60026;
@graycolor: #909399;
@linkcolor: #507daf;

.gary {
  color: @graycolor;
}
.flex {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.songlistcont {
  display: flex;
}
.el-collapse {
  border: none;
}
/deep/.el-collapse-item__header {
  height: 16px;
  border: none;
}

.cover {
  width: 200px;
}

.coverimg {
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
}

.songinfo {
  flex: 1;
  margin-left: 15px;
  .albumname {
    font-size: 1.4rem;
    margin-left: 15px;
  }
  .info {
    font-size: 0.8rem;
    .artist {
      color: @linkcolor;
      margin-left: 15px;
    }
    .publishTime {
      margin-left: 15px;
    }
  }
  .createTime {
    color: @graycolor;
    margin-left: 10px;
  }
  .songListtags {
    margin-left: 10px;
    cursor: pointer;
    color: @linkcolor;
  }
}
.childmenu {
  .el-menu-item {
    font-size: 1.1rem;
  }
  .is-active {
    font-weight: 900;
    color: black;
    border-bottom: 2px solid @themecolor !important;
  }
}
</style>
