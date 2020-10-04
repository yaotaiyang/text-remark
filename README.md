# text-remark

js 文本注释标注基础库

### 基础使用

```js
// 初始化textRemark
const textRemark = new TextRemark({
  container: '#mark',
  text: '文本标注测试',
  // remarks为标注的数据信息，有四个字段，开始位置baseOffset、结束位置extentOffset、类型、json数据
  // 其中type会添加到标注dom标签的css上 <span data-type="danger" data-index="0" class="text-remark-tag text-remark-danger">此次会议</span>
  // data在 textRemark的tag-selected事件中，会拿到
  remarks: [
    {
      baseOffset: 4,
      extentOffset: 8,
      type: 'danger',
      data: { text: '这里是第一个标注' }
    },
    {
      baseOffset: 694,
      extentOffset: 699,
      type: 'normal',
      data: { text: '这里是第二个标注' }
    }
  ]
})
```

### 运行 demo

demo 基于 vue 完成。下载代码，进入 example 后

```
npm i
npm start
```

<image src="./text-remark.png" style="width:100%">

### 方法

| 方法         | 描述                                | 其它                  |
| ------------ | ----------------------------------- | --------------------- |
| addRemark    | 添加标注 addRemark(type, data = {}) | data 会保存到 json 中 |
| removeRemark | 移出标注 removeRemark(index)        | index 为索引号        |

| getJson | 获取组件 json 数据 {text:'',remarks:[]} | 获取到 json 数据 |
| clearActive | 清楚选中状态 clearActive() | 组件重写默认的选中状态，光标 blur 的时候无法清除，利用该方法清除 |

### 事件

| 事件         | 描述                                                       | 其它                            |
| ------------ | ---------------------------------------------------------- | ------------------------------- |
| tag-selected | textRemark.on('tag-selected', function(e){console.log(e)}) | 选中标记的 tag 时，会触发该方法 |
