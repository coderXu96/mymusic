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
