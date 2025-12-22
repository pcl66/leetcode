class Promise {
  state = 'pending'
  value
  cb = []
  #resolve(value) {
    if (value instanceof Promise) {
      return value.then(this.#resolve.bind(this), this.#reject.bind(this))
    }
    if(this.state !== 'pending') return
    this.state = 'fulfilled'
    this.value = value
    setTimeout(() => {
      this.cb.forEach(item => item?.onResolved())
    })
  }
  #reject(reason) {
    if(this.state !== 'pending') return 
    this.state = 'rejected'
    this.value = reason
    setTimeout(() => {
      this.cb.forEach(item => item?.onRejected())
    })
  }
  constructor(executor) {
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this))
    } catch (error) {
      this.#reject(error)
    }
  }
  then(onResolved = v => v, onRejected = r => { throw r}) {
    const that = this
    return new Promise((resolve, reject) => {
      const handler = (type) => {
        try {
          const res = type(that.value)
          if(res instanceof Promise) {
            res.then((value) => resolve(value), (reason) => reject(reason))
          } else {
            resolve(res)
          }
        } catch (error) {
          reject(error)
        }
      }
      if(that.state === 'fulfilled') {
        setTimeout(() => handler(onResolved))
      } else if (that.state === 'rejected') {
        setTimeout(() => handler(onRejected)) 
      } else {
        that.cb.push({
          onResolved: () => {
            handler(onResolved)
          },
          onRejected: () => {
            handler(onRejected)
          }
        })
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  finally(onFinally) {
    return this.then(
      value => {
        Promise.resolve(onFinally()).then(() => value)
      },
      reason => {
        Promise.resolve(onFinally()).then(() => { throw reason })
      }
    )
  }

  static resolve(value) {
    if (value instanceof Promise) return value
    return new Promise((resolve) => resolve(value))
  }
  static reject(reason) {
    return new Promise((_,reject) => reject(reason))
  }
  static all(iterable) {
    let count = 0
    let result = []
    const promises = Array.from(iterable).map(p => p instanceof Promise ? p: Promise.resolve(p))
    return new Promise((resolve, reject) => {
      if(promises.length === 0) {
        resolve([])
        return
      }
      promises.forEach((pro, index) => {
        pro.then(value => {
          count++
          result[index] = value
          if(count === promises.length) {
            resolve(result)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  static race(iterable) {
    const promises = Array.from(iterable).map(p => p instanceof Promise ? p : Promise.resolve(p))
    return new Promise((resolve, reject) => {
      promises.forEach(pro => {
        pro.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  static allSettled(iterable) {
    let count = 0
    const result = []
    const promises = Array.from(iterable).map(p => p instanceof Promise ? p: Promise.resolve(p))
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
        return
      }
      promises.forEach((pro, index) => {
        pro.then(value => {
          count++
          result[index] = {
            status: 'fulfilled',
            value
          }
          if(count === promises.length) {
            resolve(result)
          }
        }, reason => {
          count++
          result[index] = {
            status: 'rejected',
            reason
          }
          if(count === promises.length) {
            resolve(result)
          }
        })
      })
    })
  }
}

function deepClone(rawData, cache = new WeakMap()) {
  if(['string', 'number', 'boolean', 'undefined'].includes(typeof rawData)) {
    return rawData
  }
  if(rawData === null) {
    return rawData
  }
  if(cache.has(rawData)) return cache.get(rawData)
  let clonedData
  const dataType = Object.prototype.toString.call(rawData)
  if(dataType === '[object Object]') {
    clonedData = {}
  } else if( dataType === '[object Array]') {
    clonedData = []
  } else {
    throw new Error('不支持的数据类型: '+ dataType)
  }
  cache.set(rawData, clonedData)
  Object.entries(rawData).forEach(([k, v]) => {
    clonedData[k] = deepClone(v, cache)
  })
  return clonedData
}