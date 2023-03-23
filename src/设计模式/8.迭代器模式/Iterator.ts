interface IteratorType<T> {
    next: () => T;
    hasNext: () => boolean;
}


class Collection {
    constructor(private numbers: number[]) {
    }

    public createIterator() {
        return new AllIterator(this.numbers);
    }
}


class AllIterator implements IteratorType<{ value?: number, done: boolean }> {
    private index = 0
    private _numbers: number[] = [];

    constructor(numbers: number[]) {
        this._numbers = numbers
    }
    next(): { value?: number, done: boolean } {
        if (this.index < this._numbers.length ) {
            const currentItem = this._numbers[this.index++];
            return { value: currentItem, done: false };
        } else {
            return { value: undefined, done: true }
        }
    }
    hasNext(): boolean {
        return this._numbers.length > this.index
    }

}

const collection = new Collection([1, 2, 3]);
const iterator = collection.createIterator()
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
