# VUE 版本的低代码设计器

- VUE3 版本的低代码设计器，支持多种容器嵌套，接口请求，支持参数和数据监听，可以支撑自定义业务逻辑
- 支持webcomponents打包成js文件，任何页面都可以通过script src的方式接入
- 支持 npm publish发布到npm或者私用库，通过 esm import的方式引入
- 支持 tid 传入和 title 传入，tid 优先级大于 title
- 前端：vite，vue3，pinia，mac 电脑 node 版本>=16
- 后端：egg，mongodb，代码见 egg 文件夹
# 效果预览
![实际效果](https://user-images.githubusercontent.com/8540940/225025500-37bf90ab-f193-4b44-adc1-f161134a3fc4.gif)
![设计器](https://user-images.githubusercontent.com/8540940/225026387-06bfb994-61f0-4345-855a-0a106580436e.png)

**下面的折损分析因为有联动，不适合低代码，通过监听参数的方式实现自定义业务逻辑**
![自定义效果](https://user-images.githubusercontent.com/8540940/225027460-4f78df57-ed4b-41b4-bb98-ec7c1db6473a.png)



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
