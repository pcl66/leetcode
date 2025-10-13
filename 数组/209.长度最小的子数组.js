/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let i = 0
    let minLength = Number.MAX_VALUE
    let sum = 0
    for(let j = 0; j < nums.length; j++) {
        sum+=nums[j]
        while(sum >= target) {
            minLength = Math.min(minLength, j-i+1)
            sum-=nums[i]
            i++
        }
    }
    return minLength === Number.MAX_VALUE ? 0:minLength
};