

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
const Pet = (() => { // 宠物店升级啦  
    const pets = {
        dog(name) { console.log(name) },
        cat(name) { console.log(name) },
        mouse(name) { console.log(name) },
        duck(name) { // 我是新来的宠物小鸭子      
            console.log(name)
        }
    }

    return class {
        constructor(type, name) {
            try { return pets[type](name) }
            catch (error) { console.log('你还没有小宠物，快去买一只吧') }
        }
    }
})()

// 重新购买小宠物
new Pet('dog', 'Spike')
new Pet('cat', 'Tom')
new Pet('duck', 'Duck')
复制代码
```

宠物店升级之后，我们在宠物店进货的时候，想加入新宠物-小鸭子，只需要将 duck 这个小鸭子直接上架即可，而在简单工程模式中，我们不仅仅要去小鸭子的场地进一只小鸭子，还需要在 Pet 宠物店将小鸭子上架。

如上所示，我们也可以将之前的 ajax 请求方法改造一波

```javascript
const ajaxType = {
    get(path, params) {
        console.log(path, params, 'query')
    },
    post(path, params) {
        console.log(path, params, 'body')
    },
    put(path, params) {
        console.log(path, params, 'body')
    }
}

function ajaxSend(way, path, params) { // ajax发送请求  
    try { ajaxType[way](path, params) }
    catch (error) { console.log('暂无匹配方法') }
}
ajaxSend('get', 'path', 'params')
```



