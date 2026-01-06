// url请求参数解析。
const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
function parseURL(url) {
  const str = url.split('#')[0]
  const query = str.split('?')[1]
  if(!query) {
    return {}
  }
  const paramArr = query.split('&')
  const paramObj = {}
  paramArr.forEach(param => {
    const index = param.indexOf('=')
    if(index === -1) {
      key = param
      value = true
    } else {
      key = param.slice(0,index)
      value = param.slice(index+1)
    }
    key = decodeURIComponent(key)
    value = value ? decodeURIComponent(value) : true
    if(/^-?\d+(\.\d+)?$/.test(value)) {
      value = Number(value)
    }
    if(paramObj.hasOwnProperty(key)) {
      if(Array.isArray(paramObj[key])) {
        paramObj[key].push(value)
      } else {
        paramObj[key] = [paramObj[key], value]
      }
    } else {
      paramObj[key] = value
    }
  })
  return paramObj
}