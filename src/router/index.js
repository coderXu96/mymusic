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

// 整体
const Main = () => import('../components/Main.vue')
// 中间+下面固定footer
const Content = () => import('../components/Content.vue')
// 中间
const Container = () => import('../components/Container.vue')

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
const MusicDetail = () => import('../components/musicDetail/MusicDetail.vue')
// mv播放
const MvPlay = () => import('../components/video/MvPlay.vue')


// 路由抽离
// 发现音乐
const FindMusicR = {
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
}

// 搜索结果页
const SearchPageR = {
  path: '/search/:data',
  component: SearchPage,
  redirect: '/searchBySong/:data',
  children: [
    { path: '/searchBySong/:data', component: SearchBySong },
    { path: '/searchBySinger/:data', component: SearchBySinger },
    { path: '/searchByVideo/:data', component: SearchByVideo },
    { path: '/searchByPlayList/:data', component: SearchByPlayList },
  ]
}

// 歌单页面 
const SongListR = {
  path: '/songList/:id',
  component: SongList,
  redirect: '/showMusicList/:id',
  children: [
    { path: '/showMusicList/:id', component: ShowMusicList },
    { path: '/showComment/:id', component: ShowComment }
  ]
}

// 音乐播放详情
const MusicDetailR = {
  path: '/musicDetail/:id',
  component: MusicDetail
}

// 中间部分,不包括底部播放
const ContainerR = {
  path: '/container',
  component: Container,
  redirect: '/findMusic',
  children: [
    { ...FindMusicR },
    { ...SearchPageR },
    { ...SongListR },
  ]
}

// 中间部分,包括底部播放,除去顶部导航栏,
const ContentR = {
  path: 'content',
  component: Content,
  redirect: '/container',
  children: [
    { ...ContainerR },
    { ...MusicDetailR },
  ]
}

// mv播放详情
const MvPlayR = {
  path: '/mvPlay/:id',
  component: MvPlay
}


// 路由配置
const routes = [
  {
    path: '/',
    component: Main,
    redirect: 'content',
    children: [
      { ...ContentR },
      { ...MvPlayR },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
