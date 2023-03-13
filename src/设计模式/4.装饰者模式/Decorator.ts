//// 煎饼果子
// 煎饼果子，加料
class Pancake {
    name = "煎饼果子";
    //获取煎饼果子的名字
    getName() {
        return this.name;
    }

    // 获取价格
    getPrice() {
        return 5;
    }
}

// 装饰类 对原有对象的基本装饰 给原套餐煎饼装饰
class PancakeDecorator {
    pancake: Pancake;
    constructor(pancake: Pancake) {
        this.pancake = pancake;
    }

    //获取煎饼果子的名字
    getName() {
        return this.pancake.getName();
    }

    // 获取价格
    getPrice() {
        return this.pancake.getPrice();
    }
}


// 加蛋
class PancakeDecoratorWithEgg extends PancakeDecorator {
    constructor(pancake: Pancake) {
        super(pancake)
        this.name = `${pancake.getName()}➕鸡蛋`;
    }
    // 获取煎饼果子加鸡蛋的名字
    // 获取煎饼果子加鸡蛋的名字
    name: string;
    getName() {
        return `${this.pancake.getName()}➕鸡蛋`;
    }
    getPrice() {
        return this.pancake.getPrice() + 2;
    }
}

// 加香肠
class PancakeDecoratorWithSausage extends PancakeDecorator {
    constructor(pancake: Pancake) {
        super(pancake)
        this.name = `${pancake.getName()}➕香肠`;
    }
    name: string;
    getName() {
        return `${this.pancake.getName()}➕香肠`;
    }
    getPrice() {
        return this.pancake.getPrice() + 1.5;
    }
}

// 加培根
class PancakeDecoratorWithBacon extends PancakeDecorator {
    constructor(pancake: Pancake) {
        super(pancake)
        this.name = `${pancake.getName()}➕培根`;
    }
    // 加培根
    name: string;
    getName() {
        return `${this.pancake.getName()}➕培根`;
    }

    getPrice() {
        return this.pancake.getPrice() + 3;
    }
}

// 基本煎饼果子
let pancake = new Pancake();
console.log(pancake.getName(), pancake.getPrice());
// 加鸡蛋
const pancake1 = new PancakeDecoratorWithEgg(pancake);
console.log(pancake1.getName(), pancake1.getPrice());
// 加香肠
const pancake2 = new PancakeDecoratorWithSausage(pancake1);
console.log(pancake2.getName(), pancake2.getPrice());
// 加培根
const pancake3 = new PancakeDecoratorWithBacon(pancake2);
console.log(pancake3.getName(), pancake3.getPrice());


const decorateArmour: MethodDecorator = (target, key, descriptor: PropertyDescriptor): object => {
    const method = descriptor.value;
    let moreDef = 100;
    let ret;
    descriptor.value = function (...args: number[]): any {
        args[0] += moreDef;
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor;
}


const decorateLight: MethodDecorator = (target, key, descriptor: PropertyDescriptor) => {
    let method = descriptor.value;
    let moreAtk = 100;
    let ret;
    descriptor.value = (...args: number[]): any => {
        args[1] += moreAtk;
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor

}

function run(canFly: boolean) {
    return function <T extends { new(...args: any[]): any }>(target: T) {
        return class extends target {
            canFly = canFly;
            toString(...args: any[]) {
                let extra = this.canFly ? '(技能加成:飞行能力)' : '';
                return super.toString(...args) + extra;
            }
        };
    }
}

@run(true)
class Man {
    def!: number;
    atk!: number;
    hp!: number;

    constructor(def = 2, atk = 3, hp = 3) {
        this.init(def, atk, hp);
    }

    @decorateArmour
    @decorateLight
    init(def: number, atk: number, hp: number): void {
        this.def = def;  // 防御值
        this.atk = atk;  // 攻击力
        this.hp = hp;  // 血量
    }

    toString(): string {
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
}

const tony = new Man();
console.log(`当前状态 ===> ${tony}`);



const log = (type: string): MethodDecorator => {
    return (target, name, descriptor: PropertyDescriptor) => {
        const method = descriptor.value;
        console.info(`(${type}) 正在执行: ${name.toString()} ......`);
        let ret: string;
        descriptor.value = (...args: any[]) => {
            try {
                ret = method.apply(target, args);
                console.info(`(${type}) 成功 : ${name.toString()}(${args}) => ${ret}`);
            } catch (error) {
                console.info(`(${type}) 成功 : ${name.toString()}(${args}) => ${error}`);
            }
            return ret;
        }
        return descriptor
    }
}

class IronMan {

    @log('IronMan 自检阶段')
    check() {
        return '检查完毕';
    }

    @log('IronMan 攻击阶段')
    attack() {
        return '击倒敌人';
    }

    @log('IronMan 机体报错')
    error() {
        throw 'Something is wrong!';
    }
}

var tonyDO = new IronMan();
tonyDO.check();
tonyDO.attack();
tonyDO.error();



