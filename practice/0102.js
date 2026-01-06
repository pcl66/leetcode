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
function myCreate(proto) {
  function Fn() {}
  Fn.prototype = proto
  return new Fn()
}

// instanceof
function myInstanceof(instance, constructor) {
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
Promise.prototype.myFinally = function(onFinally) {
  return this.then(
    value => Promise.resolve(onFinally()).then(() => value),
    reason => Promise.resolve(onFinally()).then(() => { throw reason })
  )
}

// debounce
function debounce(cb, delay = 500) {
  let timeId = null
  return function(...args) {
    clearTimeout(timeId)
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

// deepClone
function deepClone(rawData, cache = new WeakMap()) {
  if(typeof rawData !== 'object' && typeof rawData !== 'function') return rawData
  if(rawData === null) return rawData
  if(cache.has(rawData)) return cache.get(rawData)
  let clonedData
  const dataType = Object.prototype.toString.call(rawData)
  if(dataType === '[object Array]') {
    clonedData = []
  } else if (dataType === '[object Object]') {
    clonedData = {}
  } else {
    throw new Error('不支持的数据类型')
  }
  Object.entries(rawData).forEach(([key, value]) => {
    clonedData[key] = deepClone(value, cache)
  })
  return clonedData
}

// 大数字相加
function add(a, b) {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let result = []
  while(i >= 0 || j >=0 ||  carry > 0) {
    const aNumber = a[i] ? Number(a[i]) : 0
    const bNumber = b[j] ? Number(b[j]) : 0
    const sum = aNumber + bNumber + carry
    result.push(sum % 10)
    carry = Math.floor(sum / 10)
    i--
    j--
  }
  return result.reverse().join('')
}

// 洗牌算法 shuffle
function shuffle(a) {
  let arr = [...a]
  for(let i = arr.length -1 ; i >= 0; i--) {
    let n =Math.floor(Math.random() * (i + 1));
    [arr[i], arr[n]] = [arr[n], arr[i]]
  }
  return arr
}

// url请求参数解析
// const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
function parseURL(url) {
  const str = url.split('#')?.[0];
  if(!str) return {}
  const paramStr = str.split('?')?.[1]
  if(!paramStr) return {}
  const paramsArr = paramStr.split('&')
  let paramsObj = {}
  paramsArr.forEach(param => {
    if(!param) return
    let keyIndex = param.indexOf('=')
    let key
    let value
    if(keyIndex === -1) {
      key = decodeURIComponent(param.slice()) 
      value = true
    } else {
      key = decodeURIComponent(param.slice(0, keyIndex))
      value = decodeURIComponent(param.slice(keyIndex+1))
    }
    if(paramsObj.hasOwnProperty(key)) {
      if(Array.isArray(paramsObj[key])) {
        paramsObj[key].push(value)
      } else {
        paramsObj[key] = [paramsObj[key], value]
      }
    } else {
      paramsObj[key] = value
    }
  })
  return paramsObj
}

// 数组转树

// 树转数组