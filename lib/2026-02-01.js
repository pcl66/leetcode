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
Promise.prototype.myFinally = function() {}

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
class Scheduler {
  constructor(capacity) {
    this.max = capacity
    this.runningCount = 0
    this.resolveQueue = []
  }
  async add(task) {
    if(this.runningCount >= this.max) {
      await new Promise((resolve) => this.resolveQueue.push(resolve))
    }
    this.runningCount++
    try {
      const res = await task()
      return res
    } finally {
      this.runningCount--
      if(this.resolveQueue.length > 0) {
        this.resolveQueue.shift()()
      }
    }
  }
}

// 并行请求计算结果
async function add1(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a+b)
    }, 2000)
  })
}
async function add() {
  let arr = [1,2,3,4,5,6,7,8]
  let queue = [...arr]
  while(queue.length > 1) {
    let temp = []
    for(let i = 0; i < queue.length; i+=2) {
      if(i === queue.length-1) {
        temp.push(Promise.resolve(queue[i]))
      } else {
        temp.push(add1(queue[i], queue[i+1]))
      }
    }
    queue = await Promise.all(temp)
  }
  return queue[0]
}