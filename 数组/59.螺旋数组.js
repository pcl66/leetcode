/**
 * @param {number} n
 * @return {number[][]}
 */
// 特殊到一般
var generateMatrix = function(n) {
    let matrix = new Array(n).fill().map(() => new Array(n))
    let leftBorder = 0
    let rightBorder = n - 1
    let topBorder = 0
    let bottomBorder = n - 1
    let count = 1
    while(leftBorder <= rightBorder && topBorder <= bottomBorder) {
      for(let i = leftBorder; i <= rightBorder; i++) {
        matrix[topBorder][i] = count
        count++
      }
      for(let i = topBorder+1; i < bottomBorder; i++) {
        matrix[i][rightBorder] = count
        count++
      }
      for(let i = rightBorder; i >= leftBorder; i--) {
        if(topBorder !== bottomBorder) {
          matrix[bottomBorder][i] = count
          count++
        }
      }
      for(let i = bottomBorder-1; i > topBorder; i--) {
        matrix[i][leftBorder] = count
        count++
      }
      leftBorder++
      rightBorder--
      topBorder++
      bottomBorder--
    }
    
    return matrix
};

console.log(generateMatrix(3))