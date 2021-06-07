import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用公共less
import '@/assets/css/common.less';

// 引入过滤器
import './filter/fileter.js'

// 引用 axios
import axios from 'axios'
// 设置默认的请求头部url
axios.defaults.baseURL = '/api';


//监听localstorage中的 curPlayMusicId
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'curPlayMusicId') {

    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  } else if (key === 'currentId') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);

        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
