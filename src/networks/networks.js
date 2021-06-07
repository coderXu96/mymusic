// 引入axios
import axios from 'axios'

// 设置默认的请求头部url
axios.defaults.baseURL = '/api';

// 获取轮播图数据
export function getBannerInfo() {
  return axios.get("banner")
}

// 获取推荐歌单数据
export function getMusicList() {
  return axios.get("/top/playlist", {
    params: {
      offset: (Math.random() * 1297).toFixed(0) - 10,
      limit: 10,
    },
  })
}

// 获取独家放送的数据
export function getPrivateList() {
  return axios.get("/personalized/privatecontent")
}

// 获取最新音乐的推送信息
export function getNewmusicList() {
  return axios.get("personalized/newsong", { params: { limit: 12 } })
}

// 根据id获取音乐url
export function getMusicUrl(musicId) {
  return axios.get("song/url", { params: { id: musicId } })
}

// 根据id获取音乐详情
export function getMusicDetail(musicId) {
  return axios.get("song/detail", { params: { ids: musicId } })
}

// 获取歌词
export function getMusicLrc(id) {
  return axios.get("lyric", { params: { id: id } })
}

// 获取最新音乐
export function getNewMusic(queryInfo) {
  return axios.get("top/song", { params: queryInfo })
}

// 获取歌手数据
export function getSingerList(queryInfo) {
  return axios.get("artist/list", { params: queryInfo })
}

// 获取热门歌单标签信息
export function getHotMusicListTags() {
  return axios.get("playlist/hot")
}

// 获取精品歌单
export function getGoodMusicList(queryInfo) {
  return axios.get("/top/playlist", { params: queryInfo })
}

// 获取官方榜单的数据
export function getOfficialRankList() {
  return axios.get("toplist/detail")
}

// 获取歌曲评论
export function getMusicComment(queryInfo) {
  return axios.get("comment/music", { params: queryInfo })
}

// 获取歌单信息
export function getSongListInfo(currentId) {
  return axios.get("playlist/detail", { params: { id: currentId } })
}

// 获取歌单评论
export function getCommentList(queryInfo) {
  return axios.get("comment/playlist", { params: queryInfo })
}

// 搜索
// 获取热搜列表
export function getSearchHotDetail() {
  return axios.get("/search/hot/detail")
}

// 搜索建议
export function getSearchSuggest(keywords) {
  return axios.get("/search/suggest", { params: { keywords: keywords } })
}

// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function getSearchResult(queryInfo) {
  return axios.get("/search", { params: queryInfo })
}

//获取当前mv的详细数据
export function getMvDetailInfo(mvid) {
  return axios.get("/mv/detail", { params: { mvid: mvid } })
}

//获取当前mv的url
export function getMvUrl(id) {
  return axios.get("mv/url", { params: { id: id } })
}

//获取相关的mv
export function getSimiMvs(mvid) {
  return axios.get("simi/mv", { params: { mvid: mvid } })
}

// 获取mv评论
export function getMvCommentList(queryInfo) {
  return axios.get("comment/mv", { params: queryInfo })
}

//获取当前视频的详细数据
export function getVideoDetailInfo(id) {
  return axios.get("/video/detail", { params: { id: id } })
}

//获取当前视频的url
export function getVideoUrl(id) {
  return axios.get("/video/url", { params: { id: id } })
}

//获取相关的视频
export function getRelatedVideos(id) {
  return axios.get("/related/allvideo", { params: { id: id } })
}

// 获取视频评论
export function getVideoCommentList(queryInfo) {
  return axios.get("comment/video", { params: queryInfo })
}

// 获取歌手热门50首歌
export function getHot50Music(singerId) {
  return axios.get("artist/top/song", { params: { id: singerId } })
}

// 获取歌手的热门专辑信息
export function getHotAlbum(queryInfo) {
  return axios.get("artist/album", { params: queryInfo })
}

// 获取歌手mv的信息
export function getSingerMv(queryInfo) {
  return axios.get("artist/mv", { params: queryInfo })
}

// 获取专辑信息
export function getAlbumInfo(albumId) {
  return axios.get("/album", { params: { id: albumId } })
}

// 获取专辑评论
export function getAlbumComment(queryInfo) {
  return axios.get("/comment/album", { params: queryInfo })
}

// 视频分类(需要登录)
export function getVideoCategory() {
  return axios.get('/video/category/list')
}

// 获取视频分类下的视频
export function getVideoGroup(queryInfo) {
  return axios.get('/video/group', { params: queryInfo })
}

// 获取全部视频列表(需要登录)
export function getAllVideo(queryInfo) {
  return axios.get('/video/timeline/all', { params: queryInfo })
}

// 最新mv
export function getNewMv(queryInfo) {
  return axios.get('/mv/first', { params: queryInfo })
}

// 网易出品mv
export function getOfficialMv(queryInfo) {
  return axios.get('/mv/exclusive/rcmd', { params: queryInfo })
}

// mv排行
export function getTopMv(queryInfo) {
  return axios.get('/top/mv', { params: queryInfo })
}

// 获取登录状态
export function getLoginStatus() {
  return axios.get('/login/status')
}

// 手机号登录
export function getLoginByCellphone(loginInfo) {
  return axios.get('/login/cellphone', { params: loginInfo })
}

// 退出登录
export function getLogout(){
  return axios.get('/logout')
}

// 获取账号信息 
export function getUserAccount(){
  return axios.get('/user/account')
}


