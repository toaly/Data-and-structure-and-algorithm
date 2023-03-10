// 标准惰性单例
// class Singleton {
//     private static instance: Singleton;
//     public constructor() { }
//     public static getInstance(): Singleton {
//         if (!Singleton.instance) {
//             Singleton.instance = new Singleton()
//         }
//         return Singleton.instance;
//     }
// }

// const instance1 = Singleton.getInstance();
// const instance2 = Singleton.getInstance();
// console.log(instance1 === instance2);


// 通用惰性单例
// 所谓通用的惰性单例，实际上就是将管理单例对象和创建单例对象的逻辑分离开来（**单一职责原则**）


//处理单例
function createSingleton<T>(creator: () => T): () => T {
    let instance: T | undefined;

    return function () {
        if (instance === undefined) {
            instance = creator();
        }

        return instance;
    };
}

// 一个功能类
class Logger {
    constructor() {
        console.log('new Logger instance created');
    }
    log(message: string) {
        console.log(message);
    }
}

// 创建那个类的对象的逻辑
let fn = () => {
    return new Logger()
}

const getLogger = createSingleton(fn);

const logger1 = getLogger();
const logger2 = getLogger();

console.log(logger1 === logger2); // true
logger1.log("logging1")
logger2.log("logging2")


