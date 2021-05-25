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

// 搜索单曲
export function getSearchResult(queryInfo) {
  return axios.get("/search", { params: queryInfo })
}

