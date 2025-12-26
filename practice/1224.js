let list = [
  { id: 12, parentId: 1, name: '朝阳区' },
  { id: 241, parentId: 24, name: '田林街道' },
  { id: 31, parentId: 3, name: '广州市' },
  { id: 13, parentId: 1, name: '昌平区' },
  { id: 2421, parentId: 242, name: '上海科技绿洲' },
  { id: 21, parentId: 2, name: '静安区' },
  { id: 242, parentId: 24, name: '漕河泾街道' },
  { id: 22, parentId: 2, name: '黄浦区' },
  { id: 11, parentId: 1, name: '顺义区' },
  { id: 2, parentId: 0, name: '上海市' },
  { id: 24, parentId: 2, name: '徐汇区' },
  { id: 1, parentId: 0, name: '北京市' },
  { id: 2422, parentId: 242, name: '漕河泾开发区' },
  { id: 32, parentId: 3, name: '深圳市' },
  { id: 33, parentId: 3, name: '东莞市' },
  { id: 3, parentId: 0, name: '广东省' }
]

let tree = [
  {
    id: 2,
    parentId: 0,
    name: '上海市',
    children: [
      { id: 21, parentId: 2, name: '静安区' },
      { id: 22, parentId: 2, name: '黄浦区' },
      {
        id: 24,
        parentId: 2,
        name: '徐汇区',
        children: [
          { id: 241, parentId: 24, name: '田林街道' },
          {
            id: 242,
            parentId: 24,
            name: '漕河泾街道',
            children: [
              { id: 2421, parentId: 242, name: '上海科技绿洲' },
              { id: 2422, parentId: 242, name: '漕河泾开发区' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1,
    parentId: 0,
    name: '北京市',
    children: [
      { id: 12, parentId: 1, name: '朝阳区' },
      { id: 13, parentId: 1, name: '昌平区' },
      { id: 11, parentId: 1, name: '顺义区' }
    ]
  },
  {
    id: 3,
    parentId: 0,
    name: '广东省',
    children: [
      { id: 31, parentId: 3, name: '广州市' },
      { id: 32, parentId: 3, name: '深圳市' },
      { id: 33, parentId: 3, name: '东莞市' }
    ]
  }
]

// 迭代
function array2Tree(array) {
  let result = []
  let map = new Map()
  array.forEach(item => map.set(item.id, item))
  array.forEach(item => {
    const parent = map.get(item.parentId)
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// 迭代
function tree2Array(tree) {
  if (tree.length === 0) return tree
  let result = []
  let queue = []
  tree.forEach(node => {
    queue.push(node)
  })
  while (queue.length) {
    const n = queue.shift()
    if (n.children) {
      n.children.forEach(item => queue.push(item))
    }
    result.push(n)
  }
  return result
}

function tree2Array2(tree) {
  if (!tree || tree.length === 0) return tree
  let result = []
  let stack = [...tree]
  while (stack.length) {
    const node = stack.pop()
    result.push(node)
    if (node.children) {
      stack.push(...node.children)
    }
  }
  return result
}

console.log(array2Tree(list))
console.log(tree2Array(tree))
console.log(tree2Array2(tree))