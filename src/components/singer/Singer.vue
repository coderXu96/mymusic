<template>
  <el-container>
    <el-header height="220px;">
      <div class="cont">
        <div class="cover">
          <el-image :src="singerInfo.artist.img1v1Url" class="coverimg" lazy />
        </div>

        <div class="info">
          <div class="flex">
            <span class="artist">{{ singerInfo.artist.name }}</span>
          </div>
          <div class="flex">
            <el-button icon="el-icon-folder-add" size="mini" round>
              收藏
            </el-button>
          </div>
          <div class="flex">
            <span class="musicSize">
              单曲数:{{ singerInfo.artist.musicSize }}
            </span>
            <span class="albumSize">
              专辑数:{{ singerInfo.artist.albumSize }}
            </span>
            <span class="mvSize"> MV数:{{ singerInfo.artist.mvSize }} </span>
          </div>
        </div>
      </div>
    </el-header>

    <el-main>
      <el-menu :default-active="active" class="header_menu" mode="horizontal">
        <el-menu-item index="1" @click="singerAlbum">专辑</el-menu-item>
        <el-menu-item index="2" @click="singerMv">MV</el-menu-item>
        <el-menu-item index="3" @click="singerDesc">歌手详情</el-menu-item>
      </el-menu>

      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name:'singer',
  data() {
    return {
      active: '1',
      //当前歌手的id
      singerId: this.$route.params.id,
      //当前歌手的信息
      singerInfo: {
        artist: {
          img1v1Url: "",
        },
      },
    };
  },
  created() {
    //获取歌手的信息
    this.getSingerInfo();
  },
  methods: {
    getSingerInfo() {
      this.$http
        .get("artists", { params: { id: this.singerId } })
        .then((res) => {
          this.singerInfo = res.data;
        });
    },
    singerAlbum() {
      this.$router.replace("/singerAlbum/" + this.singerId);
    },
    singerMv() {
       this.$router.replace("/singerMv/" + this.singerId);
    },
    singerDesc() {
       this.$router.replace("/singerDesc/" + this.singerId);
    },
  },
};
</script>

<style lang="less" scoped>
@themecolor: #e60026;
@graycolor: #909399;
@linkcolor: #507daf;

.header_menu {
  margin-bottom: 20px;
  .el-menu-item {
    font-size: 1.1rem;
  }
  .is-active {
    font-weight: 900;
    color: black;
    border-bottom: 2px solid @themecolor !important;
  }
}

.gary {
  color: @graycolor;
}

.cont {
  display: flex;
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

.info {
  flex: 1;
  margin-left: 15px;
  .flex {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .artist {
    font-size: 1.6rem;
  }
  .musicSize,
  .albumSize,
  .mvSize {
    margin-right: 20px;
    font-size: 0.8rem;
  }
}
</style>
