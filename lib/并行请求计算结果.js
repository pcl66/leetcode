// 第一题
// 在金融领域，金额计算等敏感数据不能在前端进行计算，需要进行服务器调用计算后获得结果。我们尝试模拟这一场景。
// 有一个请求API，它可以获得两数相加后的结果。现在你有一批次数据需要知晓它们的和，而且你仅能通过addApi这一方法来获得两数之和，请实现完整entry这一逻辑，使其能够获得一批数据之和，且希望可以尽可能优化请求时长
// 例1：
// 输入：[1,5,10,5,7,8]
// 输出：36

// 例2：
// 输入：[7,100,6]
// 输出：113

function addApi(num1, num2) {
  return new Promise((resolve) => {
    console.log('执行计算开始', num1, num2);
    const timer = Math.random() * 2000 + 500;
    setTimeout(() => {
      const sum = num1 + num2;
      console.log(`执行计算完毕, ${num1}+${num2}=${sum}, 耗时${timer}`);
      resolve(sum);
    }, timer);
  });
}

async function entry(nums) {
  // todo 请完善函数体
  const total = await nums.reduce(async (prev, curr) => {
    const preValue = await prev;
    const sum = await addApi(preValue, curr);
    return sum;
  }, 0)

  console.log('total', total);
  return total;
}

async function entry2(nums) {
  let queue = [...nums]
  while(queue.length > 1) {
    let nextQueue = []
    for(let i = 0; i < queue.length; i+=2) {
      if(i === queue.length -1) {
        nextQueue.push(Promise.resolve(queue[i]))
      } else {
        nextQueue.push(addApi(queue[i], queue[i+1]))
      }
    }
    queue = await Promise.all(nextQueue)
    console.log('本轮结束，下次计算序列', queue)
  }
  return queue[0]
  
}

// entry([1, 5, 10, 5, 7, 8]);
entry2([1, 5, 10, 5, 7, 8]);