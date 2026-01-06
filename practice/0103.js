// currying
function currying(fn, ...args1) {
  return function(...args2) {
    const allArgs = [...args1, ...args2]
    if(allArgs.length >= fn.length) {
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
Function.prototype.myBind = function(target, ...args) {

}


// deepClone


// 大数字相加
function add(a, b) {
  let resultArr = []
  let carry = 0
  let i = a.length - 1
  let j = b.length - 1
  while(i>=0 || j >= 0 || carry > 0) {
    let n1 = a[i] ? Number(a[i]) : 0
    let n2 = b[j] ? Number(b[j]) : 0
    let sum = n1 + n2 + carry
    carry = Math.floor(sum / 10)
    resultArr.push(sum % 10)
    i--
    j--
  }
  return resultArr.reverse().join('')
}


// 洗牌算法 shuffle
function shuffle(arr) {
  const result = [...arr]
  for(let j = arr.length -1; j>=0; j--) {
    const randomIndex = Math.floor(Math.random() * (j+1))
    [result[randomIndex], result[j]] = [result[j], result[randomIndex]]
  }
  return result
}


// url请求参数解析
// const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
function parseURL(url) {
  const str = url.split('#')[0]
  const paramsStr = str.split('?')?.[1]
  if(!paramsStr) return {}
  const paramsArr = paramsStr.split('&')
  let paramsObj = {}
  paramsArr.forEach(param => {
    if(param === '') return
    let index = param.indexOf('=')
    let key
    let value
    if(index > -1) {
      key = decodeURIComponent(param.slice(0,index)) 
      value = decodeURIComponent(param.slice(index+1))
    } else {
      key = decodeURIComponent(param)
      value = true
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