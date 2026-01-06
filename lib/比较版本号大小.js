/**
 * 比较两个版本号
 * @param {string} v1 第一个版本号
 * @param {string} v2 第二个版本号
 * @returns {number} 1: v1 > v2, -1: v1 < v2, 0: v1 === v2
 */
// "1.0.1" vs "1.0.2" 或 "1.10.0" vs "1.2.0"
function compareVersion(v1, v2) {
  const arr1 = v1.split('.')
  const arr2 = v2.split('.')
  let maxLength = Math.max(arr1.length, arr2.length)
  for(let i = 0; i < maxLength; i++) {
    const n1 = arr1[i] ? Number(arr1[i]) : 0
    const n2 = arr2[i] ? Number(arr2[i]) : 0
    if(n1 > n2) {
      return 1
    }
    if(n2 > n1) {
      return -1
    }
  }
  return 0
}