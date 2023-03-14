interface Observer {
    update(): void
}


interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notify(): void;
}

// 观察者
class ConcreteObserver implements Observer {
    update() {
        console.log("ConcreteObserver has been notified.");
    }
}


// 被观察者，主题
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



interface IMessage {
    [key: string]: any[];
}

type Listener = (content: any) => void;

class PubSub {
    private messages: IMessage = {};
    private listeners: { [key: string]: Listener[] } = {};

    public publish(type: string, content: any): void {
        const existContent = this.messages[type];
        if (!existContent) {
            this.messages[type] = [];
        }
        this.messages[type].push(content);
    }

    public subscribe(type: string, cb: Listener): void {
        const existListener = this.listeners[type];
        if (!existListener) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(cb);
    }

    public notify(type: string): void {
        const messages = this.messages[type];
        const subscribers = this.listeners[type] || [];
        subscribers.forEach((cb, index) => cb(messages[index]));
    }
}

class Publisher {
    private name: string;
    private context: PubSub;

    constructor(name: string, context: PubSub) {
        this.name = name;
        this.context = context;
    }

    public publish(type: string, content: any): void {
        this.context.publish(type, content);
    }
}

class Subscriber {
    private name: string;
    private context: PubSub;

    constructor(name: string, context: PubSub) {
        this.name = name;
        this.context = context;
    }

    public subscribe(type: string, cb: Listener): void {
        this.context.subscribe(type, cb);
    }
}

const TYPE_A = 'music';
const TYPE_B = 'movie';
const TYPE_C = 'novel';

const pubsub = new PubSub();

const publisherA = new Publisher('publisherA', pubsub);
publisherA.publish(TYPE_A, 'we are young');
publisherA.publish(TYPE_B, 'the silicon valley');
const publisherB = new Publisher('publisherB', pubsub);
publisherB.publish(TYPE_A, 'stronger');
const publisherC = new Publisher('publisherC', pubsub);
publisherC.publish(TYPE_C, 'a brief history of time');

const subscriberA = new Subscriber('subscriberA', pubsub);
subscriberA.subscribe(TYPE_A, res => {
    console.log('subscriberA received', res)
});
const subscriberB = new Subscriber('subscriberB', pubsub);
subscriberB.subscribe(TYPE_C, res => {
    console.log('subscriberB received', res)
});
const subscriberC = new Subscriber('subscriberC', pubsub);
subscriberC.subscribe(TYPE_B, res => {
    console.log('subscriberC received', res)
});

pubsub.notify(TYPE_A);
pubsub.notify(TYPE_B);
pubsub.notify(TYPE_C);


// 发布-订阅模式

