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
export function getMusicDetail(musicId){
  return axios.get("song/detail", { params: { ids: musicId } })
}