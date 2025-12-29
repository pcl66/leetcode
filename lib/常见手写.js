// instanceof
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while(1) {
    if(!proto) return false
    if(proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

// Object.create  核心实现
function myCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}

// new
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const res = fn.call(obj, ...args)
  const isObject = (typeof res === 'object' && res !== null) || typeof res === 'function'
  return isObject ? res : obj
}

// Promise.prototype.finally
Promise.prototype.myFinally = function(onFinally) {
  return this.then(
    value => Promise.resolve(onFinally()).then(() => value),
    reason => Promise.resolve(onFinally()).then(() => { throw reason })
  )
}
// Promise.all
Promise.myAll = function(iterable) {
  let result = []
  let count = 0
  const promises = Array.from(iterable).map(p => Promise.resolve(p))
  const length = promises.length
  return new Promise((resolve, reject) => {
    if(length === 0) {
      resolve([])
    }
    promises.forEach((pro, index) => {
      pro.then(res => {
        result[index] = res
        count++
        if(count === length) {
          resolve(result)
        }
      }, reason => {
        reject(reason)
      })
    })
  })
}
// promise.race
Promise.myRace = function(iterable) {
  const promises = Array.from(iterable).map(p => Promise.resolve(p))
  return new Promise((resolve, reject) => {
    promises.forEach(pro => {
      pro.then(res => {
        resolve(res)
      }, reason => {
        reject(reason)
      })
    })
  })
}
// 防抖 节流
function debounce(cb, delay = 500) {
  let timeId = null
  return function(...args) {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      cb.call(this, ...args)
    }, delay)
  }
}
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
function throttle2(cb, delay = 500) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if(now - lastTime > delay) {
      cb.call(this, ...args)
      lastTime = now
    }
  }
}

// call apply bind
function myCall(target, ...args) {
  const fn = Symbol('fn')
  target[fn] = this
  const res = target[fn](...args)
  delete target[fn]
  return res
}
function myApply(target, args) {
  const fn = Symbol('fn')
  target[fn] = this
  const res = target[fn](...args)
  delete target[fn]
  return res
}
function myBind(target, ...args1) {
  const fn = this
  return function(...args2) {
    return fn.apply(target, [...args1, ...args2])
  }
}

// curry add(1)(2)(3)

// deepClone
function deepClone(rawData, cache = new WeakMap()) {
  if(typeof rawData !== 'object' && typeof rawData !== 'function') return rawData
  if(rawData === null) return rawData
  if(cache.has(rawData)) return cache.get(rawData)
  let clonedData
  const dataType = Object.prototype.toString.call(rawData)
  if(dataType === '[object Object]') {
    clonedData = {}
  } else if (dataType === '[object Array]') {
    clonedData = []
  } else {
    throw new Error('不支持的数据类型：'+ dataType)
  }
  cache.set(rawData, clonedData)
  Object.entries(rawData).forEach(([key, value]) => {
    clonedData[key] = deepClone(value, cache)
  })
  return clonedData
}

// 洗牌算法 随机数组内的值
function shuffle(data) {
  let right = data.length - 1
  while(right > 0) {
    const v = Math.floor(Math.random() * (right+1))
    [data[v], data[right]] = [data[right], data[v]]
    right--
  }
  return data
}