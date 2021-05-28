<template>
  <div class="container">
    <el-backtop :bottom="80" :visibility-height="400"> </el-backtop>

    <el-row type="flex" justify="center" align="middle" class="header">
      <!-- 唱片 -->
      <el-col :span="8">
        <el-image
          :src="$store.state.music.al.picUrl"
          class="musicPoster"
          ref="musicPoster"
        >
        </el-image>
      </el-col>

      <!-- 歌词 -->
      <el-col :span="8" class="lrcinfo">
        <div class="musicname">{{ $store.state.music.name }}</div>
        <div class="arname">
          <span>{{ $store.state.music.ar[0].name }}</span> -
          <span>{{ $store.state.music.al.name }}</span>
        </div>
        <!--歌词-->
        <div class="lrc">
          <div>
            <ul ref="lyric" class="lyric">
              <li
                v-for="(item, index) in lrcObject"
                :key="index"
                :style="{ color: lyricIndex === index ? 'red' : 'black' }"
              >
                {{ item.c }}
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        搜索发现<br />
        暂未开发
      </el-col>
    </el-row>

    <loading :show="loading"></loading>

    <!-- 评论信息 -->
    <el-row>
      <el-col :offset="4" :span="16">
        <comment-list
          :hottest="hotCommentList"
          :newest="commentList"
          :total="total"
          :offset="queryInfo.offset"
          v-show="!loading"
        ></comment-list>
      </el-col>
    </el-row>

    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="queryInfo.limit"
      :total="total"
      @current-change="handleCurrentChange"
      v-show="!loading"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMusicLrc, getMusicComment } from "@/networks/networks.js";
import Loading from "../common/loading/Loading.vue";
import CommentList from "../common/comment/CommentList.vue";

// 引入mixin
import { mixPlayMusic, mixComment } from "../common/mixin/mixin.js";

export default {
  mixins: [mixPlayMusic, mixComment],
  name: "musicDetail",
  components: {
    CommentList,
    Loading,
  },
  data() {
    return {
      //当前歌词字符串
      lrc: "",
      //解析歌词为对象
      lrcObject: [],
      //当前歌词的所位于歌词对象中的索引值(用于帮助高亮)
      lyricIndex: 0,
      //旋转对象
      rotate: null,
      //旋转角度
      deg: 0,
    };
  },

  mounted() {
    window.scrollTo(0, 0);
    //dom元素加载完毕后,设置ul默认的向上样式
    this.$refs.lyric.style.marginTop = "-10px";
    if (this.$store.state.isPlay) {
      this.cdRotateStart();
    }
  },

  created() {
    //获取音乐的详细信息
    this.getMusicDetail(this.$route.params.id);
    //获取评论列表
    this.get_Comment();
  },

  destroyed() {
    this.cdRotateStod();
  },

  watch: {
    //监听vuex中的进度条变化
    "$store.state.musicDuration"(newVal) {
      //对每次进来的进度条进行判断
      // 跟下一句台词时长是否匹配,如果匹配则当前高亮的索引值+1
      //使用循环帮助****回退  快进****的判断
      for (let i = 0; i < this.lrcObject.length; i++) {
        //这里使用小于符号判断是为了 保证回退音乐进度事件的效果实现性
        if (newVal <= parseFloat(this.lrcObject[i].t)) {
          let lyric = this.$refs.lyric;
          if (this.lyricIndex === i - 1) {
            break;
          }
          //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex = i - 1;
          //当前距离上方的距离  控制歌词上下滚动
          var currentTemp = lyric.style.marginTop;
          currentTemp = currentTemp.substr(0, currentTemp.length - 2);

          //滚动距离
          currentTemp = parseInt(currentTemp);
          if (i > 5) {
            //第五句歌词之后 开始使用定位
            /**
             * 例子
             * 第一句 margin-top 25px
             * 第二句 margin-top 50px
             * 第三句 margin-top 75px;
             * 以此类推
             *  ***计算出给一句歌词一个距离顶部的一个距离
             *  (每次只需要切换到当前距离顶部的位置 实现歌词滚动)
             *  顶部的位置 = 当前高亮歌词索引 * 25 +'px'   ***
             * @type {number}
             */
            currentTemp = (i - 5) * -35;
            //设置样式
            lyric.style.marginTop = currentTemp + "px";
          }

          //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
          if (this.lyricIndex === this.lrcObject.length - 1) {
            this.lyricIndex = 0;
          }
          break;
        }
      }
    },

    "$store.state.isPlay"(newVal) {
      if (newVal) {
        this.cdRotateStart();
      } else {
        this.cdRotateStod();
      }
    },
  },

  methods: {
    // 查询评论
    get_Comment() {
      console.log("我没生效");
      this.loading = true;
      getMusicComment(this.queryInfo).then((res) => {
        this.commentList = res.data.comments;
        this.hotCommentList = res.data.hotComments;
        this.total = res.data.total;
        this.loading = false;
        this.cur_page = 1;
      });
    },

    // 根据id获取音乐详情
    async getMusicDetail(musicId) {
      await this.setMusicInfo(musicId);
      // 获取歌词
      getMusicLrc(this.$store.state.curId).then((res3) => {
        if (res3.data.lrc) {
          this.lrc = res3.data.lrc.lyric;
          //解析歌词
          this.createLrcObj(this.lrc);
        }
      });
    },

    // 解析歌词
    createLrcObj(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(
          lrcs[i].indexOf("[") + 1,
          lrcs[i].indexOf("]")
        ); //取[]间的内容
        var s = t.split(":"); //分离:前后文字
        if (isNaN(parseInt(s[0]))) {
          //不是数值
          for (var i in oLRC) {
            if (i != "ms" && i == s[0].toLowerCase()) {
              oLRC[i] = s[1];
            }
          }
        } else {
          //是数值
          var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
          var start = 0;
          for (var k in arr) {
            start += arr[k].length; //计算歌词位置
          }
          var content = lrcs[i].substring(start); //获取歌词内容
          for (var k in arr) {
            var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
            // var t = arr[k]
            var s = t.split(":"); //分离:前后文字
            oLRC.ms.push({
              //对象{t:时间,c:歌词}加入ms数组
              // t: t,
              t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
              c: content === "" ? ".............." : content,
            });
          }
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      this.lrcObject = oLRC.ms;
    },

    // cd旋转
    cdRotateStart() {
      let musicPoster = this.$refs.musicPoster.$el;
      this.rotate = window.setInterval(() => {
        musicPoster.style.transform = "rotate(" + this.deg + "deg)";
        this.deg++;
      }, 25);
    },

    // cd停止旋转
    cdRotateStod() {
      window.clearInterval(this.rotate);
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  text-align: center;
  height: calc(100vh -250) p !important;
}

.lrcinfo {
  height: 500px;
  text-align: center;
  .musicname {
    font-size: 2rem;
  }
  .arname {
    margin-top: 10px;
    color: #909399;
  }
  .lrc {
    max-height: 400px;
    margin-top: 25px;
    overflow: hidden;
    .lyric {
      padding-inline-start: 0px;
    }
    .lyric > li {
      list-style: none;
      margin-top: 15px;
    }
  }
}

.musicPoster {
  width: 200px;
  height: 200px;
  border: 35px solid black;
  border-radius: 100%;
  box-shadow: 0 0 5px 5px rgb(219, 219, 219);
}
</style>