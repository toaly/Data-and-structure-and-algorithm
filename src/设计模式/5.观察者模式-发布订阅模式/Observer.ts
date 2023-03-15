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


// 发布-订阅模式

