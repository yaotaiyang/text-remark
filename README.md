# text-remark

JS Document annotation Base Library 文本注释标注基础库  [See in github](https://github.com/yaotaiyang/text-remark/)

### How to use 如何使用

```js
// init textRemark
const textRemark = new TextRemark({
  container: '#mark',
  text: 'Text annotation test',
  /*
  Remarks is the marked data information, which has four fields: start position(baseoffset), end position(extentoffset), type and JSON data.Where type will be added to CSS marked with DOM tag <span data-type="danger" data-index="0" class="text-remark-tag text-remark-danger">this metting</span>,Data can be obtained in the remark selected event of textremark
  */
 /*
  remarks为标注的数据信息，有四个字段，开始位置baseOffset、结束位置extentOffset、类型、json数据
  其中type会添加到标注dom标签的css上 <span data-type="danger" data-index="0" class="text-remark-tag text-remark-danger">此次会议</span>
  data在 textRemark的remark-selected事件中，可以拿到
 */

  remarks: [
    {
      baseOffset: 4,
      extentOffset: 8,
      type: 'danger',
      data: { text: 'this is a remark' }
    },
    {
      baseOffset: 694,
      extentOffset: 699,
      type: 'normal',
      data: { text: 'this is another remark' }
    }
  ]
})
```

### Start demo

demo based vue. Download code，Enter the example directory   
demo 基于 vue 完成。下载代码，进入 example 后

```
npm i
npm start
```

![text-remark](https://github.com/yaotaiyang/text-remark/raw/main/text-remark.png)

### 方法

| 方法              | 描述                                    | 其它                                                             |
| ----------------- | --------------------------------------- | ---------------------------------------------------------------- |
| addRemark         | 添加标注 addRemark(type, data = {})     | Data is saved in json,data 会保存到 json 中                                            |
| removeRemark      | 移出标注 removeRemark(index)            | index 为索引号                                                   |
| updateRemark      | 更新标注 updateRemark(index, data={})   | index 为索引号，data is a object data                             |
| getJson           | 获取组件 json 数据 {text:'',remarks:[]} | get json                                                  |
| clearActive       | 清除选中状态 clearActive()              | 组件重写默认的选中状态，光标 blur 的时候无法清除，利用该方法清除 |
| setSelectedRemark | 设置选中状态 setSelectedRemark(index)   | 设置第几个 mark 为选中                                           |
| updateShowText    | 更新显示的文本 updateShowText()         | 强制更新标注显示                                                 |

### 事件

| 事件            | 描述                                                          | 其它                               |
| --------------- | ------------------------------------------------------------- | ---------------------------------- |
| remark-selected | textRemark.on('remark-selected', function(e){console.log(e)}) | 选中标记的 remark 时，会触发该方法 |
