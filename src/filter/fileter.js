import Vue from 'vue'

// 毫秒->年月日时分秒
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


// 毫秒->年月日
Vue.filter('dateFormatToYMD', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})


// 秒->转化为分钟
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

// 以万为计算单位
Vue.filter('to10000', function (count) {
  if (count >= 10000) {
    count = (count / 10000).toFixed(0) + "万"
  }
  return count
})

