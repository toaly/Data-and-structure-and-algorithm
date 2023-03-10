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
const FactoryPet = (() => { // 宠物店升级啦  
    const pets = {
        dog(name: string) { console.log(name) },
        cat(name: string) { console.log(name) },
        mouse(name: string) { console.log(name) },
        duck(name: string) { // 我是新来的宠物小鸭子      
            console.log(name)
        }
    }

    return class {
        constructor(type: string, name: keyof pets) {
            try { (pets)[name](name) }
            catch (error) { console.log('你还没有小宠物，快去买一只吧') }
        }
    }
})()

// 重新购买小宠物
new FactoryPet('dog', 'Spike')
new FactoryPet('cat', 'Tom')
new FactoryPet('duck', 'Duck')