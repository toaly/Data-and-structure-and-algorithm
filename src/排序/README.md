## 排序算法

### <mark>前言</mark>

用最少的操作，排列成需要的队伍。不同的排序算法在时间复杂度和空间复杂度上有不同的特点

### 冒泡排序

算法描述

> **见名知意，冒泡排序，就是想泡泡在水里一样，在水里大的泡泡先浮出水面，就是大的先排出来，最小的最慢排出，对于大规模的数据集，选择排序的效率较低**



[示例网站](https://visualgo.net/zh/sorting)



```typescript
// 冒泡排序

function bubbleSort(arr: number[]): number[] {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let flag = false; // 阈值
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
        if (!flag) {
            break;
        }
    }
    return arr;
}));
// [1,2,3,4,5,6]
```

- j<len - 1 - i的含义是使用arr[j+1]表示最后一个元素，- i 则是代表减少的比较次数，因为每执行一次循环，数组尾部是一个最大的数值，不需要再次比较。

- flag 的作用是先检查内部的循环是否发生交换，没有则代表数组是有序的，则推迟外部循环，提高效率

- 时间复杂度O(n^2)，空间复杂度O(1)



### 选择排序

算法描述

> **选择排序的原理是每一轮从待排序的元素中选择最小（或最大）的元素，将其与序列中的第一个元素交换位置，然后再从剩下的元素中选择最小（或最大）的元素，与序列中的第二个元素交换位置，直至整个序列结束**



```typescript
//选择排序
function selectionSort(arr: number[]): number[] {
    let len = arr.length, minIdx;
    for (let i = 0; i < len - 1; i++) {
        minIdx = i;// 最小索引
        for (let j = i + 1; j < len; j++) {
            if (arr[minIdx] > arr[j]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}


console.log(selectionSort([1, 3, 4, 2, 5, 6]), "selectionSort");
// [1,2,3,4,5,6]
```

- 时间复杂度O(n^2)

### 插入排序````

算法描述

> **插入排序是将待排序的元素逐个插入到已排序序列中的合适位置，直到整个序列有序**

```typescript

// 插入排序
function insertionSort(arr: number[]): number[] {
    let len = arr.length, currtent, previous;
    for (let i = 1; i < len; i++) {
        currtent = arr[i];
        previous = i - 1;// 代表前面已经有序的数组，currtent插进这个某一个位置
        while (previous >= 0 && arr[previous] > currtent) {
            arr[previous + 1] = arr[previous]
            previous--;
        }
        // 相等或者小于previous
        arr[previous + 1] = currtent
    }
    return arr;
}

console.log(insertionSort([1, 3, 4, 2, 5, 6]), "insertionSort");
// [1,2,3,4,5,6]


```

- 时间复杂度O(n^2)



### 归并排序

算法描述

> **将若干有序序列逐步归并，最终归并为一个有序序列。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，始终是`O(n log n）`的时间复杂度。代价是需要额外的内存空间**

```typescript
// 归并排序
function mergeSort(arr: number[]): number[] {
    if (arr.length < 2) return arr;
    let mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid, arr.length)
    return merge(mergeSort(left), mergeSort(right))
}

// 合并数组为有序数组 例如 【1,3】 【2,4,5】 =>[1,2,3,4,5]
function merge(left: number[], right: number[]): number[] {
    let tem: number[] = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tem.push(left.shift()!)
        } else {
            tem.push(right.shift()!)
        }
    }
    return tem.concat(left, right)
}

console.log(mergeSort([ 6,1,4,5, 3,]), "mergeSort");
// [1,2,3,4,5,6]6]ort");
// [1,2,3,4,5,6]
```

- 时间复杂度O(nlogn),空间复杂度为O(n)
- tem.concat(left, right) ,tem是头部，拼接后面的有序