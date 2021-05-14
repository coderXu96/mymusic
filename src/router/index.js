import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入element-ui,并引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入主体
const Main = () => import('../components/Main.vue')

// 发现音乐
const FindMusic = () => import('../components/findMusic/diyRecommend/FindMusic.vue')
const DiyRecommend = () => import('../components/findMusic/diyRecommend/DiyRecommend.vue')
const MusicListPage = () => import("../components/findMusic/musicList/MusicListPage")
const djList = () => import("../components/findMusic/djList/djList")
const MusicRank = () => import("../components/findMusic/rank/MusicRank")
const SingerListPage = () => import("../components/findMusic/singer/SingerListPage")

// 搜索
const SearchPage = () => import('../components/findMusic/search/SearchPage')
const SearchBySong = () => import('../components/findMusic/search/SearchBySong')
const SearchBySinger = () => import('../components/findMusic/search/SearchBySinger')
const SearchByVideo = () => import('../components/findMusic/search/SearchByVideo')
const SearchByPlayList = () => import('../components/findMusic/search/SearchByPlayList')

// 音乐播放详情
const PlayMusicDetailPage = () => import('../components/findMusic/PlayMusicPage/PlayMusicDetailPage.vue')

const routes = [
  {
    path: '/',
    component: Main,
    redirect: 'findMusic',
    children: [
      //首页显示
      {
        path: '/findMusic',
        component: FindMusic,
        redirect: '/diyRecommend',
        children: [
          //个性推荐
          { path: '/diyRecommend', component: DiyRecommend },
          //歌单
          { path: '/musicListPage', component: MusicListPage },
          //dj电台
          { path: '/djList', component: djList },
          //排行榜模块
          { path: '/musicRank', component: MusicRank },
          //歌手表格模块
          { path: '/singerList', component: SingerListPage },
          // //最新音乐模块
          // {path: '/newMusicList', component: NewMusic},
        ]
      },

      //搜索结果页
      {
        path: '/search/:data',
        component: SearchPage,
        children: [
          {
            path: '/searchBySong/:data',
            component: SearchBySong
          },
          {
            path: '/searchBySinger/:data',
            component: SearchBySinger
          },
          {
            path: '/searchByVideo/:data',
            component: SearchByVideo
          },
          {
            path: '/searchByPlayList/:data',
            component: SearchByPlayList
          },
        ]
      },

      //播放详情页
      {
        path: 'musicDetail/:id',
        component: PlayMusicDetailPage
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
