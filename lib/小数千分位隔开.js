// 4123.1 -> 4,123.10
// 法1：字符串拼接
function parseNum(str) {
  let sign = ''
  if(str[0] === '-') {
    sign = '-'
    str = str.slice(1)
  }
  let [integerPart, decimalPart] = str.split('.')
  let result = ''
  while(integerPart.length > 3) {
    result = ',' + integerPart.slice(-3) + result
    integerPart = integerPart.slice(0,-3)
  }
  result = integerPart + result
  if(decimalPart.length === 0) {
    decimalPart = '00'
  } else if(decimalPart.length === 1) {
    decimalPart = decimalPart + '0'
  } else if(decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0,2)
  }
  return `${sign}${result}.${decimalPart}`
}
// 法2：正则
// /\B(?=(\d{3})+(?!\d))/g
// \B：表示非单词边界。简单说就是“不能是字符串的开头”。防止出现 ,123 这种情况。
// (?=...)：正向先行断言。意思是“我只匹配一个位置，这个位置后面必须满足括号里的条件”。
// (\d{3})+：表示后面必须跟着 3个、6个、9个... （3的倍数）个数字。
// (?!\d)：负向先行断言。表示“后面不能再是数字了”，也就是必须一直匹配到字符串结尾。
function parseNum(str) {
  str = String(str)
  let sign = ''
  if(str[0] === '-') {
    sign = '-'
    str = str.slice(1)
  }
  let [integerPart, decimalPart] = str.split('.')
  decimalPart = decimalPart || ''
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if(decimalPart.length === 0) {
    decimalPart = '00'
  } else if(decimalPart.length === 1) {
    decimalPart = decimalPart + '0'
  } else if(decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0,2)
  }
  return `${sign}${integerPart}.${decimalPart}`
}