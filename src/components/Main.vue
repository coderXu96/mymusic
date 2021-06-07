<template>
  <el-container>
    <el-backtop :bottom="80" :visibility-height="400"> </el-backtop>
    <!-- 头部 -->
    <el-header class="header">
      <music-header @login="showlogin" @logout="showlogout"></music-header>
    </el-header>

    <!-- 中间 -->
    <el-main class="main">
      <keep-alive exclude="mvPlay">
        <router-view ref="child"></router-view>
      </keep-alive>
    </el-main>

    <!-- 登录模态框 -->
    <el-dialog
      :visible.sync="loginDialogVisible"
      width="25%"
      title="登录"
      :center="true"
    >
      <div class="login">
        <el-form :model="loginInfo" status-icon :rules="rules" ref="loginForm" @submit.native.prevent>
          <el-form-item prop="phone">
            <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-mobile"
              v-model="loginInfo.phone"
              maxlength="11"
              show-word-limit
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
              v-model="loginInfo.password"
              class="password"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              class="loginbtn"
              native-type="submit"
              @click="login('loginForm')"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 退出登录模态框 -->
    <el-dialog title="提示" :visible.sync="logoutDialogVisible" width="30%">
      <span>确定退出登录吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout"> 确 定 </el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
// 引入网络连接
import {
  getLoginByCellphone,
  getLogout,
  getUserAccount,
} from "@/networks/networks.js";

import MusicFooter from "./MusicFooter.vue";
import MusicHeader from "./MusicHeader.vue";

export default {
  components: {
    MusicHeader,
    MusicFooter,
  },

  data() {
    var validatePhone = (rule, value, callback) => {
      let regx = /^([1][3,4,5,6,7,8,9])\d{9}$/;
      if (!regx.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      // 播放音乐的链接
      musicUrl: "",
      searchData: "",
      loginDialogVisible: false,
      logoutDialogVisible: false,

      loginInfo: {
        // 手机号
        phone: "",
        // 密码
        password: "",
      },
      // 检验规则
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },

  methods: {
    // 显示登录模态框
    showlogin() {
      this.loginDialogVisible = true;
    },

    // 显示退出模态框
    showlogout() {
      console.log("showlogout");
      this.logoutDialogVisible = true;
    },

    // 登录
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单提交
          getLoginByCellphone(this.loginInfo).then((res) => {
            if (res.data.code != 200) {
              this.$message.error(res.data.msg);
            } else {
              this.$store.commit("login");
              getUserAccount().then((res) => {
                this.$store.commit("setUserProfile", res.data.profile);
              });
              this.loginDialogVisible = false;
              this.$message.success("登录成功");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 退出登录
    logout() {
      getLogout().then((res) => {
        if (res.data.code == 200) {
          this.logoutDialogVisible = false;
          this.$store.commit("logout");
          this.$message.success("退出成功");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
//头部高度为60px,底部高度为80px z-idnex为999
@themecolor: #e60026;

.header {
  background: @themecolor;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw; //不要使用100%,避免出现滚动条时页面晃动
  height: 60px;
  z-index: 999;
}

.main {
  margin: 60px 0px 70px 0px;
}

.el-menu {
  .el-menu-item {
    font-size: 18px;
  }
  .is-active {
    font-weight: 900;
    color: black;
  }
}

// 登录模态框
.login {
  padding: 20px;
  .loginbtn {
    width: 100%;
  }
}
</style>



 




       