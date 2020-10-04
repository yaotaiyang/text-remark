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
export { getHashText, getRange, createElement, renderHashText }
