<template>
  <div style="margin-left: 120px">
    <el-row
      type="flex"
      justify="center"
      align="middle"
      style="text-align: center"
    >
      <el-col :span="8">
        <!-- 封面 -->
        <el-image :src="$store.state.music.al.picUrl" class="musicPoster">
        </el-image>
      </el-col>
      <el-col :span="8">
        <div style="text-align: center">
          <div style="font-size: 2rem">{{ $store.state.music.name }}</div>
          <div style="margin-top: 10px; color: #909399">
            <span>{{ $store.state.music.ar[0].name }}</span> -
            <span>{{ $store.state.music.al.name }}</span>
          </div>
          <!--歌词-->
          <div style="max-height: 400px; margin-top: 25px; overflow: hidden">
            <div>
              <ul id="lyric">
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
        </div>
      </el-col>
      <el-col :span="8">
        搜索发现<br />
        暂未开发
      </el-col>
    </el-row>
    <el-row
      v-show="toggle == 1"
      type="flex"
      justify="center"
      style="margin-top: 25px"
    >
      <i class="el-icon-loading" style="font-size: 20px"></i>评论加载中
    </el-row>
    <el-row v-show="toggle == 2">
      <el-col :offset="3" :span="15">
        <h4 style="font-weight: 300" v-if="queryInfo.offset === 0">精彩评论</h4>
        <!--精彩评论的信息-->
        <div
          v-for="(item, index) in hotCommentList"
          :key="item + index"
          style="
            position: relative;
            border-top: 2px solid rgb(240, 240, 242);
            border-bottom: 1px solid rgb(240, 240, 242);
            padding: 15px 0;
            font-size: 15px;
          "
        >
          <div>
            <!--用户头像-->
            <img
              :src="item.user.avatarUrl"
              alt=""
              style="
                display: inline;
                width: 50px;
                height: 50px;
                border-radius: 25px;
              "
            />

            <!--评论信息-->
            <div style="margin-left: 60px; margin-top: -60px">
              <p>
                <span style="color: #4d99de">{{ item.user.nickname }}</span
                >: {{ item.content }}
              </p>

              <br v-if="item.beReplied.length > 0" />
              <!--子评论-->
              <div
                v-if="item.beReplied.length > 0"
                style="background-color: rgb(241, 241, 244); padding: 5px 5px"
              >
                <p v-for="(citem, index) in item.beReplied" :key="index">
                  <span style="color: #4d99de">{{ citem.user.nickname }}</span
                  >: {{ citem.content }}
                </p>
              </div>

              <p
                style="
                  display: block;
                  font-size: 13px;
                  color: gray;
                  opacity: 0.7;
                "
              >
                {{ item.time | dateFormat }}
              </p>
            </div>
          </div>
        </div>

        <h4 style="font-weight: 300; margin-top: 25px">
          最新评论({{ total }})
        </h4>
        <!--所有评论的信息-->
        <div
          v-for="(item, index) in commentList"
          :key="index"
          style="
            position: relative;
            border-top: 2px solid rgb(240, 240, 242);
            border-bottom: 1px solid rgb(240, 240, 242);
            padding: 15px 0;
            font-size: 15px;
          "
        >
          <div>
            <!--用户头像-->
            <img
              :src="item.user.avatarUrl"
              alt=""
              style="
                display: inline;
                width: 50px;
                height: 50px;
                border-radius: 25px;
              "
            />

            <!--评论信息-->
            <div style="margin-left: 60px; margin-top: -60px">
              <p>
                <span style="color: #4d99de">{{ item.user.nickname }}</span
                >: {{ item.content }}
              </p>

              <br v-if="item.beReplied.length > 0" />
              <!--子评论-->
              <div
                v-if="item.beReplied.length > 0"
                style="background-color: rgb(241, 241, 244); padding: 5px 5px"
              >
                <p v-for="(citem, index) in item.beReplied" :key="index">
                  <span style="color: #4d99de">@{{ citem.user.nickname }}</span
                  >: {{ citem.content }}
                </p>
              </div>

              <p
                style="
                  display: block;
                  font-size: 13px;
                  color: gray;
                  opacity: 0.7;
                "
              >
                {{ item.time | dateFormat }}
              </p>
            </div>
          </div>
        </div>

        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="queryInfo.limit"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前歌词字符串
      lrc: "",
      //解析歌词为对象
      lrcObject: [],
      //当前歌词的所位于歌词对象中的索引值(用于帮助高亮)
      lyricIndex: 0,

      //查询评论的信息
      queryInfo: {
        id: this.$route.params.id,
        limit: 10,
        offset: 0,
      },
      //所有评论列表
      commentList: [],
      //最热评论列表
      hotCommentList: [],
      //评论总数
      total: 0,
      //用来显示加载数据,默认不显示
      toggle: 2,
      //分页器当前页码
      cur_page: 1,
    };
  },

  created() {
    //获取音乐的详细信息
    this.getMusicDetail(this.$route.params.id);
    //获取歌曲的歌词
    this.getMusicLrc();
    //查询该歌曲的评论信息
    this.getMusicComment();
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
          let lyric = document.querySelector("#lyric");
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
  },

  methods: {
    //根据id获取音乐详情
    getMusicDetail(musicId) {
      this.$http.get("song/url", { params: { id: musicId } }).then((res) => {
        if (res.data.data[0].url !== "") {
          this.$http
            .get("song/detail", { params: { ids: musicId } })
            .then((r) => {
              this.$store.commit("setMusic", {
                murl: res.data.data[0].url,
                detail: r.data.songs[0],
              });
              // 获取歌词
              this.getMusicLrc();
            });
        }
      });
    },

    //获取歌曲的歌词
    getMusicLrc() {
      this.$http
        .get("lyric", { params: { id: this.$store.state.curId } })
        .then((res) => {
          //获取歌词
          if (res.data.lrc) {
            this.lrc = res.data.lrc.lyric;
            //解析歌词
            this.createLrcObj(this.lrc);
          }
        });
    },

    //解析歌词
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

    //查询评论
    getMusicComment() {
      this.toggle = 1;
      this.$http
        .get("comment/music", { params: this.queryInfo })
        .then((res) => {
          if (res.data.code !== 200) {
            this.$notify.error({
              title: "错误",
              message: "这是一条错误的提示消息",
            });
          } else {
            this.commentList = res.data.comments;
            this.hotCommentList = res.data.hotComments;
            this.total = res.data.total;
          }
          this.toggle = 2;
          this.cur_page = 1;
        });
    },

    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.getMusicComment();
    },
  },
};
</script>
<style lang='less' scoped>
.musicPoster {
  width: 200px;
  height: 200px;
  border: 35px solid black;
  border-radius: 100%;
  box-shadow: 0 0 5px 5px rgb(219, 219, 219);
}
#lyric {
  padding-inline-start: 0px;
}
#lyric > li {
  list-style: none;
  margin-top: 15px;
}
</style>