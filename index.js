import { createElement, renderHashText, getRange } from './utils'
import { mixinEvent } from './event'
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
