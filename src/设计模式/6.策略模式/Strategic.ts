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


