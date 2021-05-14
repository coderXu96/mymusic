import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //播放音乐的链接
    musicUrl: '',
    //当前音乐详情对象
    music: {
      name: '',
      al: {
        picUrl: require("@/assets/images/default_music_pic.jpg")
      },
      ar: [{
        name: ''
      }]
    },
    //当前音乐的进度条
    musicDuration: 0,
    //当前音乐的id
    curId: 0,
    //总进度条
    totalDuration: 0,
    //默认是否在播放
    isPlay: false,
    //判断是否被拖动
    isChange: false
  },
  mutations: {
    // 播放音乐
    playMusic(state, payload) {
      state.music = payload.detail
      state.musicUrl = payload.murl
      state.curId = payload.detail.id
      // 调用设置
      this.commit('setAudioTagsInfo')
    },
    //设置audio的各种信息
    setAudioTagsInfo(state) {
      let audio = document.querySelector('.playMusicAudio')
      // 监听audio的timeUpdate事件
      audio.addEventListener("timeupdate", () => {
        // 如果处于被拖动就退出更新
        if(state.isChange) return
        //获取歌曲的总长度 example: 257s
        state.totalDuration = audio.duration
        //获取歌曲时间
        state.musicDuration = audio.currentTime

        //当前歌曲播放完毕自动播放下一首
        // if (audio.currentTime >= audio.duration) {
        //   this.changeNextMusic()
        // }
      });
      // 更新音乐播放状态
      state.isPlay = true
    }
  },
  actions: {
  },
  modules: {
  }
})
