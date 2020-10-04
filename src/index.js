export default class TextRemark {
  constructor(options) {
    const { container, text = '', remarks = [], links = [] } = options
    if (!container || !text) {
      console.error('TextRemark need a container and text')
      return
    }
    if (typeof container === 'string') {
      this.$container = document.querySelector(container)
    } else {
      this.$container = container
    }
    this.$container.classList.add('text-remark')
    this.text = text
    this.remarks = remarks
    this.links = links
    this.activeRemark = null
    this.startSelect = false
    //显示
    this.$showText = createElement('div', { className: 'text-remark-content' })
    this.$realText = createElement('div', { className: 'text-remark-content real-text' })
    this.$realText.innerText = text
    this.addEvents()
    this.$container.appendChild(this.$realText)
    this.$container.appendChild(this.$showText)

    this.updateShowText()
  }
  addRemark(type) {
    // 获取当前的active
    if (this.activeRemark) {
      let curSection = getRange(type, this.activeRemark)
      if (curSection.baseOffset !== curSection.extentOffset) {
        this.remarks.push({ type, baseOffset: curSection.baseOffset, extentOffset: curSection.extentOffset })
        this.activeRemark = null
        this.updateShowText()
      }
    }
  }
  addEvents() {
    mixinEvent(this)
    this.$container.addEventListener(
      'mousedown',
      e => {
        this.$container.classList.add('mousedown')
        this.startSelect = true
        let $target = e.target
        if ($target && $target.classList.contains('text-remark-tag')) {
          let index = $target.getAttribute('data-index')
          let tagType = $target.getAttribute('data-type')
          this.dispatchEvent('tag-selected', { target: e.target, tagType, remark: { ...this.remarks[index] } })
        }
      },
      false
    )
    this.$container.addEventListener(
      'mouseup',
      e => {
        this.$container.classList.remove('mousedown')
        this.startSelect = false
        this.mySelection(e)
      },
      false
    )
    this.$realText.addEventListener(
      'mousemove',
      e => {
        if (this.startSelect) {
          this.mySelection(e)
        }
      },
      false
    )
  }
  getJson() {
    return {
      remarks: this.remarks.filter(item => item.type !== 'active')
    }
  }
  clearActive() {
    this.activeRemark = null
    this.updateShowText()
  }
  mySelection() {
    let section = getRange('active')
    let canAdd = true
    for (let i = 0; i < this.remarks.length; i++) {
      let obj = this.remarks[i]
      if (section.baseOffset >= obj.baseOffset && section.baseOffset <= obj.extentOffset) {
        canAdd = false
        break
      } else if (section.extentOffset >= obj.baseOffset && section.extentOffset <= obj.extentOffset) {
        canAdd = false
        break
      }
    }
    if (canAdd && section.baseOffset !== section.extentOffset) {
      this.activeRemark = getRange('active')
      this.updateShowText()
    }
  }
  updateShowText() {
    // 合并默认标记数据和已有的标记数据
    let baseArr = this.activeRemark ? [this.activeRemark] : []
    let remarks = baseArr.concat(this.remarks)
    let curHtml = renderHashText(this.text, remarks)
    this.$showText.innerHTML = curHtml
  }
}
// 其它方法
// 事件属性处理
function mixinEvent(target) {
  target.__events = target.__events || []
  let events = target.__events
  target.on = function (type, cb) {
    events.push({ type, cb })
    return target
  }
  target.off = function (type, cb) {
    for (let i = 0; i < events.length; i++) {
      if (cb === undefined) {
        events = []
      } else {
        let curEvent = events[i]
        if (curEvent.type === type && curEvent.cb === cb) {
          events.splice(i, 1)
          i--
        }
      }
    }
    return target
  }
  target.once = function (type, cb) {
    const listener = function (...args) {
      cb.apply(target, args)
      self.off(type, cb)
    }
    return target.on(type, listener)
  }
  target.dispatchEvent = function (type, option) {
    events.forEach(item => {
      if (item.type === type) {
        item.cb.call(target, { type, ...option })
      }
    })
    return target
  }
}
// 其它通用方法
function getHashText(text, remarks) {
  let textMap = Object.create(null)
  if (remarks.length > 0) {
    let splitNums = []
    remarks.forEach(obj => {
      splitNums.push(obj.baseOffset)
      splitNums.push(obj.extentOffset)
    })
    splitNums.sort((a, b) => a - b)
    let prevIndex = 0
    let oriText = text
    for (let i = 0; i < splitNums.length; i++) {
      let curIndex = splitNums[i]
      textMap[curIndex] = oriText.substring(prevIndex, curIndex)
      prevIndex = curIndex
    }
    // 剩余的文本
    if (prevIndex < oriText.length - 1) {
      textMap[oriText.length - 1] = oriText.substring(prevIndex)
    }
  }
  return textMap
}
function getRange(type, section) {
  // 输出baseOffset < extentOffset
  // 如果有参数section 采用参数，如果没有，获取当前页面
  let curSection = section || window.getSelection()
  let { baseOffset, extentOffset } = curSection
  let max = Math.max(baseOffset, extentOffset)
  let min = Math.min(baseOffset, extentOffset)
  return {
    baseOffset: min,
    extentOffset: max,
    type
  }
}
function createElement(tagName, attrs = {}) {
  // 创建元素
  const $dom = document.createElement(tagName)
  for (let key in attrs) {
    $dom[key] = attrs[key]
  }
  return $dom
}

function renderHashText(text, remarks) {
  let textHashMap = getHashText(text, remarks)
  if (remarks.length === 0) {
    return text
  } else {
    let resHtml = ''
    let remarkIndex = 0
    for (let i = 0; i < remarks.length; i++) {
      let curObj = remarks[i]
      if (textHashMap[curObj.baseOffset]) {
        if (curObj.type === 'active') {
          textHashMap[curObj.baseOffset] += '<span data-type="' + curObj.type + '" class="text-remark-tag text-remark-' + curObj.type + '">'
        } else {
          textHashMap[curObj.baseOffset] += '<span data-type="' + curObj.type + '" data-index="' + remarkIndex + '" class="text-remark-tag text-remark-' + curObj.type + '">'
        }
      }
      if (textHashMap[curObj.extentOffset]) {
        textHashMap[curObj.extentOffset] += '</span>'
      }
      if (curObj.type !== 'active') {
        remarkIndex++
      }
    }
    for (let key in textHashMap) {
      resHtml += textHashMap[key]
    }
    return resHtml
  }
}
