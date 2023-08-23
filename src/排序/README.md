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

### 插入排序

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

### 快速排序

算法描述

> **将若干有序序列逐步归并，最终归并为一个有序序列。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，始终是`O(n log n）`的时间复杂度。代价是需要额外的内存空间**

```typescript
// 快速排序
function quickSort(arr: number[]): number[] {
    let len = arr.length;
    if (len < 2) return arr;
    let left: number[] = [];
    let right: number[] = [];
    const mid = arr[0];
    for (let i = 1; i < len; i++) {
        if (arr[i] <= mid) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([mid], quickSort(right))
}

// es6 简写版
function quickSort2(arr: number[]): number[] {
    if (arr && arr.length < 2) return arr;
    const [prev, ...rest] = arr;
    return [...quickSort(rest.filter((value) => value < prev)), prev, ...quickSort(rest.filter((value) => value > prev))]
}


console.log(quickSort([1, 3, 4, 2, 5, 6, 10, 99]), "quickSort");
// [1,2,3,4,5,6]kSort");
// [1,2,3,4,5,6]
```

- 平均时间复杂度为O(nlogn),空间复杂度为O(logn)
- 速排序是一种不稳定的排序算法，即相同值的元素在排序过程中可能会改变相对顺序
- 使用大规模乱序数据的排序效率较高



### 计数排序

算法描述

> **使用一个额外的数组X，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组X将A中的元素排到正确的位置。只能对整数进行排序**

```typescript
// 计数排序
function countingSort(arr: number[]): number[] {
    const len = arr.length;
    const min = Math.min(...arr)
    const max = Math.max(...arr)

    // 创建一个数组，长度为最大最小值的差值，为了把里面的值存放到对于的位置上并记录出现的次数
    const countArr = new Array(max - min + 1).fill(0);

    // 开始计数出现的次数
    for (let i = 0; i < len; i++) {
        countArr[arr[i] - min]++;
    }

    // 将有序计数的countArr转成有序的列表
    let outputIndex = 0;
    for (let i = 0; i < countArr.length; i++) {
        while (countArr[i] > 0) {
            arr[outputIndex] = i + min;
            outputIndex++;
            countArr[i]--;
        }
    }

    return arr;
}

console.log(countingSort([1, 3, 4, 2, 5, 6]), "countingSort");
// [1,2,3,4,5,6]

```

- 时间复杂度为O(n+k)，其中n是待排序数组的长度，k是计数范围，要求待排序的元素必须是整数且范围不宜过大
- 数排序是一种稳定的排序算法，即相同值的元素在排序过程中不会改变相对顺序
- 特别适用于处理大量重复元素的排序任务，例如对年龄、成绩、身高等离散数据进行排序



### 基数排序

算法描述

> **按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是稳定的**

```typescript
// 基数排序
function radixSort(arr: number[]): number[] {
    // 最高位数
    const count = countDigits(Math.max(...arr))
    for (let i = 0; i < count; i++) {
        //垃圾桶
        const buckets: number[][] = Array.from({ length: 10 }, () => []);

        // 
        for (let j = 0; j < arr.length; j++) {
            const idx = getDigit(arr[j], i);
            buckets[idx].push(arr[j]);
        }
        arr = [].concat(...buckets as []);
    }

    return arr;
}

// 计算数字的位数
function countDigits(num: number): number {
    if (num === 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
}

/**
 * @description: 
// 获取数字指定位上的值
 * @param {number} num 值
 * @param {number} place 那个位数，0 代表个位...
 * @return {值}
 */
function getDigit(num: number, place: number): number {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

console.log(radixSort([1, 3, 4, 2, 5, 6,45,33,33,66,54,22]), "radixSort");
// [1,2,3,4,5,6]

```

- 基数排序的时间复杂度为O(d*(n+k))，其中n是待排序数组的长度，d是最大值的位数，k是基数（例如十进制中的10，空间复杂度为O(n+k)
- 数排序是一种稳定的排序算法，即相同值的元素在排序过程中不会改变相对顺序
- 基数排序适用于待排序元素是非负整数的情况。 它对于位数较小的整数排序效果较好，尤其在位数相差不大的情况下。基数排序在实际应用中常用于整数排序、字符串排序和日期排序等场景



常见的十大排序算法的平均、最好和最差情况下的时间复杂度、空间复杂度和稳定性，汇总如下：

| 算法   | 平均时间复杂度    | 最好时间复杂度      | 最差时间复杂度      | 空间复杂度    | 稳定性 |
| ---- | ---------- | ------------ | ------------ | -------- | --- |
| 冒泡排序 | O(n^2)     | O(n)         | O(n^2)       | O(1)     | 稳定  |
| 选择排序 | O(n^2)     | O(n^2)       | O(n^2)       | O(1)     | 不稳定 |
| 插入排序 | O(n^2)     | O(n)         | O(n^2)       | O(1)     | 稳定  |
| 快速排序 | O(n log n) | O(n log n)   | O(n^2)       | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n log n)   | O(n log n)   | O(n)     | 稳定  |
| 堆排序  | O(n log n) | O(n log n)   | O(n log n)   | O(1)     | 不稳定 |
| 希尔排序 | O(n log n) | O(n log^2 n) | O(n log^2 n) | O(1)     | 不稳定 |
| 计数排序 | O(n + k)   | O(n + k)     | O(n + k)     | O(n + k) | 稳定  |
| 桶排序  | O(n + k)   | O(n + k)     | O(n^2)       | O(n + k) | 稳定  |
| 基数排序 | O(n * k)   | O(n * k)     | O(n * k)     | O(n + k) | 稳定  |