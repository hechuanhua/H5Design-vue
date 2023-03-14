# VUE 版本的低代码设计器

- VUE3 版本的低代码设计器，支持多种容器嵌套，接口请求
- 支持 tid 传入和 title 传入，tid 优先级大于 title
- 前端：vite，vue3，pinia，mac 电脑 node 版本>=16
- 后端：egg，mongodb，代码见 egg 文件夹（暂不开放）

# 预览 

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:5173
```

### 打包 webcomponents

```bash
$ npm i
$ npm run build:lib
```

## 用法示例

```js
<script crossorigin src="https://localhost:5173/dist/designer.min.js"></script>
<vue-designer tid="zzAjDuFz"></vue-designer>
{/* <vue-designer title="我是标题"></vue-designer>; */}
```
