<template>
  <el-container>
    <el-backtop :bottom="80" :visibility-height="400"> </el-backtop>
    <el-header height="220px;">
      <div class="songlistcont">
        <div class="cover">
          <!--歌单图标-->
          <el-image :src="currentSongList.coverImgUrl" class="coverimg" lazy />
        </div>

        <!--右侧歌曲信息-->
        <div class="songinfo">
          <!--标签及名字-->
          <div class="flex">
            <el-tag type="danger" effect="plain" size="small">歌单 </el-tag>
            <div class="songlistname">{{ currentSongList.name }}</div>
          </div>

          <!--作者信息-->
          <div class="flex">
            <el-image :src="currentSongList.creator.avatarUrl" class="avatar" />
            <div class="nickname">{{ currentSongList.creator.nickname }}</div>
            <div class="createTime">
              {{ currentSongList.createTime | dateFormat }}创建
            </div>
          </div>

          <!--按钮组-->
          <div class="flex">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-caret-right"
              round
              @click="setSongListInfo(playList, playList[0])"
            >
              播放全部
            </el-button>

            <el-button
              icon="el-icon-folder-add"
              size="mini"
              round
              @click="subscripe(currentSongList.id)"
            >
              收藏({{ currentSongList.subscribedCount }})
            </el-button>

            <el-button icon="el-icon-share" size="mini" round>
              分享({{ currentSongList.shareCount }})
            </el-button>
          </div>

          <!--标签信息-->
          <div class="flex">
            标签:
            <span
              class="songListtags"
              v-for="(item, index) in currentSongList.tags"
              :key="index"
            >
              {{
                index + 1 === currentSongList.tags.length ? item : item + " / "
              }}
            </span>
          </div>

          <!-- 歌曲,播放量 -->
          <div class="flex">
            <div>
              歌曲:
              <span class="gary">
                {{ currentSongList.trackCount }}
              </span>
            </div>
            <div style="margin-left: 20px">
              播放:
              <span class="gary">
                {{ (currentSongList.playCount / 10000).toFixed(0) }}万
              </span>
            </div>
          </div>

          <!--简介信息-->
          <div class="flex">
            <!-- 简介:{{ currentSongList.description }} -->
            <el-collapse style="width: 100%">
              <el-collapse-item
                :title="
                  '简介: ' +
                  (currentSongList.description + '').substr(0, 15) +
                  '...'
                "
              >
                <p>{{ currentSongList.description }}</p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </el-header>

    <el-main>
      <el-menu :default-active="index" class="childmenu" mode="horizontal">
        <el-menu-item index="1" @click="showMusicList">歌曲列表</el-menu-item>
        <el-menu-item index="2" @click="showComment">
          评论({{ currentSongList.commentCount }})
        </el-menu-item>
      </el-menu>

      <router-view ref="child" :tracks="currentSongList.trackIds"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { getSongListInfo } from "@/networks/networks.js";

export default {
  name: "SongList",
  data() {
    return {
      index: "1",
      currentId: this.$route.params.id,
      currentSongList: {
        coverImgUrl: "",
        //创建人信息
        creator: {
          avatarUrl: "",
          nickname: "",
        },
        trackIds: [],
      },
    };
  },

  created() {
    // 首次进入页面获取
    this.get_songlist_info();
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
      this.get_songlist_info();
    }
  },

  methods: {
    // 获取歌单信息
    get_songlist_info() {
      getSongListInfo(this.currentId).then((res) => {
        this.currentSongList = res.data.playlist;
        console.log(this.currentSongList.trackIds);
      });
    },

    // 跳转到歌单列表页面
    showMusicList() {
      this.index = "1";
      this.$router.replace("/showMusicList/" + this.currentId);
    },

    // 跳转到评论页面
    showComment() {
      this.index = "2";
      this.$router.replace("/showComment/" + this.currentId);
    },

    //收藏歌单
    subscripe(id) {
      this.$http
        .get("playlist/subscribe", { params: { id: id, t: 1 } })
        .then((res) => {
          if (res.data.code === 200) {
            return this.$message.success("收藏成功,数据同步需要时间!");
          } else {
            return this.$message.info("收藏失败!");
          }
        });
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
  margin-bottom: 10px;
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
  .songlistname {
    font-size: 1.4rem;
    margin-left: 15px;
  }
  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .nickname {
    color: @linkcolor;
    margin-left: 10px;
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
