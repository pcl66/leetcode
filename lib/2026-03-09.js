// currying
function currying(fn, ...args1) {
  const length = fn.length
  return function(...args2) {
    const allArgs = [...args1, ...args2]
    if(allArgs.length >= length) {
      return fn.call(this, ...allArgs)
    } else {
      return currying(fn, ...allArgs)
    }
  }
}

// Object.create

// instanceof
function myInstanceOf(instance, constructor) {
  const prototype = constructor.prototype
  let proto = Object.getPrototypeOf(instance)
  while(1) {
    if(!proto) return false
    if(proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

// new
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}

// Promise.prototype.finally
Promise.prototype.finally = function(onFinally) {
  return this.then(
    value => Promise.resolve(onFinally()).then(() => value),
    reason => Promise.resolve(onFinally()).then(() => { throw reason })
  )
}

// debounce
function debounce(cb, delay = 500) {
  let timeId = null
  return function(...args) {
    if(timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      cb.call(this, ...args)
    }, delay)
  }
}

// throttle
function throttle(cb, delay = 500) {
  let flag = true
  return function(...args) {
    if(flag) {
      cb.call(this, ...args)
      flag = false
      setTimeout(() => {
        flag = true
      }, delay)
    }
  }
}

// call / apply / bind

// deepClone
function deepClone(rawData, cache = new WeakMap()) {
  if(['string', 'number', 'undefined', 'boolean'].includes(typeof rawData)) return rawData
  if(rawData === null) return rawData
  if(cache.has(rawData)) return cache.get(rawData)
  const dataType = Object.prototype.toString.call(rawData)
  let clonedData
  if(dataType === '[object Object]') {
    clonedData = {}
  } else if(dataType === '[object Array]') {
    clonedData = []
  } else {
    clonedData = rawData
  }
  cache.set(rawData, clonedData)
  Object.entries(rawData).forEach(([key, value]) => {
    clonedData[key] = deepClone(value, cache)
  })
  return clonedData
}

// 大数字相加

// 洗牌算法 shuffle

// url请求参数解析

// 数组转树

// 树转数组

// 比较文件版本号

// 小数千分位隔开

// 并行调度器

// 并行请求计算结果