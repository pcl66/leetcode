function deepClone(rawData, cache = new WeakMap()) {
  if(['string', 'number', 'boolean', 'undefined'].includes(typeof rawData)) {
    return rawData
  }
  if(rawData === null) return rawData
  if(cache.has(rawData)) return cache.get(rawData)
  let clonedData
  const dataType = Object.prototype.toString.call(rawData)
  if(dataType === '[object Array]') {
    clonedData = []
  } else if (dataType === '[object Object]') {
    clonedData = {}
  } else {
    throw new Error('不支持的数据类型：' + dataType)
  }
  cache.set(rawData, clonedData)
  Object.entries(rawData).forEach(([key, value]) => {
    clonedData[key] = deepClone(value, cache)
  })
  return clonedData
}