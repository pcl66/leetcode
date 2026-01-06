class Scheduler {
  constructor(max) {
    this.max = max
    this.runningCount = 0
    this.queue = []
  }
  async add(task) {
    if(this.runningCount >= this.max) {
      await new Promise(resolve => this.queue.push(resolve))
    }
    this.runningCount++
    const res = await task()
    this.runningCount--
    this.queue.length && this.queue.shift()?.()
    return res
  }
}