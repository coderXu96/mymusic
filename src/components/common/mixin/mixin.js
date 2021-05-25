import {
  getMusicUrl,
  getMusicDetail,
} from "@/networks/networks.js";

// 添加和播放歌曲
export const mixPlayMusic = {
  data() {
    return {
      //需要播放的音乐地址
      musicUrl: "",
      //当前音乐的详情对象
      music: {},
    }
  },

  methods: {
    // 切换歌曲
    async playMusic(musicId) {
      if (musicId) {
        console.log("当前音乐:" + musicId);
        await this.setMusicInfo(musicId)

        //防止url未获得提交信息到父组件
        if (this.musicUrl !== "") {
          await this.$store.commit("playMusic", {
            murl: this.musicUrl,
            detail: this.music,
          });
          this.$notify({
            title: "提示",
            message: "歌曲切换成功",
            type: "success",
          });
        } else {
          this.$notify({
            title: "警告",
            message: "歌曲信息未知",
            type: "warning",
          });
        }
      } else {
        this.$notify({
          title: "警告",
          message: "未能获取到歌曲",
          type: "warning",
        });
        return;
      }
    },

    // 设置音乐信息,不播放
    async setMusicInfo(musicId) {
      await this.getmusicurl(musicId);
      await this.getmusicdetail(musicId);
      // 提交到vuex
      await this.$store.commit("setMusic", {
        detail: this.music,
        murl: this.musicUrl,
      });
      console.log('设置音乐信息完成');
    },

    // 根据id获取音乐url
    async getmusicurl(musicId) {
      await getMusicUrl(musicId).then((res) => {
        this.musicUrl = res.data.data[0].url;
      });
    },

    //根据id获取音乐详情
    async getmusicdetail(musicId) {
      await getMusicDetail(musicId).then((res) => {
        this.music = res.data.songs[0];
      });
    },
  },

}

// 获取评论信息
export const mixComment = {
  data() {
    return {
      //查询评论的信息
      queryInfo: {
        id: this.$route.params.id,
        limit: 20,
        offset: 0,
      },
      //所有评论列表
      commentList: [],
      //最热评论列表
      hotCommentList: [],
      //评论总数
      total: 0,
      //用来显示加载数据,默认不显示
      loading: false,
      //分页器当前页码
      cur_page: 1,
    };
  },
  created() {
    //获取评论列表
    this.get_Comment();
  },

  methods: {
    // 分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.get_Comment();
    },
  },
}
