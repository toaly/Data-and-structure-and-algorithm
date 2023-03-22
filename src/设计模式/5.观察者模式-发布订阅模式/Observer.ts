// interface Observer {
//     update(): void
// }


// interface Subject {
//     addObserver(observer: Observer): void;
//     removeObserver(observer: Observer): void;
//     notify(): void;
// }

// // 观察者
// class ConcreteObserver implements Observer {
//     update() {
//         console.log("ConcreteObserver has been notified.");
//     }
// }


// // 被观察者，主题
// class ConcreteSubject implements Subject {
//     private observers: Observer[] = [];

//     addObserver(observer: Observer): void {
//         this.observers.push(observer);
//     }

//     removeObserver(observer: Observer): void {
//         const index = this.observers.indexOf(observer);
//         if (index !== -1) {
//             this.observers.splice(index, 1);
//         }
//     }

//     notify(): void {
//         for (const observer of this.observers) {
//             //通知全部观察者
//             observer.update();
//         }
//     }

// }



// const Observer = new ConcreteSubject()
// const obj1 = new ConcreteObserver()
// const obj2 = new ConcreteObserver()
// Observer.addObserver(obj1)
// Observer.addObserver(obj2)

// Observer.notif   y()



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