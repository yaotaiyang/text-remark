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
    addEvents(this)
    this.$container.appendChild(this.$realText)
    this.$container.appendChild(this.$showText)

    this.updateShowText()
  }
  addRemark(type, data = {}) {
    // 获取当前的active
    // data为默认的数据
    if (this.activeRemark) {
      let curSection = getRange(type, this.activeRemark)
      if (curSection.baseOffset !== curSection.extentOffset) {
        this.remarks.push({ type, baseOffset: curSection.baseOffset, extentOffset: curSection.extentOffset, data })
        this.activeRemark = null
        this.updateShowText()
      }
    }
  }
  removeRemark(index) {
    if (!isNaN(index) && index >= 0 && index < this.remarks.length) {
      this.remarks.splice(index, 1)
      this.updateShowText()
    } else {
      console.warn('params index "' + index + '" is not right')
    }
  }
  updateRemark(index, json) {
    if (!isNaN(index) && index >= 0 && index < this.remarks.length) {
      let oldJson = this.remarks[index]
      this.remarks[index] = Object.assign(oldJson, json)
      this.updateShowText()
    } else {
      console.warn('params index "' + index + '" is not right')
    }
  }
  getJson() {
    return {
      text: this.text,
      remarks: this.remarks.filter(item => item.type !== 'active')
    }
  }
  setSelectedRemark(index) {
    this.$showText.querySelectorAll('.text-remark-tag').forEach(item => {
      item.classList.remove('text-remark-selected')
    })
    if (index !== undefined && index !== null) {
      this.$showText.querySelector('.text-remark-tag[data-index="' + index + '"]').classList.add('text-remark-selected')
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
function addEvents(textRemark) {
  mixinEvent(textRemark)
  textRemark.$container.addEventListener(
    'mousedown',
    e => {
      textRemark.$container.classList.add('mousedown')
      textRemark.startSelect = true
      let $target = e.target
      if ($target && $target.classList.contains('text-remark-tag')) {
        let index = $target.getAttribute('data-index')
        index = index ? parseInt(index) : index
        let remarkType = $target.getAttribute('data-type')
        textRemark.dispatchEvent('remark-selected', { target: e.target, remarkType, index, remark: { ...textRemark.remarks[index] } })
        textRemark.setSelectedRemark(index)
      }
    },
    false
  )
  textRemark.$container.addEventListener(
    'mouseup',
    e => {
      textRemark.$container.classList.remove('mousedown')
      textRemark.startSelect = false
      textRemark.mySelection(e)
    },
    false
  )
  textRemark.$realText.addEventListener(
    'mousemove',
    e => {
      if (textRemark.startSelect) {
        textRemark.mySelection(e)
      }
    },
    false
  )
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
