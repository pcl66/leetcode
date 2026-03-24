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
Object.myCreate = function(prototype) {
  function F() {}
  F.prototype = prototype
  return new F() 
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

// 比较文件版本号

// 小数千分位隔开

// 并行调度器

// 并行请求计算结果