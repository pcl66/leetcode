// currying
function currying(fn, ...args1) {
  const length = fn.length;
  return function(...args2) {
    const allArgs = [...args1, ...args2]
    if(length <= allArgs.length) {
      return fn.call(this, ...allArgs)
    } else {
      return currying(fn, ...allArgs)
    }
  }
}

// Object.create
function myCreate(prototype) {
  function Fn() {}
  Fn.prototype = prototype
  return new Fn()
}

// instanceof
function myInstanceof(instance, constructor) {
  let proto = Object.getPrototypeOf(instance)
  const prototype = constructor.prototype
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

// debounce

// throttle

// call / apply / bind

// deepClone

// 大数字相加

// 洗牌算法 shuffle

// url请求参数解析

// 数组转树

// 树转数组