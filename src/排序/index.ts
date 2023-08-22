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

console.log(mergeSort([ 6,1,4,5, 3,]), "mergeSort");
// [1,2,3,4,5,6]