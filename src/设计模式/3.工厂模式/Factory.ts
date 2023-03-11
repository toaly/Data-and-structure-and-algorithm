// ------------------简单工厂模式


class Dog { // 狗狗 
    constructor(name: string) { console.log(name) }
}

class Cat { // 小猫
    constructor(name: string) { console.log(name) }
}

class Mouse { // 小老鼠
    constructor(name: string) { console.log(name) }
}


class Pet {
    private pet;
    constructor(type: string, name: string) {
        switch (type) {
            case 'dog':
                this.pet = new Dog(name);
                break;
            case 'cat':
                this.pet = new Cat(name);
                break;
            case 'mouse':
                this.pet = new Mouse(name);
                break;
            default: this.pet = '你还没有小宠物，快去买一只吧';
        }
    }
}

// 购买新的小宠物
new Pet('dog', 'Spike')
new Pet('cat', 'Tom')
new Pet('mouse', 'Jerry')

// ------------------类简单工厂模式
function getFunction(path: string, params: string) { // get请求  
    console.log(path, params)
}

function postFunction(path: string, params: string) { // post请求  
    console.log(path, params)
}

function putFunction(path: string, params: string) { // put请求  
    console.log(path, params)
}

function ajaxSend(type: string, path: string, params: string) { // ajax发送请求  
    switch (type) {
        case 'post': {
            postFunction(path, params)
            break;
        };
        case 'put': {
            putFunction(path, params)
            break;
        };
        default:
            getFunction(path, params)
    }
}

ajaxSend('get', 'path', 'params')





// ------------------------工厂方法模式(Factory Method)

type PetName = 'dog' | 'cat' | 'mouse' | 'duck';
type Pets = {
    [K in PetName]: (name: string) => void;
};

const FactoryPet = (() => { // 宠物店升级啦  
    const pets: Pets = {
        dog(name: string) { console.log(name) },
        cat(name: string) { console.log(name) },
        mouse(name: string) { console.log(name) },
        duck(name: string) { // 我是新来的宠物小鸭子      
            console.log(name)
        }
    }

    return class {
        constructor(type: PetName, name: string) {
            try { pets[type](name) }
            catch (error) { console.log('你还没有小宠物，快去买一只吧') }
        }
    }
})()

// 重新购买小宠物
new FactoryPet('dog', 'Spike')
new FactoryPet('cat', 'Tom')
new FactoryPet('duck', 'Duck')
type typeName = 'get' | 'post' | 'put';
type AxiosType = {
    [k in typeName]: (path: string, params: string) => void;
}
const axiosType: AxiosType = {
    get(path: string, params: string) { // get请求  
        console.log(path, params)
    },

    post(path: string, params: string) { // post请求  
        console.log(path, params)
    },

    put(path: string, params: string) { // put请求  
        console.log(path, params)
    }
}

function ajaxSend2(type: typeName, path: string, params: string) { // ajax发送请求  
    try { axiosType[type](path, params) }
    catch (error) { console.log('暂无匹配方法') }
}

ajaxSend2("get", "path2", "params2")


// 抽象工厂类
interface CPU {
    readonly manufacture: string;
    readonly model: string;
}

class IntelCPU implements CPU {
    readonly manufacture = "Intel";
    readonly model = "i7-10700K";
}

class AMDCPU implements CPU {
    readonly manufacture = "AMD";
    readonly model = "Ryzen 9 5950X";
}

interface Memory {
    readonly manufacture: string;
    readonly model: string;
}

class CorsairMemory implements Memory {
    readonly manufacture = "Corsair";
    readonly model = "32GB DDR4";
}

class KingstonMemory implements Memory {
    readonly manufacture = "Kingston";
    readonly model = "32GB DDR4";
}

interface Motherboard {
    readonly manufacture: string;
    readonly model: string;
}

class ASUSMotherboard implements Motherboard {
    readonly manufacture = "ASUS";
    readonly model = "ROG Maximus XII Hero";
}

class GigabyteMotherboard implements Motherboard {
    readonly manufacture = "Gigabyte";
    readonly model = "AORUS X570 Master";
}

interface GraphicsCard {
    readonly manufacture: string;
    readonly model: string;
}

class NVIDIAGraphicsCard implements GraphicsCard {
    readonly manufacture = "NVIDIA";
    readonly model = "GeForce RTX 3080";
}

class AMDGraphicsCard implements GraphicsCard {
    readonly manufacture = "AMD";
    readonly model = "Radeon RX 6900 XT";
}

interface ComputerFactory {
    createCPU(): CPU;
    createMemory(): Memory;
    createMotherboard(): Motherboard;
    createGraphicsCard(): GraphicsCard;
}

class IntelComputerFactory implements ComputerFactory {
    public createCPU(): CPU {
        return new IntelCPU();
    }

    public createMemory(): Memory {
        return new CorsairMemory();
    }

    public createMotherboard(): Motherboard {
        return new ASUSMotherboard();
    }

    public createGraphicsCard(): GraphicsCard {
        return new NVIDIAGraphicsCard();
    }
}



class AMDComputerFactory implements ComputerFactory {
    public createCPU(): CPU {
        return new AMDCPU();
    }

    public createMemory(): Memory {
        return new KingstonMemory();
    }

    public createMotherboard(): Motherboard {
        return new GigabyteMotherboard();
    }

    public createGraphicsCard(): GraphicsCard {
        return new AMDGraphicsCard();
    }
}


const intelComputer = new IntelComputerFactory();
console.log("Intel CPU: ", intelComputer.createCPU());
console.log("Memory: ", intelComputer.createMemory());
console.log("Motherboard: ", intelComputer.createMotherboard());
console.log("Graphics Card: ", intelComputer.createGraphicsCard());


const amdComputer = new AMDComputerFactory();
console.log("AMD CPU: ", amdComputer.createCPU());
console.log("Memory: ", amdComputer.createMemory());
console.log("Motherboard: ", amdComputer.createMotherboard());
console.log("Graphics Card: ", amdComputer.createGraphicsCard());
