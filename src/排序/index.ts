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
}

console.log(bubbleSort([1, 3, 4, 2, 5, 6]), "bubbleSort");
// [1,2,3,4,5,6]

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



// 插入排序
function insertionSort(arr: number[]): number[] {
    let len = arr.length, currtent, previous;
    for (let i = 1; i < len; i++) {
        currtent = arr[i]; //初始数组的二个元素
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

console.log(mergeSort([6, 1, 4, 5, 3,]), "mergeSort");
// [1,2,3,4,5,6]

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
// [1,2,3,4,5,6]


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



