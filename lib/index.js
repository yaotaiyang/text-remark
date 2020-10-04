"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextRemark = /*#__PURE__*/function () {
  function TextRemark(options) {
    _classCallCheck(this, TextRemark);

    var container = options.container,
        _options$text = options.text,
        text = _options$text === void 0 ? '' : _options$text,
        _options$remarks = options.remarks,
        remarks = _options$remarks === void 0 ? [] : _options$remarks,
        _options$links = options.links,
        links = _options$links === void 0 ? [] : _options$links;

    if (!container || !text) {
      console.error('TextRemark need a container and text');
      return;
    }

    if (typeof container === 'string') {
      this.$container = document.querySelector(container);
    } else {
      this.$container = container;
    }

    this.$container.classList.add('text-remark');
    this.text = text;
    this.remarks = remarks;
    this.links = links;
    this.activeRemark = null;
    this.startSelect = false; //显示

    this.$showText = createElement('div', {
      className: 'text-remark-content'
    });
    this.$realText = createElement('div', {
      className: 'text-remark-content real-text'
    });
    this.$realText.innerText = text;
    addEvents(this);
    this.$container.appendChild(this.$realText);
    this.$container.appendChild(this.$showText);
    this.updateShowText();
  }

  _createClass(TextRemark, [{
    key: "addRemark",
    value: function addRemark(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // 获取当前的active
      // data为默认的数据
      if (this.activeRemark) {
        var curSection = getRange(type, this.activeRemark);

        if (curSection.baseOffset !== curSection.extentOffset) {
          this.remarks.push({
            type: type,
            baseOffset: curSection.baseOffset,
            extentOffset: curSection.extentOffset,
            data: data
          });
          this.activeRemark = null;
          this.updateShowText();
        }
      }
    }
  }, {
    key: "removeRemark",
    value: function removeRemark(index) {
      this.remarks.splice(index, 1);
      this.updateShowText();
    }
  }, {
    key: "getJson",
    value: function getJson() {
      return {
        text: this.text,
        remarks: this.remarks.filter(function (item) {
          return item.type !== 'active';
        })
      };
    }
  }, {
    key: "clearActive",
    value: function clearActive() {
      this.activeRemark = null;
      this.updateShowText();
    }
  }, {
    key: "mySelection",
    value: function mySelection() {
      var section = getRange('active');
      var canAdd = true;

      for (var i = 0; i < this.remarks.length; i++) {
        var obj = this.remarks[i];

        if (section.baseOffset >= obj.baseOffset && section.baseOffset <= obj.extentOffset) {
          canAdd = false;
          break;
        } else if (section.extentOffset >= obj.baseOffset && section.extentOffset <= obj.extentOffset) {
          canAdd = false;
          break;
        }
      }

      if (canAdd && section.baseOffset !== section.extentOffset) {
        this.activeRemark = getRange('active');
        this.updateShowText();
      }
    }
  }, {
    key: "updateShowText",
    value: function updateShowText() {
      // 合并默认标记数据和已有的标记数据
      var baseArr = this.activeRemark ? [this.activeRemark] : [];
      var remarks = baseArr.concat(this.remarks);
      var curHtml = renderHashText(this.text, remarks);
      this.$showText.innerHTML = curHtml;
    }
  }]);

  return TextRemark;
}();

exports["default"] = TextRemark;

function addEvents(textRemark) {
  mixinEvent(textRemark);
  this.$container.addEventListener('mousedown', function (e) {
    textRemark.$container.classList.add('mousedown');
    textRemark.startSelect = true;
    var $target = e.target;

    if ($target && $target.classList.contains('text-remark-tag')) {
      var index = $target.getAttribute('data-index');
      var tagType = $target.getAttribute('data-type');
      textRemark.dispatchEvent('tag-selected', {
        target: e.target,
        tagType: tagType,
        index: index,
        remark: _objectSpread({}, textRemark.remarks[index])
      });
    }
  }, false);
  textRemark.$container.addEventListener('mouseup', function (e) {
    textRemark.$container.classList.remove('mousedown');
    textRemark.startSelect = false;
    textRemark.mySelection(e);
  }, false);
  textRemark.$realText.addEventListener('mousemove', function (e) {
    if (textRemark.startSelect) {
      textRemark.mySelection(e);
    }
  }, false);
} // 其它方法
// 事件属性处理


function mixinEvent(target) {
  target.__events = target.__events || [];
  var events = target.__events;

  target.on = function (type, cb) {
    events.push({
      type: type,
      cb: cb
    });
    return target;
  };

  target.off = function (type, cb) {
    for (var i = 0; i < events.length; i++) {
      if (cb === undefined) {
        events = [];
      } else {
        var curEvent = events[i];

        if (curEvent.type === type && curEvent.cb === cb) {
          events.splice(i, 1);
          i--;
        }
      }
    }

    return target;
  };

  target.once = function (type, cb) {
    var listener = function listener() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      cb.apply(target, args);
      self.off(type, cb);
    };

    return target.on(type, listener);
  };

  target.dispatchEvent = function (type, option) {
    events.forEach(function (item) {
      if (item.type === type) {
        item.cb.call(target, _objectSpread({
          type: type
        }, option));
      }
    });
    return target;
  };
} // 其它通用方法


function getHashText(text, remarks) {
  var textMap = Object.create(null);

  if (remarks.length > 0) {
    var splitNums = [];
    remarks.forEach(function (obj) {
      splitNums.push(obj.baseOffset);
      splitNums.push(obj.extentOffset);
    });
    splitNums.sort(function (a, b) {
      return a - b;
    });
    var prevIndex = 0;
    var oriText = text;

    for (var i = 0; i < splitNums.length; i++) {
      var curIndex = splitNums[i];
      textMap[curIndex] = oriText.substring(prevIndex, curIndex);
      prevIndex = curIndex;
    } // 剩余的文本


    if (prevIndex < oriText.length - 1) {
      textMap[oriText.length - 1] = oriText.substring(prevIndex);
    }
  }

  return textMap;
}

function getRange(type, section) {
  // 输出baseOffset < extentOffset
  // 如果有参数section 采用参数，如果没有，获取当前页面
  var curSection = section || window.getSelection();
  var baseOffset = curSection.baseOffset,
      extentOffset = curSection.extentOffset;
  var max = Math.max(baseOffset, extentOffset);
  var min = Math.min(baseOffset, extentOffset);
  return {
    baseOffset: min,
    extentOffset: max,
    type: type
  };
}

function createElement(tagName) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // 创建元素
  var $dom = document.createElement(tagName);

  for (var key in attrs) {
    $dom[key] = attrs[key];
  }

  return $dom;
}

function renderHashText(text, remarks) {
  var textHashMap = getHashText(text, remarks);

  if (remarks.length === 0) {
    return text;
  } else {
    var resHtml = '';
    var remarkIndex = 0;

    for (var i = 0; i < remarks.length; i++) {
      var curObj = remarks[i];

      if (textHashMap[curObj.baseOffset]) {
        if (curObj.type === 'active') {
          textHashMap[curObj.baseOffset] += '<span data-type="' + curObj.type + '" class="text-remark-tag text-remark-' + curObj.type + '">';
        } else {
          textHashMap[curObj.baseOffset] += '<span data-type="' + curObj.type + '" data-index="' + remarkIndex + '" class="text-remark-tag text-remark-' + curObj.type + '">';
        }
      }

      if (textHashMap[curObj.extentOffset]) {
        textHashMap[curObj.extentOffset] += '</span>';
      }

      if (curObj.type !== 'active') {
        remarkIndex++;
      }
    }

    for (var key in textHashMap) {
      resHtml += textHashMap[key];
    }

    return resHtml;
  }
}
//# sourceMappingURL=index.js.map