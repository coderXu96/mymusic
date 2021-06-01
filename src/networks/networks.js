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
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function getSearchResult(queryInfo) {
  return axios.get("/search", { params: queryInfo })
}

//获取当前mv的详细数据
export function getMvDetailInfo(curMvId) {
  return axios.get("/mv/detail", { params: { mvid: curMvId } })
}

//获取当前mv的url
export function getMvUrl(curMvId) {
  return axios.get("mv/url", { params: { id: curMvId } })
}

//获取相关的mv
export function getSimiMvs(curMvId) {
  return axios.get("simi/mv", { params: { mvid: curMvId } })
}

// 获取mv评论
export function getMvCommentList(queryInfo) {
  return axios.get("comment/mv", { params: queryInfo })
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



