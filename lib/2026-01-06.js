// currying
function currying(fn, ...args) {
  const length = fn.length
  return function(...args2) {
    const allArgs = [...args, ...args2]
    if(allArgs.length >= length) {
      return  fn.call(this, ...allArgs)
    } else {
      return currying(fn, ...allArgs)
    }
  }
}

// Object.create
Object.myCreate = function(prototype) {
  function Fn() {}
  Fn.prototype = prototype
  return new Fn()
}

// instanceof
function myInstanceof(instance, constructor) {
  const prototype = constructor.prototype
  let proto = Object.getPrototypeOf(instance)
  while(1) {
    if(!proto) return false
    if(prototype === proto) return true
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
// 首节流
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
Function.prototype.myCall = function(target, ...args) {
  const fn = Symbol('fn')
  target[fn] = this
  const res = target[fn](...args)
  delete target[fn]
  return res
}

Function.prototype.myBind = function(target, ...args1) {

}

// deepClone
function deepClone(rawData, cache = new WeakMap()) {
  if(typeof rawData !== 'object' && typeof rawData !== 'function') return rawData
  if(rawData === null) return rawData
  if(cache.has(rawData)) return cache.get(rawData)
  if(rawData instanceof Date) return new Date(rawData)
  if(rawData instanceof RegExp) return new RegExp(rawData)
  let clonedData
  const dataType = Object.prototype.toString.call(rawData)
  if(dataType === '[object Object]') {
    clonedData = {}
  } else if (dataType === '[object Array]') {
    clonedData = []
  } else {
    clonedData = rawData
    console.warn('不支持的数据类型', dataType)
  }
  cache.set(rawData, clonedData)
  Object.entries(rawData).forEach(([key, value]) => {
    clonedData[key] = deepClone(value, cache)
  })
  return clonedData
}

// 大数字相加
function add(n1, n2) {
  let i = n1.length - 1
  let j = n2.length - 1
  let carry = 0
  let result = []
  while(i >= 0 || j >=0 || carry >0) {
    const a = n1[i] ? Number(n1[i]) : 0
    const b = n2[j] ? Number(n2[j]) : 0
    const sum = a+b+carry
    carry = Math.floor(sum / 10)
    result.push(sum % 10)
  }
  return result.reverse().join('')
}

// 洗牌算法 shuffle
function shuffle(arr) {
  let result = [...arr]
  for(let j = arr.length -1; j>=0; j--) {
    const index = Math.floor(Math.random() * (j+1));
    [result[j], result[index]] = [result[index], result[j]]
  }
  return result
}

// url请求参数解析

// 数组转树

// 树转数组

// 比较文件版本号

// 小数千分位隔开

// 并行调度器

// 并行请求计算结果