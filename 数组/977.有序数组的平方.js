/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let result = []
    let left = 0
    let right = nums.length - 1
    while(left <= right) {
        const leftValue = Math.pow(nums[left], 2)
        const rightValue = Math.pow(nums[right], 2)
        if(leftValue > rightValue) {
            result.unshift(leftValue)
            left++
        } else {
            result.unshift(rightValue)
            right--
        }
    }
    return result
};