// import './设计模式/1.单例模式/single';
// import "./设计模式/2.代理模式/porxy";
// import "./设计模式/3.工厂模式/Factory";
// import "./设计模式/4.装饰者模式/Decorator";
// import "./设计模式/5.观察者模式-发布订阅模式/Observer";
import "./排序/index"

import app from './app';

const port = 3030;

app.listen(3030, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});