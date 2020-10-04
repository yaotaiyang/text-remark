function mixinEvent(target) {
  target.__events = target.__events || []
  let events = target.__events
  target.on = function(type, cb) {
    events.push({ type, cb })
    return target
  }
  target.off = function(type, cb) {
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
  target.once = function(type, cb) {
    const listener = function(...args) {
      cb.apply(target, args)
      self.off(type, cb)
    }
    return target.on(type, listener)
  }
  target.dispatchEvent = function(type, option) {
    events.forEach(item => {
      if (item.type === type) {
        item.cb.call(target, { type, ...option })
      }
    })
    return target
  }
}
export { mixinEvent }
