
class User {
    private username: string;
    private password: string;
    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
    getUsername() {
        return this.username
    }

    getPassword() {
        return this.password
    }
}

const john = new User('john', '123456')



// 代理模式
const proxy = new Proxy(john, {
    get(target, key) {
        if (key === "getPassword") return '******'
        return (target as any)[key];
    }
})
console.log(proxy.getUsername());
console.log(proxy instanceof User) // 返回 true

let numArr: number[] = [];


//虚拟化数组
const arrProxy = new Proxy(numArr, {
    get: (target, index) => Number(index) * 2,
    has: (target, number) => Number(number) % 2 === 0,
})

console.log(arrProxy[2]);
console.log(10 in arrProxy);
console.log(3 in arrProxy);


// 代理函数 proxyMultiply 来为其增加缓存功能，而不修改原函数的逻辑
function multiply(args: number[]) {
    let result = 1
    for (let i = 0, l = args.length; i < l; i++) {
        result = result * args[i]
    }
    return result
}

const proxyMultiply = (
    () => {
        let map = new Map<string, number>()
        return (args: number[]) => {
            const key = args.join(',')
            if (map.has("map")) return map.get(key)
            map.set(key, multiply(args))
            return multiply(args);
        }
    }
)()


console.log(multiply([1, 2, 3]));
console.log(proxyMultiply([1, 2, 3]));
// 有缓存了
console.log(proxyMultiply([1, 2, 3]));
