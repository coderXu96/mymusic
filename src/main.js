import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用公共less
import '@/assets/css/common.less';

// 引用 axios
import axios from 'axios'
// 设置默认的请求头部url
axios.defaults.baseURL = '/api';

// 原型链挂载
Vue.prototype.$http = axios;

//全局vue过滤器(时间戳过滤器)
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`
})

//全局过滤器(秒数转化为分钟)
Vue.filter('timeFormat', function (time) {
  //分钟
  var minute = time / 60;
  var minutes = parseInt(minute);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //秒
  var second = time % 60;
  var seconds = Math.round(second);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
