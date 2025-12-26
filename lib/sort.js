function bubbleSort(data) {
  for(let i = 0; i < data.length - 1; i++) {
    let isSorted = true
    for(let j = 0; j < data.length - i -1; j++) {
      if(data[j] > data[j+1]) {
        isSorted = false
        const temp = data[j]
        data[j] = data[j+1]
        data[j+1] = temp
      }
    }
    if(isSorted) break
  }
  return data
}

function quickSort(arr) {
  if(arr.length < 2) return arr
  const left = []
  const right = []
  const pivot = arr[0]
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

function quickSortInPlace(arr, left, right) {
  if(left < right) {
    let pivotIndex = partition(arr, left, right)
    quickSortInPlace(arr, left, pivotIndex -1)
    quickSortInPlace(arr, pivotIndex+1, right)
  }
  return arr
}
function partition(arr, left, right) {
  let pivot = arr[right]
  let i = left - 1
  for(let j = left; j < right; j++) {
    if(arr[j] < pivot) {
      i++
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  [arr[i+1], arr[right]] = [arr[right], arr[i+1]]
  return i+1
}

function mergeSort(arr) {
  if(arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  let result = []
  let i = 0
  let j = 0
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j))
}