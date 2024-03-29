## 做个小程序哇


老板说要做个自家使用的门店外卖点餐小程序，做就做吧

一个月
两个月
三个月

四个月
..........



😱纳尼，做个小程序要搞那么久，老板天天叫上线，真的是又难受又折磨，一剑杀了我

为什么那么久还没搞好？

- UI想怎么搞怎么搞，没人管，也没有UI评审，做了又改，大家都说丑，吐槽~~~~

- 分成很多微服务开发，评论系统、会员系统、活动系统、商品系统.......接接口简直要老命，时不时又改😣😣

- 商品录入，功能不完善且扯蛋，自己都不想看写的什么垃圾玩意，难受

- 我菜（我不承认，嘴硬），没有代码审核，也没有人告诉我应该怎么做，放养。个人不是很喜欢，Gpt 是我唯一个老师了，三国战乱，激情被磨掉了很多

- 😑没人推动项目的进展，负责人比我还没脾气，可以冲上去打他一拳都不会生气，自古严师出高徒，唉，看自己造化了



到处调接口，在屎上代码上处理某个垃圾！太恶心了，没眼看...



## 铛铛铛铛，BFF 中间件（为前端服务的后端）

传统的方法（没有 BFF 的应用程序）会为所有客户端仅有一个 API 网关。示意图如下：


![](https://pic1.zhimg.com/v2-1ff4059609f096496e17eb0deb960f80_r.jpg)



然而使用 BFF 的目的是为客户端提供一个专注的接口链接。例如，移动 UI 和浏览器的数据消耗可能不同。这种情况下，为了更好的数据表示，可以使用两个 BFF。让我们来看一个带

有多个 BFF 的应用程序图表。



![](https://pic3.zhimg.com/80/v2-71008cdb0a2661265de83c1d8fe92b52_720w.webp)



## BFF 的优劣势与应用场景



应用场景

- 前端性能优化：BFF中间层可以针对不同类型的前端设备或网络状况，进行数据聚合、压缩和缓存等操作，以减少前端请求次数和数据传输量，从而提高前端性能和加载速度。

- 移动端适配：对于移动端应用，BFF中间层可以根据不同的设备类型、屏幕尺寸和网络环境等因素，为前端提供定制化的数据和功能，以提供更好的用户体验。

- API版本管理：当后端API发生变化时，BFF中间层可以充当一个适配器，将新旧API进行转换，使得前端应用能够平滑迁移至新的API版本，同时保持向后兼容性。

- 安全与权限控制：BFF中间层可以作为一个安全层，处理用户身份验证和权限控制等操作，确保只有经过授权的用户才能访问后端服务，并且提供合适的数据给前端展现。

- 请求合并与数据聚合：当前端需要同时请求多个后端接口获取数据时，BFF中间层可以将这些请求进行合并，并在后端执行一次请求，以减少网络延迟和提高效率。

- 数据格式转换与适配：BFF中间层可以负责处理后端返回的数据，将其转换为前端所需的格式，并进行适配，以简化前端开发过程。



### 优点

- **关注点分离** --- 前端需求将被从后端的关注点分离出来。这更加易于维护。
- **更加易于维护和修改 API** --- 客户端更加少的去关注 API 的数据结构，这将使它具有更加适应性的 API 弹性。
- **前端能够好的处理错误** --- 服务端的一些错误对前端来说是毫无意义的，BFF 客户端映射服务单的错误，而不是直接返回，这有助于用户体验提升。
- **多个设备类型可以并行调用后端** --- 当浏览器向浏览器专属服务器发送请求时，移动端的也可以发送同样的请求。这有助于更快的从服务器中获取想响应。
- **更好的安全性** --- 某些敏感信息可以被隐藏，向前端发送响应时可以省略不必要的数据。这种抽象会使攻击者更难以针对应用程序进行攻击。



### 缺点

- **避免在 BFF 中实现自包含的全部 API** --- 自包含 API 应该在微服务层。在开始实现 BFF 时候，大多数开发者忘记了这一点。你应该记住 BFF 是客户端与服务端之间的翻译层。当服务端 API 返回数据的时候，他的目的是将数据转换成苦短指定的数据类型。
- **便面 BFF 逻辑重复** --- 一个重要的点要注意的是，一个 BFF 应该针对特定的用户体验，而不是设备类型。例如，大多数时候，所有移动设备（iOS，Android 等）共享相同的用户体验。在这种情况下，一个适用于所有操作系统的 BFF 就足够了。没有必要为 iOS 和 Android 分别设置不同的 BFF。
- **避免过度依赖 BFF** --- BFF 只是一个翻译层。它确实为应用程序提供了一定程度的安全性。但是，你不应过度依赖它。无论是否存在 BFF，你的 API 层和前端层都应负责所有功能和安全方面。因为 BFF 应填补空缺，而不应向应用程序添加任何功能或服务。
- **为了实现更易于管理的面向微服务的后端（BFF）模式**，一个好的实践是将每个微服务看作组件，并利用一种模块化、可重用和共享的方法来处理它们。



## 那就来吧，说干就干

```
git clone https://github.com/rudemex/nestjs-starter
```

太快了吧🤒🤒

相关文档

- nest.js   [nest.js中文 ](https://docs.nestjs.cn/) [nest.js官网](https://docs.nestjs.com/)

- rxjs [前言 · 学习 RxJS 操作符](https://rxjs-cn.github.io/learn-rxjs-operators/)



## RXJS编程

### 什么玩意？

是一个库，





    


