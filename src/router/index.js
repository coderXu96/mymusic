import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 引入element-ui,并引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入主体
const Main = () => import('../components/Main.vue')
const container = () => import('../components/container/container.vue')

// 发现音乐
const FindMusic = () => import('../components/findMusic/home/FindMusic.vue')
const DiyRecommend = () => import('../components/findMusic/diyRecommend/DiyRecommend.vue')
const MusicList = () => import("../components/findMusic/musicList/MusicList.vue")
const MusicRank = () => import("../components/findMusic/musicRank/MusicRank.vue")
const SingerList = () => import("../components/findMusic/singer/SingerList.vue")
const NewMusic = () => import('../components/findMusic/newMusic/NewMusic.vue')

// 歌单页面
const SongList = () => import('../components/songList/SongList.vue')
const ShowMusicList = () => import('../components/songList/ShowMusicList.vue')
const ShowComment = () => import('../components/songList/ShowComment.vue')

// 搜索
const SearchPage = () => import('../components/findMusic/search/SearchPage.vue')
const SearchBySong = () => import('../components/findMusic/search/SearchBySong.vue')
const SearchBySinger = () => import('../components/findMusic/search/SearchBySinger.vue')
const SearchByVideo = () => import('../components/findMusic/search/SearchByVideo.vue')
const SearchByPlayList = () => import('../components/findMusic/search/SearchByPlayList.vue')

// 音乐播放详情
const musicDetail = () => import('../components/findMusic/musicDetail/musicDetail.vue')

const routes = [
  {
    path: '/',
    component: Main,
    redirect: 'container',
    children: [
      {
        path: '/container',
        component: container,
        redirect: 'findMusic',
        children: [
          // 首页
          {
            path: '/findMusic',
            component: FindMusic,
            redirect: '/diyRecommend',
            children: [
              //个性推荐
              { path: '/diyRecommend', component: DiyRecommend },
              // 歌单
              { path: '/musicList', component: MusicList },
              // 排行榜模块
              { path: '/musicRank', component: MusicRank },
              // 歌手表格模块
              { path: '/SingerList', component: SingerList },
              // 最新音乐模块
              { path: '/newMusicList', component: NewMusic },

            ]
          },

          // 搜索结果页
          {
            path: '/search/:data',
            component: SearchPage,
            redirect: '/searchBySong/:data',
            children: [
              { path: '/searchBySong/:data', component: SearchBySong },
              { path: '/searchBySinger/:data', component: SearchBySinger },
              { path: '/searchByVideo/:data', component: SearchByVideo },
              { path: '/searchByPlayList/:data', component: SearchByPlayList },
            ]
          },

          // 歌单页面
          {
            path: '/songList/:id',
            component: SongList,
            redirect: '/showMusicList/:id',
            children: [
              { path: '/showMusicList/:id', component: ShowMusicList },
              { path: '/showComment/:id', component: ShowComment }
            ]
          },

        ]
      },


      // 播放详情页
      {
        path: '/musicDetail/:id',
        component: musicDetail
      },
    ],
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
