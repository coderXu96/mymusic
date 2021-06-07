<template>
  <div class="header">
    <div class="left">
      <!-- logo -->
      <div @click="toIndex" class="logo">
        <el-image :src="logo_pic" class="logo_pic"> </el-image>
        V-Music
      </div>

      <!-- 返回 -->
      <div class="backbtn">
        <el-button
          icon="el-icon-back"
          size="mini"
          circle
          @click="$router.go(-1)"
        ></el-button>
        <el-button
          icon="el-icon-right"
          size="mini"
          circle
          @click="$router.go(1)"
        ></el-button>
      </div>

      <!-- 搜索 -->
      <div class="search">
        <el-autocomplete
          clearable
          v-model="search"
          :fetch-suggestions="querySearchAsync"
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          @select="handleSelect"
          @keyup.enter.native="toSearchPage"
        >
          <template slot-scope="{ item }">
            <div v-show="!haskeyword">
              <div class="slotcont">
                <div class="index" :class="{ highlight: item.index < 4 }">
                  {{ item.index }}
                </div>
                <div class="info">
                  <div class="firstcol">
                    <div class="searchWord">{{ item.searchWord }}</div>
                    <img :src="item.iconUrl" class="iconUrl" />
                    <span class="score">{{ item.score }}</span>
                  </div>
                  <div class="secondcol">
                    <div class="content">{{ item.content }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-show="haskeyword" class="haskeyword">
              <div class="enter">
                <span>按下回车搜索</span>
                <img :src="enter_pic" class="enter_pic" />
              </div>
            </div>
          </template>
        </el-autocomplete>
      </div>
    </div>

    <!-- 个人 -->
    <div class="right">
      <el-image
        :src="isLogin ? userProfile.avatarUrl : user_pic"
        class="avatar"
      >
      </el-image>
      <span v-if="isLogin">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userProfile.nickname
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-refresh">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span v-else class="login" @click="$emit('login')">点击登录</span>
    </div>
  </div>
</template>

<script>
import { getSearchHotDetail, getUserAccount } from "@/networks/networks.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      visible: false,
      search: "",
      logo_pic: require("@/assets/images/logo_pic.png"),
      user_pic: require("@/assets/images/user_pic.png"),
      enter_pic: require("@/assets/images/enter_pic.png"),
      // 是否有搜索关键字
      haskeyword: false,
      // 搜索建议结果
      searchResult: {},
    };
  },

  computed: {
    ...mapState(["isLogin", "userProfile"]),
  },

  created() {
    this.get_user_account();
  },

  methods: {
    handleCommand() {
      this.$emit("logout");
    },

    // 用户信息
    get_user_account() {
      getUserAccount().then((res) => {
        if (res.data.profile != null) {
          this.$store.commit("setUserProfile", res.data.profile);
        }
      });
    },

    // 回车搜索
    toSearchPage() {
      this.search = this.search.replace(/(^\s*)|(\s*$)/g, "");
      this.routerTo(this.search);
    },

    // 路由跳转
    routerTo(search) {
      //encodeURIComponent参数转换 应对中文参数
      if (search) {
        // 保存要跳转的路由
        let path = "";
        // 给 vuex 发送更改后的数据
        this.$store.commit("changeSearch", { search: search });

        // 路由判断
        let searchBySong = /^\/searchBySong\/((?:[^\/]+?))(?:\/(?=$))?$/i;
        if (searchBySong.test(this.$route.path)) {
          path = "/searchBySong/";
        }

        let searchBySinger = /^\/searchBySinger\/((?:[^\/]+?))(?:\/(?=$))?$/i;
        if (searchBySinger.test(this.$route.path)) {
          path = "/searchBySinger/";
        }

        let searchByAlbum = /^\/searchByAlbum\/((?:[^\/]+?))(?:\/(?=$))?$/i;
        if (searchByAlbum.test(this.$route.path)) {
          path = "/searchByAlbum/";
        }

        let searchByVideo = /^\/searchByVideo\/((?:[^\/]+?))(?:\/(?=$))?$/i;
        if (searchByVideo.test(this.$route.path)) {
          path = "/searchByVideo/";
        }

        let searchByPlayList =
          /^\/searchByPlayList\/((?:[^\/]+?))(?:\/(?=$))?$/i;
        if (searchByPlayList.test(this.$route.path)) {
          path = "/searchByPlayList/";
        }

        // 以上都没有匹配上的话就默认跳转到单曲页面
        if (path) {
          this.$router.push(path + encodeURIComponent(this.search));
        } else {
          this.$router.push("/searchBySong/" + encodeURIComponent(this.search));
        }
      }
    },

    // 搜索建议
    querySearchAsync(queryString, cb) {
      queryString = queryString.replace(/(^\s*)|(\s*$)/g, "");
      if (queryString == "") {
        this.haskeyword = false;
        getSearchHotDetail().then((res) => {
          res.data.data.forEach((item, index) => {
            item["index"] = index + 1;
          });
          console.log(res.data.data);
          cb(res.data.data);
        });
      } else {
        this.haskeyword = true;
        let arr = [];
        arr[0] = { msg: "开发中...." };
        cb(arr);
      }
    },

    // 选择
    handleSelect(item) {
      this.search = item.searchWord;
      this.routerTo(item.searchWord);
    },

    // 回到主页
    toIndex() {
      this.$router.push("/diyRecommend");
    },
  },
};
</script>

<style lang='less' scoped>
@themecolor: #e60026;
@graycolor: #909399;

/deep/ .el-dropdown-link {
  color: white;
  cursor: pointer;
}

.header {
  display: flex;
  align-items: center;

  .left {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .logo_pic {
      height: 25px;
      width: 25px;
      margin-right: 8px;
    }
    .logo {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .backbtn {
      margin-left: 20px;
    }
    .search {
      margin-left: 15px;
      /deep/.el-input__inner {
        border: none;
        border-radius: 30px;
      }
    }
  }

  .right {
    width: auto;
    display: flex;
    align-items: center;
    padding-right: 50px;
    .login {
      cursor: pointer;
    }
    .avatar {
      height: 25px;
      width: 25px;
      margin-right: 8px;
      border-radius: 50%;
    }
  }
}

// 搜索建议
.slotcont {
  display: flex;
  align-items: center;
  padding: 8px 0px;
  line-height: 1rem;
  font-size: 0.8rem;
  margin: 5px 0px;
  .index {
    font-size: 1rem;
    color: @graycolor;
  }
  .highlight {
    color: @themecolor;
  }
  .info {
    margin-left: 15px;
    .firstcol {
      display: flex;
      align-items: center;
      .searchWord {
        font-weight: bolder;
      }
      .iconUrl {
        height: 16px;
        margin-left: 10px;
      }
      .score {
        margin-left: 5px;
        font-size: 0.6rem;
        color: @graycolor;
      }
    }
    .secondcol {
      margin-top: 6px;
      .content {
        font-size: 0.6rem;
        color: @graycolor;
      }
    }
  }
}

.enter {
  display: flex;
  align-items: center;
  .enter_pic {
    height: 25px;
  }
}
</style>