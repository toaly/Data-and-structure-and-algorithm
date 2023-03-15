

// import './设计模式/1.单例模式/single';
// import "./设计模式/2.代理模式/porxy";
// import "./设计模式/3.工厂模式/Factory";
// import "./设计模式/4.装饰者模式/Decorator";
import "./设计模式/5.观察者模式-发布订阅模式/Observer";
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/', async (ctx) => {
    ctx.body = 'Hello Koa!';
});

app.use(router.routes());

export default app;