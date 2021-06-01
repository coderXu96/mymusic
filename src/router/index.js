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
const FindMusic = () => import('../components/findMusic/FindMusic.vue')
const DiyRecommend = () => import('../components/findMusic/DiyRecommend.vue')
const MusicList = () => import("../components/findMusic/MusicList.vue")
const MusicRank = () => import("../components/findMusic/MusicRank.vue")
const SingerList = () => import("../components/findMusic/SingerList.vue")
const NewMusic = () => import('../components/findMusic/NewMusic.vue')



// 搜索
const SearchPage = () => import('../components/search/SearchPage.vue')
const SearchBySong = () => import('../components/search/SearchBySong.vue')
const SearchBySinger = () => import('../components/search/SearchBySinger.vue')
const SearchByAlbum = () => import('../components/search/SearchByAlbum.vue')
const SearchByVideo = () => import('../components/search/SearchByVideo.vue')
const SearchByPlayList = () => import('../components/search/SearchByPlayList.vue')

// 歌单页面
const SongList = () => import('../components/songList/SongList.vue')
const ShowMusicList = () => import('../components/songList/ShowMusicList.vue')
const ShowComment = () => import('../components/songList/ShowComment.vue')

// 专辑页面
const AlbumDetail = () => import('../components/album/AlbumDetail.vue')
const AlbumComment = () => import('../components/album/AlbumComment.vue')
const AlbumMusicList = () => import('../components/album/AlbumMusicList.vue')

// 歌手
const Singer = () => import('../components/singer/Singer.vue')
const SingerAlbum = () => import('../components/singer/SingerAlbum.vue')
const SingerMv = () => import('../components/singer/SingerMv.vue')
const SingerDesc = () => import('../components/singer/SingerDesc.vue')

// 音乐播放详情
const MusicDetail = () => import('../components/musicDetail/MusicDetail.vue')
// mv播放
const MvPlay = () => import('../components/video/MvPlay.vue')


// 路由抽离
// 音乐播放详情
const MusicDetailR = {
  path: '/musicDetail/:id',
  component: MusicDetail
}

// 歌手页面
const SingerR = {
  path: '/singer/:id',
  component: Singer,
  redirect: '/singerAlbum/:id',
  children: [
    //歌手专辑页
    { path: '/singerAlbum/:id', component: SingerAlbum },
    //歌手推荐MV页面
    { path: '/singerMv/:id', component: SingerMv },
    //歌手详细页面
    { path: '/singerDesc/:id', component: SingerDesc }
  ]
}

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
    { path: '/SearchByAlbum/:data', component: SearchByAlbum },
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

// 专辑页面
const AlbumDetailR = {
  path: '/albumDetail/:id',
  component: AlbumDetail,
  redirect: '/albumMusicList/:id',
  children: [
    { path: '/albumMusicList/:id', component: AlbumMusicList },
    { path: '/albumComment/:id', component: AlbumComment }
  ]
}

// 中间部分,有侧边栏,不包括底部播放
const ContainerR = {
  path: '/container',
  component: Container,
  redirect: '/findMusic',
  children: [
    { ...FindMusicR },
    { ...SearchPageR },
    { ...SongListR },
    { ...AlbumDetailR },
    { ...SingerR }
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
