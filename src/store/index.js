import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 登录状态
    isLogin: false,
    // 用户信息
    userProfile: [],
    // 搜索内容
    search: '',
    // 播放音乐的链接
    musicUrl: '',
    // 当前音乐详情对象
    music: {
      name: '',
      al: {
        picUrl: require("@/assets/images/default_music_pic.jpg")
      },
      ar: [{
        name: ''
      }]
    },
    // 当前音乐的进度条
    musicDuration: 0,
    // 当前音乐的id
    curId: 0,
    // 总进度条
    totalDuration: 0,
    // 默认是否在播放
    isPlay: false,
    // 判断是否被拖动
    isChange: false
  },
  mutations: {
    // 修改搜索内容
    changeSearch(state, payload) {
      state.search = payload.search
    },

    // 播放音乐
    playMusic(state, payload) {
      this.commit('setMusic', payload)
      this.commit('musicPlaying')
      state.isPlay = true
    },

    // 设置音乐信息
    setMusic(state, payload) {
      state.music = payload.detail
      state.musicUrl = payload.murl
      state.curId = payload.detail.id

      // 调用设置
      this.commit('getMusicDuration')
    },

    // 获取音频长度
    getMusicDuration(state) {
      let audio = document.querySelector('.playMusicAudio')
      //获取歌曲的总长度 example: 257s
      state.totalDuration = audio.duration
      //获取歌曲时间
      state.musicDuration = audio.currentTime
    },

    // 播放音乐
    musicPlaying(state) {
      let audio = document.querySelector('.playMusicAudio')
      state.isPlay = true
      audio.play()
      // 监听audio的timeUpdate事件
      audio.addEventListener("timeupdate", () => {
        // 如果处于被拖动就退出更新
        if (state.isChange) return
        this.commit('getMusicDuration')
      });
    },

    // 播放完毕
    musicEnded(state) {
      state.isPlay = false
    },

    // 登录成功
    login(state) {
      state.isLogin = true
    },

    // 退出成功
    logout(state) {
      state.isLogin = false
      state.userProfile = null
    },

    // 设置用户信息
    setUserProfile(state, payload) {
      state.isLogin = true
      state.userProfile = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
