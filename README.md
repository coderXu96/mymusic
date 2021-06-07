#### 项目安装

```
npm install
```

#### 项目运行
```
npm run serve
```

#### 项目打包
```
npm run build
```

#### 额外安装的依赖

```
less
axios
element-ui
```

#### 目录说明(src下)

```
assets -> 存放css和图片
components -> 组件
components -> common -> 公共组件
filter -> 全局过滤器
networks -> 网络连接
router -> 路由
store -> vuex
```

#### 跨域问题(在项目根目录下新建vue.config.js)

```
module.exports = {
  devServer: {
    proxy: {//解决跨域问题
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
        target: 'https://autumnfish.cn/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

-------更多细节在各文件都有注释-------

