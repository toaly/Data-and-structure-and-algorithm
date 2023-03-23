

# 1.设计模式

好的，设计模式是一种通用解决方案，用于处理在软件开发中经常遇到的问题。设计模式可以帮助开发者高效地编写代码，减少错误并提高可维护性。

下面简单介绍一些常用的设计模式：

1. 工厂模式（Factory Pattern） 工厂模式是一种创建型模式，它通过定义一个工厂方法来创建对象。这种模式可以将对象的创建和使用分开，从而降低耦合性。常见的实现方式有简单工厂、工厂方法和抽象工厂。
2. 单例模式（Singleton Pattern） 单例模式是一种创建型模式，它保证一个类只有一个实例，并提供全局访问点。它通常用于管理共享资源和全局状态。
3. 观察者模式（Observer Pattern） 观察者模式是一种行为型模式，它定义了对象之间的一对多关系，当一个对象发生改变时，它的所有依赖对象都会自动通知并更新。它通常用于事件驱动程序设计和数据绑定。
4. 策略模式（Strategy Pattern） 策略模式是一种行为型模式，它定义了一系列算法，并将每个算法封装成一个独立的对象。这些算法可以互换使用，从而使得算法的变化不会影响到客户端代码。
5. 适配器模式（Adapter Pattern） 适配器模式是一种结构型模式，它将一个类的接口转换成客户端所期望的另一个接口。这种模式可以解决接口不兼容的问题，使得原本不能工作的类可以一起工作。

以上仅是一些常用的设计模式，还有很多其他的设计模式，根据具体的需求来选择适合的设计模式可以提高代码质量和开发效率。

- 工厂模式
- 单例模式
- 代理模式
- 策略模式
- 建造者模式
- 观察者模式
- 适配器模式
- 装饰器模式
- 迭代器模式
- 中间件模式
- ……

## 1.1单例模式

https://juejin.cn/post/7150986499935666190#heading-5

单例模式可以帮助我们确保一个类只有一个实例，这样可以减少内存开销，提高代码效率和可维护性。

在实际应用中，单例模式可以应用于以下场景：

1. 全局配置类：例如一个全局的配置管理类，需要确保在整个应用程序中只有一个实例，以防止配置出现冲突，同时也可以提高应用程序的性能和可维护性。
2. 数据库连接池：在一个应用程序中，数据库连接是非常重要和常见的资源，为了避免在不同的线程中创建多个数据库连接，可以使用单例模式来创建一个全局的数据库连接池。
3. 日志管理器：日志记录是开发过程中常见的需求，为了方便记录和管理日志，可以使用单例模式来创建一个全局的日志管理器，以避免日志记录出现冲突或其他问题。

现在，我们来看一下具体的单例模式的实现。

在 JavaScript 中，可以使用闭包和函数的私有变量来实现单例模式，例如：

```javascript
class Singleton {
  private static instance: Singleton;

  private constructor() {
    // 单例类的构造函数
    // ...
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  // 其他方法和属性
}

// 使用单例
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // 输出 true
```

在上面的示例中，我们使用了类的静态属性和静态方法来实现单例模式，以确保实例只创建一次。在类的 constructor 方法中实现单例类的构造函数，保证在创建对象时只执行一次。getInstance 方法中判断是否已经创建了实例，如果没有创建则创建一个实例，否则返回现有实例。最后，我们使用 const 定义实例，这样就可以确保实例不会被修改。

在实际应用中，我们可以将这个单例实例用于全局的配置管理、日志记录、数据库连接池等场景中，以提高应用程序的性能和可维护性。同时，使用 TypeScript 和 ES6+ 语法可以提高代码的可读性和可维护性。



通用惰性单例

所谓通用的惰性单例，实际上就是将管理单例对象和创建单例对象的逻辑分离开来（**单一职责原则**）



```typescript
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
```

## 1.2代理模式

基本概念

代理模式用来管控用户对另一个对象的访问.这里面有两个角色：**代理对象**（Proxy）和**目标对象**（Target）。当用户通过代理对象来操作目标对象的时候，代理对象可以把目标对象执行的操作拦截下来，以便增强或补充一些功能。例如下面的代码创建了一个私有的用户对象：

```javascript
class User {
  constructor(username, password) {
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

```

在登录的时候，我们可以使用这个对象将用户名和密码发送给后台接口，从而获取登录态。但是在其他的时候，不想让暴露密码敏感信息，就可以创建一个代理对象来屏蔽相关信息：

```js
class SafeUser {
  constructor(user) {
    this.user = user
  }

  getUsername() {
    return this.user.username
  }

  getPassword() {
    return '******'
  }
}

const safeJohn = new SafeUser(john)
console.log(safeJohn.getPassword()) // ******
复制代码
```

这个时候，safeJohn 就是 john 的代理对象，它实现了 john 的所有接口，并做了一些特殊处理。因此，Proxy 可以理解为：

> 在目标对象之前架设一层拦截，外界对该对象的访问，都必须先通过这层拦截，通过这种机制，可以对外界的访问进行过滤和改写。



应用场景

代理模式有很多的使用场景，例如：

- **数据校验**：先让代理检查数据合法性，验证通过之后再把数据传给目标对象。
- **权限拦截**：先让代理检查访问权限，若无权限则直接报错。
- **增加缓存**：在不修改目标对象的前提下，增加缓存功能，加快访问速度。
- **惰性求值**：当创建目标对象开销很大时，可以让代理对象尽可能推迟目标对象的创建，只在必须用到的时候才去创建。
- **日志打点**：拦截下来，并记录调用的方法名称、传递的参数和调用的时间等。
- **远程对象**：表示一个远程对象，使用起来和本地对象一样，但是内部实现却是不同的。

在给目标对象做代理的时候，可以让代理对象把目标对象的所有方法都拦截下来，也可以只拦截一部分方法。上面的案例是通过组合技术实现代理模式，还有一种方式是通过增强原对象的方式，例如：

```js
john.getPasswordOrig = john.getPassword
john.getPassword = () => '******'
console.log(john.getPassword())
复制代码
```

如果是只给一个或几个方法做代理，这种写法是非常方便的，但有潜在危险，因为直接修改了对象的状态与处理逻辑，可能会对使用该对象的其他程序造成影响。例如在登录的时候，如果拿到的 passworld 也是 ****** 的话，就会导致无法登录了。

如果既想要简洁，又想要安全，那么可以用 ES6 内置的 Proxy 对象来创建代理对象，能够满足所有需求，功能非常强大，例如：

```js
const safeUser = new Proxy(john, {
  get(target, key) {
    if (key === 'getPassword') return () => '******'
    return target[key]()
  },
})

console.log(safeUser.getPassword())
复制代码
```

而且内置的 Proxy 生成的对象，会继承目标对象的 prototype，所以用 instanceof 操作符是返回结果是 true，真正做到了无感代理：

```js
console.log(safeUser instanceof User) // 返回 true
复制代码
```

而且通过 Proxy 技术，可以实现对象虚拟化，例如下面的代码创建了「全体偶数」这样一个虚拟对象：

```js
const evenNumbers = new Proxy([], {
  get: (target, index) => index * 2,
  has: (target, number) => number % 2 === 0,
})
console.log(2 in evenNumbers) // true
console.log(5 in evenNumbers) // false
console.log(evenNumbers[7]) // 14
复制代码
```

我们可以把这个虚拟对象当成普通的数组来使用，就像真的在访问数组一样，但实际上并没有保存实际数据，因此被称为虚拟数组。

另外，代理是一个比较宽泛的概念，不一定只针对于对象，对于函数也可以做代理，例如下面的乘积函数：

```js
function multiply(...args) {
  let result = 1
  for (let i = 0, l = args.length; i < l; i++) {
    result = result * args[i]
  }
  return result
}
复制代码
```

我们完全可以写一个代理函数 proxyMultiply 来为其增加缓存功能，而不修改原函数的逻辑，这对于耗时的函数尤其有用：

```js
const proxyMultiply = (function () {
  let cache = {}
  return function (...args) {
    const key = args.join(',')
    if (key in cache) return cache[key]
    return (cache[key] = multiply(...args))
  }
})()
复制代码
```

不过需要注意，这里的代理模式和 DOM 事件中常用的事件代理（event delegation）不是一回事，事件代理的原理是通过事件冒泡，让父元素代理子元素接收相关事件，然后通过 `event.target`的方式获取目标元素，例如下面的代码：

```html
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>
复制代码
```

为了监听 menu 下面所有 button 的事件，没必要为每个 button 都增加事件监听函数，而是在 Menu 上监听事件：

```js
<script>
  menu.addEventListener('click', (event) => {
    const {target} = event
    const {action} = target.dataset
    console.log(action, target)
  })
</script>
```

典型示例

### Vue.js

在 Vue2 里面，是通过 `Object.defineProperty`来创建代理对象，让其变成响应式的，核心代码如下：

```typescript
export function defineReactive(obj: object, key: string, val?: any, customSetter?: Function | null, shallow?: boolean) {
  const dep = new Dep()
	// 省略代码...
  let childOb = !shallow && observe(val, false, mock)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (isArray(value)) {
            dependArray(value)
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value
    },
    set: function reactiveSetter(newVal) {
      // 省略代码...
      childOb = !shallow && observe(newVal, false, mock)
      dep.notify()
    }
  })
  return dep
}
复制代码
```

而在 Vue3 里面，则利用了 Proxy 实现依赖收集，让目标对象的状态变化及时通知到一个或多个观察者，从而做出响应：

```typescript
function createReactiveObject(target: Target, isReadonly: boolean, baseHandlers: ProxyHandler<any>, collectionHandlers: ProxyHandler<any>, proxyMap: WeakMap<Target, any>) {
  if (!isObject(target)) return target
  const existingProxy = proxyMap.get(target)
  if (existingProxy) return existingProxy
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) return target
  const proxy = new Proxy(target, targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
复制代码
```

### MobX

在 [mobx](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmobxjs%2Fmobx) 当中，也是利用 Proxy 来实现对象代理来自动更新视图的，示例代码如下：

```jsx
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

class Timer {
    secondsPassed = 0
    constructor() {
        makeAutoObservable(this)
    }
    increase() {
        this.secondsPassed += 1
    }
    reset() {
        this.secondsPassed = 0
    }
}

const myTimer = new Timer()
const TimerView = observer(({ timer }) => (
    <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
))

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increase()
}, 1000)
复制代码
```

observer 函数将普通的函数组件变成了可观测的代理组件，从而能够监听属性的变化，进而触发页面重新渲染。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c2329c57508467a9843fa83afe05146~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### @electron/remote

在使用 Electron 开发桌面软件时，可以用 [@electron/remote](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Felectron%2Fremote) 这个包在渲染进程中创建一个只在主进程存在的远程对象：

```js
const { BrowserWindow } = require('@electron/remote')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
复制代码
```

虽然拿到的对象是一个远程对象，但是用户完全可以把该对象当成本地对象来使用，包括调用远程对象的方法，其背后则是使用了同步的 ipc 消息通道来调用远程方法，核心代码如下：

```js
function proxyFunctionProperties (remoteMemberFunction: Function, metaId: number, name: string) {
  let loaded = false

  const loadRemoteProperties = () => {
    // 省略代码...
    const meta = ipcRenderer.sendSync(command, contextId, metaId, name)
  }

  return new Proxy(remoteMemberFunction as any, {
    set: (target, property, value) => {
      if (property !== 'ref') loadRemoteProperties()
      target[property] = value
      return true
    },
    get: (target, property) => {
      if (!Object.prototype.hasOwnProperty.call(target, property)) loadRemoteProperties()
      const value = target[property]
      if (property === 'toString' && typeof value === 'function') {
        return value.bind(target)
      }
      return value
    },
  })
}
```

## 1.3工厂模式

https://juejin.cn/post/6844904184257609735#heading-3

工厂模式是一种创建型设计模式，它提供了一种封装对象创建过程的方式，以便在不暴露对象创建过程的情况下，根据条件来统一创建不同的对象。

工厂模式通常包括一个工厂类，该类可以根据传入的参数来创建不同的对象。比如，我们可以创建一个图形工厂，根据传入的参数来创建不同的图形，比如圆形、矩形等。这种方式可以将对象的创建过程统一起来，提高代码的可维护性和可扩展性。

工厂模式主要有三种实现方式：简单工厂模式、工厂方法模式和抽象工厂模式。

### 简单工厂模式

简单工厂模式最大的优点在于实现**对象的创建和对象的使用分离**，将对象的创建交给专门的工厂类负责，但是其最大的缺点在于工厂类不够灵活，增加新的具体产品需要修改工厂类的判断逻辑代码，而且产品较多时，工厂方法代码逻辑将会非常复杂

举个栗子，宠物有很多种，我们目前有

```javascript
class Dog { // 狗狗 
    constructor(name) { console.log(name) }
}

class Cat { // 小猫
    constructor(name) { console.log(name) }
}

class Mouse { // 小老鼠
    constructor(name) { console.log(name) }
}
复制代码
```

我们正常需要去各个进货点去购买对应的小宠物

```arduino
new Dog('Spike')
new Cat('Tom')
new Mouse('Jerry')
复制代码
```

首先上述是同属一类的实例，我们如果要去各个进货点购买小宠物的话，劳累又伤神，所以我们可以去一家宠物店挑选我们需要的小宠物

```typescript
class Pet { // 小小的宠物店 
    constructor(type, name) {
    this.pet = ""
        switch (type) {
            case 'dog': this.pet = new Dog(name); break;
            case 'cat': this.pet = new Cat(name); break;
            case 'mouse': this.pet = new Mouse(name); break;
            default: this.pet = '你还没有小宠物，快去买一只吧';
        }
    }
}

// 购买新的小宠物
new Pet('dog', 'Spike')
new Pet('cat', 'Tom')
new Pet('mouse', 'Jerry')
复制代码
```

简单工厂模式其实并不算是一种设计模式，更多的时候是一种**编程习惯**。

抛开class类，我们采用方法来写一个类简单工厂模式的代码

```csharp
function getFunction(path, params) { // get请求  
    console.log(path, params)
}

function postFunction(path, params) { // post请求  
    console.log(path, params)
}

function putFunction(path, params) { // put请求  
    console.log(path, params)
}

function ajaxSend(type, path, params) { // ajax发送请求  
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
复制代码
```

如上就是我们日常对 ajax 发送请求方法的简单封装，根据传入的 type 类型来匹配不同的发送请求的通用方法，在同一种类型的方法各自实现自己的逻辑，比如 get 请求参数放在 query 从 url 传递给后台，而 post 跟 put 的参数则是放在 body 里面发送给后台。

### 工厂方法模式(Factory Method)

工厂方法模式是对简单工厂的进一步优化， 在工厂方法模式中，我们不再提供一个统一的工厂类来创建所有的对象，而是针对不同的对象提供不同的工厂。也就是说每个对象都有一个与之对应的工厂。说的好像挺复杂，简单来说就是解决简单工厂模式存在不方便添加新的类的问题，因为添加新的类以后依然需要修改工厂函数。

那我们再接着上面的宠物例子，将小宠物店升级一番

```typescript
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
```

宠物店升级之后，我们在宠物店进货的时候，想加入新宠物-小鸭子，只需要将 duck 这个小鸭子直接上架即可，而在简单工程模式中，我们不仅仅要去小鸭子的场地进一只小鸭子，还需要在 Pet 宠物店将小鸭子上架。

如上所示，我们也可以将之前的 ajax 请求方法改造一波

```javascript
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

ajaxSend2("get","path2","params2")
```

### 抽象工厂模式(Abstract Factory)

好的，我来更详细地讲解一下抽象工厂模式的实现。

首先，我们需要明确一下什么是抽象工厂模式。抽象工厂模式是一种创建型设计模式，它允许客户端代码创建一组相关或依赖的对象，而无需指定它们的具体类。这里的“一组相关或依赖的对象”通常指的是一组具有相同或类似功能的对象，它们之间存在一定的关联或依赖关系，比如同属于某一种产品线、共用某些资源等等。

抽象工厂模式的实现通常涉及到以下几个角色：

1. 抽象产品类（Abstract Product）：定义一组抽象方法，表示一类具有相同功能的产品的公共接口。
2. 具体产品类（Concrete Product）：实现抽象产品类中的抽象方法，具体描述一个具体的产品，例如电子产品、书籍等等。
3. 抽象工厂类（Abstract Factory）：定义一组抽象方法，用于创建一系列产品对象。
4. 具体工厂类（Concrete Factory）：实现抽象工厂类中的抽象方法，具体描述一个具体的产品工厂，例如电子产品工厂、书籍工厂等等。
5. 客户端（Client）：利用抽象工厂类和抽象产品类创建一系列相关或依赖的产品对象。

在 TypeScript 中，我们可以先定义一个抽象产品类 `AbstractProduct`：

```ts
// 抽象产品类
abstract class AbstractProduct {
    public abstract doSomething(): void;
}
```

然后，我们可以派生出具体产品类 `ConcreteProductA` 和 `ConcreteProductB`：

```ts
// 具体产品类 A
class ConcreteProductA extends AbstractProduct {
    public doSomething(): void {
        console.log('ConcreteProductA doSomething');
    }
}

// 具体产品类 B
class ConcreteProductB extends AbstractProduct {
    public doSomething(): void {
        console.log('ConcreteProductB doSomething');
    }
}
```

接着，我们可以定义一个抽象工厂类 `AbstractFactory`：

```ts
// 抽象工厂类
abstract class AbstractFactory {
    public abstract createProductA(): AbstractProduct;
    public abstract createProductB(): AbstractProduct;
}
```

其中，抽象工厂类中包含了两个抽象方法 `createProductA()` 和 `createProductB()`，用于创建一系列产品对象。

最后，我们可以派生出具体工厂类 `ConcreteFactory`：

```ts
// 具体工厂类
class ConcreteFactory extends AbstractFactory {
    public createProductA(): AbstractProduct {
        return new ConcreteProductA();
    }

    public createProductB(): AbstractProduct {
        return new ConcreteProductB();
    }
}
```

在具体工厂类中，我们实现了抽象工厂类中的抽象方法，具体描述了一个具体的产品工厂，即 `ConcreteFactory`。

现在，我们可以通过客户端代码来创建一组相关或依赖的产品对象了：

```ts
// 客户端代码
class Client {
    private productA: AbstractProduct;
    private productB: AbstractProduct;

    constructor(factory: AbstractFactory) {
        this.productA = factory.createProductA();
        this.productB = factory.createProductB();
    }

    public doSomething(): void {
        this.productA.doSomething();
        this.productB.doSomething();
    }
}

// 使用
const factory: AbstractFactory = new ConcreteFactory();
const client: Client = new Client(factory);
client.doSomething();
```

在客户端代码中，我们首先创建了一个具体工厂类 `ConcreteFactory` 的实例，然后通过客户端代码来创建一组相关或依赖的产品对象。在这里，我们通过抽象工厂类 `AbstractFactory` 和抽象产品类 `AbstractProduct` 来创建这些对象，而不需要直接使用具体类。这样就提高了代码的灵活性和可维护性。

总之，抽象工厂模式是一种创建型设计模式，它可以帮助我们创建一组相关或依赖的产品对象，同时还可以将具体类的创建延迟到子类中，从而提高代码的灵活性和可维护性。

## 1.4装饰者模式

https://juejin.cn/post/6890286075856551950#heading-0

### 生活中的装饰者模式

想象一下，夏天到了，你家住在比较低的楼层，一到晚上许多的蚊子就到你家里做客，它们对你的身体进行大快朵颐让你很烦恼。你这时才发现家里的窗户上没有装上窗纱，所以一到晚上如果不及时关闭窗户的话，那么就会有很多蚊子来拜访你。但是你想晚上感受一下微风徐来，又不想被蚊子拜访，那么你要做的就是给窗户装上窗纱。

对，**给窗户装上窗纱就是使用了装饰者模式**。我们没有对原来的窗户做任何的更改，它还是那个窗户，可以打开和关闭，可以透过它观看风景，可以感受微风徐来。增加了窗纱之后，我们的窗户有了新的功能，那就是可以阻止蚊子进入室内了。**这样我们就拓展了窗户的功能，但是没有对原来的窗户做什么改变**。

生活中还有很多这样的例子，这里就不一一列举了，相信你看完这篇文章之后，会对这个设计模式有更深一步的理解。然后能够发现生活中更多这样的例子，进而加强你对这个设计模式的理解与掌握。

那么在开发中我们需要使用这个设计模式来解决什么问题呢？我们要解决的是这样的问题：**在不改变已有对象的属性和方法的前提下，对已有对象的属性和功能进行拓展**。

你会好奇为什么要这样做呢？首先已有的对象可能是你不能够修改的，为什么不能够修改？可能因为这个对象是第三方库引入的，或者是代码中全局使用的，或者是一个你还不是很熟悉和了解的对象。这些情况下，你是不能够轻易在这些对象上添加新的功能的。但是你又不得不对这个对象增加一些新的功能来满足当下的开发需求。所以这时候，使用装饰者模式就可以很好地解决这个问题。我们赶紧来学习一下吧~

### 通过一个例子来实战装饰者 

楼下卖煎饼果子的老板知道你会编写程序，所以想让你来帮忙写一个点餐的小程序，来方便他给买煎饼果子的客户点餐。报酬就是以后你来买煎饼果子给你打88折，你一听感觉还不错，所以就答应了下来。

当你准备开始的时候，老板告诉你说他的点餐系统已经有一部分代码了，并且希望你不要修改这些代码，因为他不确定这些代码在他的点餐系统中是否有用过。修改之后可能会导致一些问题，所以你只能在之前的基础上添加新的功能。老板给的代码如下：

```javascript
// 煎饼果子
class Pancake {
  constructor() {
    this.name = "煎饼果子";
  }

  //获取煎饼果子的名字
  getName() {
    return this.name;
  }

  // 获取价格
  getPrice() {
    return 5;
  }
}
复制代码
```

老板要求如下：

- 不能够修改之前的代码
- 煎饼果子可以随意搭配鸡蛋，香肠，和培根，并且每一种的数量没有限制
- 点餐完成之后能够展示当前煎饼果子包含搭配的配料，以及价格

你现在不可以修改已有的代码，但是却要增加新的功能，这对你来说还是有一点点难度的。但是好巧的是你刚刚学习完装饰者模式，使用这个设计模式就可以很好地解决这个问题。而且是在不修改原来的代码的情况下。你马上回到家中开始为你的88折优惠努力开发起来。

### 对原有对象的基本装饰

在开始对原来的对象进行具体的**装饰**之前，我们需要写一个基本的装饰类，如下所示：

```javascript
// 装饰器需要跟被装饰的对象具有同样的接口
class PancakeDecorator {
  // 需要传入一个煎饼果子的实例
  constructor(pancake) {
    this.pancake = pancake;
  }
  // 获取煎饼果子的名字
  getName() {
    return `${this.pancake.getName()}`;
  }
  // 获取煎饼果子的价格
  getPrice() {
    return this.pancake.getPrice();
  }
}
复制代码
```

我们看一下上面的代码，你会发现`PancakeDecorator`除了构造器需要传递一个`Pancake`的实例之外，其他的方法跟`Pancake`是保持一致的。

这个基本装饰类的目的是为了让我们后面开发的**具体的装饰类跟被装饰的对象具有相同的接口，为了后面的组合和委托功能做好铺垫**。

### 开发具体的装饰类

我们知道老板的配料有**鸡蛋**，**培根**，还有**香肠**。所以我们接下来需要开发三个具体的装饰类，代码如下所示：

```javascript
// 煎饼果子加鸡蛋
class PancakeDecoratorWithEgg extends PancakeDecorator {
  // 获取煎饼果子加鸡蛋的名字
  getName() {
    return `${this.pancake.getName()}➕鸡蛋`;
  }

  getPrice() {
    return this.pancake.getPrice() + 2;
  }
}

// 加香肠
class PancakeDecoratorWithSausage extends PancakeDecorator {
  // 加香肠
  getName() {
    return `${this.pancake.getName()}➕香肠`;
  }

  getPrice() {
    return this.pancake.getPrice() + 1.5;
  }
}

// 加培根
class PancakeDecoratorWithBacon extends PancakeDecorator {
  // 加培根
  getName() {
    return `${this.pancake.getName()}➕培根`;
  }

  getPrice() {
    return this.pancake.getPrice() + 3;
  }
}
复制代码
```

从上面的代码我们可以看到，每一个具体的装饰类都只对应一种配料，然后每一个具体的装饰类因为继承自`PancakeDecorator`，所以跟被装饰类保持相同的接口。在方法`getName`中，我们首先先获取当前传入进来的`pancake`的名字，然后在后面添加上当前装饰器对应的配料的名字。在`getPrice`方法中，我们使用同样的方法，获取添加这个装饰器指定的配料后的价格。

写完了上面的具体的装饰器之后，我们的工作就基本完成啦。我们来写一些测试代码，来验证一下我们的功能是否满足需求。测试的代码如下：

```javascript
let pancake = new Pancake();
// 加鸡蛋
pancake = new PancakeDecoratorWithEgg(pancake);
console.log(pancake.getName(), pancake.getPrice());
// 加香肠
pancake = new PancakeDecoratorWithSausage(pancake);
console.log(pancake.getName(), pancake.getPrice());
// 加培根
pancake = new PancakeDecoratorWithBacon(pancake);
console.log(pancake.getName(), pancake.getPrice());
复制代码
```

输出的结果如下：

```
煎饼果子➕鸡蛋 7
煎饼果子➕鸡蛋➕香肠 8.5
煎饼果子➕鸡蛋➕香肠➕培根 11.5
复制代码
```

结果跟我们的预期是一致的，所以我们上面的代码已经很好地完成了老板的需求。可以马上交给老板去使用了。

### 装饰者模式的组合和委托

也许通过上面的代码你还没有能够完全理解这样做的目的，没关系，我来给大家再展示一个关于这个模式的示例图，相信看过这个实例图你肯定会理解得很深刻的。

![装饰者模式图解](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc1345d34b2c4231a11ff41ea981f621~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 第一步：调用`PancakeDecoratorWithSausage`实例的`getPrice`方法。
- 第二步：因为`PancakeDecoratorWithSausage`实例的`getPrice`方法需要访问`PancakeDecoratorWithEgg`的实例，所以进入第三步。
- 第三步：因为`PancakeDecoratorWithEgg`实例的`getPrice`方法需要访问`PancakeDecorator`的实例，所以进入第四步。
- 第四步：因为`PancakeDecorator`实例的`getPrice`方法需要访问`Pancake`的实例，进入第五步。
- 第五步：通过`Pancake`的实例返回不加料的煎饼果子的价格是5元。
- 第六步：`PancakeDecorator`实例获取原始的煎饼果子的价格，返回这个价格。
- 第七步：`PancakeDecoratorWithEgg`实例获取到`PancakeDecorator`返回的价格5元，再加上配料鸡蛋的价格2元，所以返回7元。
- 第八步：`PancakeDecoratorWithSausage`实例获取到`PancakeDecoratorWithEgg`实例返回的价格7元，再加上配料香肠的价格1.5元，返回价格8.5元。

从上面的这幅图我们可以清楚地看到这个过程的变化，我们通过组合和委托实现了添加不同配料的价格计算。**所谓的委托就是指我们没有直接计算出当前的价格，而是需要委托方法中另外一个实例的方法去获取相应的价格，直到访问到最原始不加料的煎饼果子的价格，再逐次返回委托得到的结果。最终算出加料后的价格**。有没有感觉这个过程跟DOM事件的**捕获**和**冒泡**很相似。

所谓的**组合**，就是指，**我们不需要知道当前的煎饼果子的状态，只需要把这个煎饼果子的实例当做我们具体装饰类的构造函数的参数，然后生成一个新的煎饼果子的实例，这样就可以给传入进来的煎饼果子添加相应的配料**。

怎么样，是不是感觉装饰者模式还挺简单的，而且也很有用。好了，我们需要把这些代码交给煎饼果子的老板了，让他去试用一下，看看怎么样。大家可以在[这里](https://link.juejin.cn?target=https%3A%2F%2Fdreamapple.gitee.io%2Fcode-examples%2F20201014%2F)体验一下这个不完善的煎饼果子点餐系统，下面的动图是一个简单的操作演示，大家可以提前感受一下。

![操作演示](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ff70dfbd3764544ae6f3a9d955070b5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 对装饰者模式的一些思考

每当学习完一个新的知识之后，我们要学着把这个知识点纳入我们已有的知识系统中；比如学习完了装饰者模式，你可能会想到我应该在什么情况下使用这种设计模式？我现在已经掌握的知识中有没有跟这个相关联的？这种设计模式有没有什么弊端？等等，需要你自己深入的思考沉淀一下。

### 装饰者模式的一些延伸

经常使用`React`来开发应用的小伙伴这个时候是不是想到了`React`的高阶组件？我们看看`React`的文档中是如何描述[**高阶组件**](https://link.juejin.cn?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fhigher-order-components.html)的：

> A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

`React`通过高阶组件，可以使用组合的方式复用组件的逻辑，这是一种高级的技巧😁。你现在已经掌握这种高级的技巧了。

如果你对JavaScript的未来发展比较关注的话，那么你肯定知道在以后的JavaScript版本中，可能会在语言的原生层面增加对装饰器的支持。更多详细的资料大家可以在[tc39/proposal-decorators](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-decorators)这里获取。

比如如果在语言的原生层面支持装饰器的话，我们可以写出下面的代码：

```javascript
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
复制代码
```

上面的代码来自[babel-plugin-proposal-decorators](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-plugin-proposal-decorators)的示例。

在上面的代码中，`@annotation`是类`MyClass`的装饰器，这个装饰器给我们的`MyClass`类添加了一个属性`annotated`，并且把这个属性的值设置为`true`。这个过程不需要我们对原来的类`MyClass`做任何修改，就实现了给这个类添加一个属性的功能。是不是很棒~

我们也可以验证一下：

```javascript
console.log(MyClass.annotated);  # true
复制代码
```

### 装饰者模式适用的场景以及可能存在的问题

**装饰者模式利用组合和委托的特性，能够让我们在不改变原来已有对象的功能和属性的情况下增加新的功能和属性，让我们能够保持代码的低耦合和可扩展性**。是一种很不错的设计模式。

但是使用装饰者模式也有潜在的问题，**因为随着装饰者的增多，代码的复杂性也随之增加了**，所以要确保在合适的场景下使用装饰者模式。	

## 1.5观察者模式and 发布订阅者模式

https://juejin.cn/post/6978728619782701087#heading-0

### 观察者模式   

- ## 一、定性区别

  首先，观察者是经典软件`设计模式`中的一种，但发布订阅只是软件架构中的一种`消息范式`。所以不要再被“观察者模式和发布订阅模式xxx”这样的问题误导。

  ## 二、组成区别

  其次，就是实现二者所需的角色数量有着明显的区别。观察者模式本身只需要`2个`角色便可成型，即`观察者`和`被观察者`，其中`被观察者`是重点。而发布订阅需要至少`3个`角色来组成，包括`发布者`、`订阅者`和`发布订阅中心`，其中`发布订阅中心`是重点。

  | 观察者模式     | 发布订阅           |
  | -------------- | ------------------ |
  | 2个角色        | 3个角色            |
  | 重点是被观察者 | 重点是发布订阅中心 |

  ## 三、各自实现

  ### 1、观察者模式实现

  观察者模式一般至少有一个可被观察的对象 Subject ，可以有多个`观察者`去观察这个对象。二者的关系是通过`被观察者主动`建立的，`被观察者`至少要有三个方法——添加观察者、移除观察者、通知观察者。

  当被观察者将某个观察者添加到自己的`观察者列表`后，观察者与被观察者的关联就建立起来了。此后只要被观察者在某种时机触发`通知观察者`方法时，观察者即可接收到来自被观察者的消息。

  ![观察者.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/567e4179118647d59f000763a3bc5046~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

  上图重点表示出了`被观察者`通知`观察者`的动作，省略了`观察者`是如何被添加到`被观察者`的列表内以及接收到被观察者后是具体如何拿到通知消息的。接下来我们使用 JavaScript 来实现一版，以具体展示这部分细节。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/6/17322289225d6e79~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)







```typescript
interface Observer {
    update(): void
}
interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notify(): void;
}
class ConcreteObserver implements Observer {
    update() {
        console.log("ConcreteObserver has been notified.");
    }
}
class ConcreteSubject implements Subject {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }
    removeObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notify(): void {
        for (const observer of this.observers) {
            //通知全部观察者
            observer.update();
        }
    }

}
const Observer = new ConcreteSubject()
const obj1 = new ConcreteObserver()
const obj2 = new ConcreteObserver()

Observer.addObserver(obj1)
Observer.addObserver(obj2)

Observer.notify()
```



- **应用场景：**

- 对一个对象状态的更新，需要其他对象同步更新，而且其他对象的数量动态可变。

- 对象仅需要将自己的更新通知给其他对象而不需要知道其他对象的细节。

- 比如采购中，寻源结果审批通过后，会要通知相关采购负责人、自动创建合同信息等后续操作。

- **优点：**

- 观察者模式在被观察者和观察者之间建立一个抽象的耦合。被观察者角色所知道的只是一个具体观察者列表，每一个具体观察者都符合一个抽象观察者的接口。

- 观察者模式支持广播通讯。被观察者会向所有的登记过的观察者发出通知，

- **缺点：**

- 如果一个被观察者对象有很多的直接和间接的观察者的话，同步通知花费时间会很长。

- 如果在被观察者之间有循环依赖的话，被观察者会触发它们之间进行循环调用，导致系统崩溃。

###  发布订阅

与`观察者模式`相比，发布订阅核心基于一个中心来建立整个体系。其中`发布者`和`订阅者`不直接进行通信，而是发布者将要发布的消息交由中心管理，订阅者也是根据自己的情况，按需订阅中心中的消息。

![发布订阅.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19b670df6cb54c4ebdc17a114b5dc97c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

让我们来想象一下`邮件系统`，你可以作为`订阅者`订阅某个网站的通知，邮件系统在其中充当发布订阅中心的角色，而`发布者`则是你订阅的网站。

整个链路是从你的`订阅`开始，虽然在你订阅之前，别人可能已经订阅过某些网站并不断接收来自网站更新所发出的消息。你的订阅动作是在某个你想订阅的网站填入自己的邮箱，如果这一步以邮件系统为中心，那么则是在的邮箱内记录这个网站信息，后续当网站有内容更新时，邮件系统会及时接收到并向你发送邮件，以达到通知你这个订阅者的目的。

#### 1）降级为观察者模式

这里说的是以邮件系统为中心，假如以网站为中心，那么你对于网站就相当于一个`观察者`，你希望`观察`网站的一举一动，即网站内容的更新。那么订阅动作本身便成了你让网站将你的邮箱加入网站维护的`观察者列表`。这样当网站有内容更新后，便会通知所有观察者，也就是订阅者，这时发布订阅模型则退化成了观察者模式。

#### 2）升级为发布订阅

可以看出，此时网站和用户间其实是有`耦合`的，也就是网站除了要维护自身功能外，还需要维护订阅者列表，并且在内容更新后完成通知工作。这样在用户和网站之间有一部分关系是维护在网站内部的。如果网站想把这部分任务抽离出来，自然便恢复至发布订阅模型，即建立单独的`消息中心`来管理发布者和订阅者之间的关系以及接收变化和通知消息的工作。

> 经过这样的对比，我们可以知道为什么要区分观察者模式和发布订阅，以及它们之间的差别。

#### 3）与观察者模式的关联

但是发布订阅真的和观察者模式是割裂开来的吗？并不是

其实发布订阅的实现内部利用了`观察者模式`，让我们回顾一下观察者模式的核心，观察者模式由观察者和被观察者组成，其中被观察者是重点。二者的关联可以是在创建`被观察者`后，调用其`添加观察者`方法主动建立和某个`观察者`的关系，或是在创建`观察者`时即声明要观察的对象，即`被观察者`。其中观察者和被观察者一般为一对多关系，即一个被观察者可以被多个观察者观察。

那么分析发布订阅模型即可发现，其中`订阅者`和`发布订阅中心`的关系类似`观察者`和`被观察者`的关系。注意只是`类似`，因为虽然其中`订阅者`和`观察者`都是消费的一方，期待能够即时接收到其他方的变化。

但区别在于`观察者模式`中的`被观察者`需要在每次自身改变后都绑定式地触发对`观察者`的通知，因为这是`观察者模式`这一模式所要实现的核心，也就是类似事件处理系统的机制，被观察者有义务针对自身的变化给出响应式的反馈到观察者们，这就是为什么说`观察者模式`是松耦合的，因为`被观察者`的功能不纯粹，要包含一部分`观察者`和自身关系的逻辑。

而`发布订阅`与之的区别在于，因为`发布者`把消息通知的权限交由`发布订阅中心`管理，`发布者`只需关心自身的`发布`逻辑，而不会直接和其所发布内容的`订阅者`直接通信。`订阅者`也如此，其只关心向`发布订阅中心`注册自己想要接收通知的栏目，并实现自己在接收到通知后的逻辑，而无需关心消息来自何方，发布者是谁。因此`发布者`和`订阅者`由于`发布订阅中心`的出现而完全解耦。

由于`发布订阅中心`这一中间层的出现，对于生产方和消费方的通信管理变得更加的可管理和可拓展。比如这样同样可以实现通过观察者模式实现的事件机制，即消息中心在接收到新的消息发布后即时通知到该类目下的所有订阅者，只不过此时的`发布者`与`消息中心`的关系为`一对一`，并且`消息中心`与`订阅者`为`一对多`，消息中心只相当于发布者的一层代理。

![发布订阅模拟观察者模式.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74f06fb7a35143b798b010b0481d853f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

```typescript

interface IMessage {
    [key: string]: any[]
}

type Listrens = Record<string, Function[]>

// 发布-订阅模式
// 内容中心
class PubSub {
    listeners: Listrens = {}
    messages: IMessage = {}


    publish(type: string, message: any) {
        if (!this.messages[type]) {
            this.messages[type] = [];
        }
        this.messages[type].push(message);
    }

    subscribe(type: string, cb: Function) {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }
        this.listeners[type].push(cb);
    }

    notify(type: string) {
        let message = this.messages[type]
        let listeners = this.listeners[type] || [] as Function[];
        listeners.forEach(cb => cb(message))
    }

}


// 发布者
class Publisher {
    constructor(public name: string, private content: PubSub) { }
    publish = (type: string, context: any) => this.content.publish(type, context)
}


// 订阅者
class Subscriber {
    constructor(public name: string, private content: PubSub) { }
    subscribe = (type: string, cb: Function) => this.content.subscribe(type, cb)
}

const pubsub = new PubSub()

const publisterA = new Publisher("PublisherA", pubsub)
const publisterB = new Publisher("PublisherB", pubsub)
const publisterC = new Publisher("PublisherC", pubsub)
publisterA.publish("PublisherA", "PublisherA----------context")
publisterA.publish("PublisherA", "PublisherA2----------context")
publisterB.publish("PublisherB", "PublisherB----------context")
publisterC.publish("PublisherC", "PublisherC----------context")

const SubscriberA = new Subscriber("SubscriberA", pubsub)
SubscriberA.subscribe("PublisherA", (context:any []) => {
    console.info("SubscriberA------liseters", context.join(","))
})

const SubscriberA2 = new Subscriber("SubscriberA2", pubsub)
SubscriberA2.subscribe("PublisherA", (context: any) => {
    console.info("SubscriberA2------liseters", context.join(","))
})

const SubscriberB = new Subscriber("SubscriberB", pubsub)
SubscriberB.subscribe("PublisherB", (context: any) => {
    console.info("SubscriberB------liseters", context.join(","))
})

const SubscriberC = new Subscriber("SubscriberC", pubsub)
SubscriberC.subscribe("PublisherC", (context: any) => {
    console.info("SubscriberC------liseters", context.join(","))
})



pubsub.notify("PublisherA")
pubsub.notify("PublisherD")
```

以上`发布订阅中心`、`发布者`和`订阅者`三者有各自的实现，其中`发布者`和`订阅者`实现比较简单，只需完成各自`发布`、`订阅`的任务即可。其中`订阅者`可以在接收到消息后做后续处理。重点在于二者需要确保在与同一个`发布订阅中心`进行关联，否则两者之间的通信无从关联。

发布者的发布动作和订阅者的订阅动作相互独立，无需关注对方，消息派发由发布订阅中心负责。

#### 4）实际应用

在实际应用中，对于以上二者的实现可能会更加的复杂，同时也会根据各自的场景进行变形，所以大可不必拘泥于二者的标准实现。因为不论是设计模式还是技术模型大多都只是前人根据经验总结而成的编程思想，知道它们可能会对某些复杂问题的解决有启发性的帮助，进而借助这类思想巧妙地解决特定场景的问题。

至于具体应用实例我能想到的有如下实践，欢迎补充。

- Node.js中自带的EventEmiter模块
- Vue.js中数据响应式的实现

其他比如你在代码中发现有`watch、watcher、observe、observer、listen、listener、dispatch、trigger、emit、on、event、eventbus、EventEmitter`这类单词出现的地方，很有可能是在使用`观察者模式`或`发布订阅`的思想。等下次你发现有这些词的时候，不妨点进它的源码实现看看其他coder在实现`观察者模式`或`发布订阅`时有哪些巧妙的细节。

## 1.6策略模式

https://juejin.cn/post/7113451841001619463

> 策略模式是一种行为设计模式，定义一系列算法，将每一个算法封装起来，并让它们可以相互替换。策略模式让算法独立于使用它的客户而变化，也称为政策模式（Policy）。

> 在什么情况下可以考虑使用策略模式呢？如果函数具有以下特征：

- 判断条件很多
- 各个判断条件下的代码相互独立

然后可以将每个判断条件下的代码封装成一个独立的函数，然后建立判断条件和具体策略的映射关系。

``` typescript
// 价格低于或等于 100 元的产品以 20% 的折扣出售。
// 价格高于 100 元但低于 200 元的产品将减少 20 元。
// 价格高于或等于 200 元的产品将减少 20 元。
function getPrice(originalPrice: number, status: string) {
    if (status === "pre-sale") {
        return originalPrice * 0.8;
    }

    if (status === "promotion") {
        if (originalPrice <= 100) {
            return originalPrice * 0.9;
        } else {
            return originalPrice - 20;
        }
    }
    // 黑色星期五规则
    if (status === "black-friday") {
        if (originalPrice >= 100 && originalPrice < 200) {
            return originalPrice - 20;
        } else if (originalPrice >= 200) {
            return originalPrice - 50;
        } else {
            return originalPrice * 0.8;
        }
    }

    if (status === "default") {
        return originalPrice;
    }
}


//存在问题 ---- 
// 单一原则（个类或者函数都应该有一个单一的功能，并且该功能应该由这个类或者函数完全封装起来）
// 开闭原则 (对扩展开放，对修改关闭,增加需求，扩展新代码，而非修改原代码)


// 使用策略模式

interface Strategie { [key: string]: (origialPrice: number) => number }

const priceStrategies: Strategie = {
    "pre-sale": preSalePrice,
    "promotion": promotionPrice,
    "black-friday": blackFridayPrice,
    "default": defaultPrice,

}

function getPriceStrategic(originalPrice: number, status: string) {
    return priceStrategies[status](originalPrice);
}


function preSalePrice(origialPrice: number) {
    return origialPrice * 0.8;
}

function promotionPrice(origialPrice: number) {
    if (origialPrice <= 100) {
        return origialPrice * 0.9;
    } else {
        return origialPrice - 20;
    }
}
function defaultPrice(origialPrice: number) {
    return origialPrice;
}
function blackFridayPrice(origialPrice: number) {
    if (origialPrice >= 100 && origialPrice < 200) {
        return origialPrice - 20;
    } else if (origialPrice >= 200) {
        return origialPrice - 50;
    } else {
        return origialPrice * 0.8;
    }
}



```



​		这时候如果需要加减折扣策略，不需要修改函数，只需要修改价格策略映射关系 `priceStrategies`

之前的代码逻辑如下：

![代码逻辑1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb48dddc8fbb473ea4b5e4fc992dff32~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

优化后的代码逻辑如下：

![代码逻辑2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12b10e731feb4f32bbc31c55806ab874~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

以上的优化策略就是使用了设计模式之策略模式，在实际的项目开发过程中还是比较实用。

1.7外观模式（门面模式）

https://juejin.cn/post/7080165239475404836

**外观模式** （Facade Pattern）又叫门面模式，定义一个将子系统的一组接口集成在一起的高层接口，以提供一个一致的外观。外观模式让外界减少与子系统内多个模块的直接交互，从而减少耦合，让外界可以更轻松地使用子系统。本质是**封装交互，简化调用**。

现实生活中的例子

无人机：

大疆的无人机相信大家就算没玩儿过也见过吧，最常见的四旋翼无人机，如果直接让我们去控制每个螺旋桨的转动来达到上、下、左、右、前、后等飞行常规操作都是非常难的，不过还好我们有遥控器，直接手一搓，想让它怎么飞就怎么飞。遥控器就相当于无人机系统的外观。

经典面试题：

前端有个经典的面试题：浏览器地址栏输入网址，然后回车之后发生了什么。

我第一次听到这个问题的时候也很懵，这个问题的答案显然也可以是非常复杂的，因为从寻址到页面绘制的每一个环节都可以挖得很深的。显然浏览器是为用户做了很多事情，要不然我们现在上个网得费死劲了。当我们按下回车之后，浏览器帮我们做的所有事情其实也相当于浏览器的外观。

在类似场景中，这些例子有以下特点：

1. 一个统一的外观为复杂的子系统提供一个简单的高层功能接口；
2. 原本访问者直接调用子系统内部模块导致的复杂引用关系，现在可以通过只访问这个统一的外观来避免；

应用场景

外观模式在实践中用得非常多，不管你知不知道外观模式，肯定也都或多或少使用过它。

**函数的参数重载**就是一个典型的应用，某个函数有多个参数，其中一个参数可以传递也可以不传递，你当然可以直接弄两个接口，但是使用函数参数重载的方式，可以让使用者获得更大的自由度，让两个使用上基本类似的方法获得统一的外观。

外观模式经常被用于 JavaScript 的库中，封装一些接口用于兼容多浏览器，让我们可以间接调用我们封装的外观，从而屏蔽了浏览器差异，便于使用。

其应用场景的特点可以总结为以下几点：

1. 维护设计粗糙和难以理解的遗留系统，或者系统非常复杂的时候，可以为这些系统设置外观模块，给外界提供清晰的接口，以后新系统只需与外观交互即可；
2. 你写了若干小模块，可以完成某个大功能，但日后常用的是大功能，可以使用外观来提供大功能，因为外界也不需要了解小模块的功能；
3. 团队协作时，可以给各自负责的模块建立合适的外观，以简化使用，节约沟通时间；
4. 如果构建多层系统，可以使用外观模式来将系统分层，让外观模块成为每层的入口，简化层间调用，松散层间耦合；

优缺点

优点：

1. 访问者不需要再了解子系统内部模块的功能，而只需和外观交互即可，使得访问者对子系统的**使用变得简单**，符合**最少知识原则**，增强了可移植性和可读性；
2. 减少了与子系统模块的直接引用，实现了**访问者与子系统中模块之间的松耦合**，增加了可维护性和可扩展性；
3. 通过合理使用外观模式，可以帮助我们**更好地划分系统访问层次**，比如把需要暴露给外部的功能集中到外观中，这样既方便访问者使用，也很好地隐藏了内部的细节，提升了安全性；

缺点：

1. 不符合**开闭原则**，对修改关闭，对扩展开放，如果外观模块出错，那么只能通过修改的方式来解决问题，因为外观模块是子系统的唯一出口；
2. 不需要或不合理的使用外观会让人迷惑，过犹不及

简化版的无人机的例子：

```js
var uav = {
    /* 电子调速器 */
    diantiao1: {
        up() {
            console.log('电调1发送指令：电机1增大转速')
            uav.dianji1.up()
        },
        down() {
            console.log('电调1发送指令：电机1减小转速')
            uav.dianji1.up()
        }
    },
    diantiao2: {
        up() {
            console.log('电调2发送指令：电机2增大转速')
            uav.dianji2.up()
        },
        down() {
            console.log('电调2发送指令：电机2减小转速')
            uav.dianji2.down()
        }
    },
    diantiao3: {
        up() {
            console.log('电调3发送指令：电机3增大转速')
            uav.dianji3.up()
        },
        down() {
            console.log('电调3发送指令：电机3减小转速')
            uav.dianji3.down()
        }
    },
    diantiao4: {
        up() {
            console.log('电调4发送指令：电机4增大转速')
            uav.dianji4.up()
        },
        down() {
            console.log('电调4发送指令：电机4减小转速')
            uav.dianji4.down()
        }
    },
    
    /* 电机 */
    dianji1: {
        up() { console.log('电机1增大转速') },
        down() { console.log('电机1减小转速') }
    },
    dianji2: {
        up() { console.log('电机2增大转速') },
        down() { console.log('电机2减小转速') }
    },
    dianji3: {
        up() { console.log('电机3增大转速') },
        down() { console.log('电机3减小转速') }
    },
    dianji4: {
        up() { console.log('电机4增大转速') },
        down() { console.log('电机4减小转速') }
    },
    
    /* 遥控器 */
    controller: {
        /* 上升 */
        up() {
            uav.diantiao1.up()
            uav.diantiao2.up()
            uav.diantiao3.up()
            uav.diantiao4.up()
        },
        
        /* 前进 */
        forward() {
            uav.diantiao1.down()
            uav.diantiao2.down()
            uav.diantiao3.up()
            uav.diantiao4.up()
        },
        
        /* 下降 */
        down() {
            uav.diantiao1.down()
            uav.diantiao2.down()
            uav.diantiao3.down()
            uav.diantiao4.down()
        },
        
        /* 左转 */
        left() {
            uav.diantiao1.up()
            uav.diantiao2.down()
            uav.diantiao3.up()
            uav.diantiao4.down()
        }
    }
}

/* 操纵无人机 */
uav.controller.down()    // 发送下降指令
uav.controller.left()    // 发送左转指令
```

## 1.7迭代器模式

https://es6.ruanyifeng.com/#docs/iterator

``` typescript
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

```



Generator 生成器

yield* 操作符

```ts
function* genNums() {
  yield 10;
  yield 20;
  yield 30;
}

const numsIterator = genNums(); // 迭代器，如 arr[Symbol.iterator]()
console.log(numsIterator.next());
for (let n of numsIterator) {
  console.log(n);
}
复制代码
function* genNums() {
  yield* [10, 20, 30]; // 有序结构，已经实现了 Symbol.iterator
  // => [10,20,30].forEach(n => yield n);
}

const numsIterator = genNums();
for (let n of numsIterator) {
  console.log(n);
}
复制代码
```

使用 Generator 遍历 DOM 树

```ts
function* traverse(elemList: Element[]): any {
  for (const elem of elemList) {
    yield elem;

    const children = Array.from(elem.children);
    if (children.length) {
      yield* traverse(children);
    }
  }
}

const container = document.getElementById('container');
if (container) {
  for (let node of traverse([container])) {
    console.log(node);
  }
}
```















