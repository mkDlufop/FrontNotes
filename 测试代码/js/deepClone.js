import isObject from "./isObject.js";
import getTag from "./getTag.js";

const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const setTag = "[object Set]";
const mapTag= "[object Map]";

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

// 深拷贝的实现
function deepClone(target, map = new WeakMap()) {

    // （简陋版实现）使用 JSON.parse(JSON.stringify()) 实现
    // 这种写法在大多数应用场景下是有效的，但有一些情况下会出错，
    // 如拷贝的对象中有函数或undefined或symbol或Set对象或Map对象或循环引用等
    // return JSON.parse(JSON.stringify(target));

    // (完善版实现)

    // 直接返回基本类型 和 函数 的值
    if(!isObject(target) || typeof target === "function") return target;

    const tag = getTag(target);

    // 克隆Bool、Date、Number、Error、String、Symbol对象
    switch(tag) {
        case boolTag:
        case dateTag:
        case numberTag:
        case errorTag:
        case stringTag:
            return new target.constructor(target);
        case symbolTag:
            return Object(Symbol.prototype.valueOf.call(target));
    }

    // 初始化拷贝对象
    let cloneTarget = new target.constructor();

    // 解决如果深拷贝的对象中存在循环引用时，调用该函数会出现死循环：
    //      新开辟一块存储空间，存储当前对象和拷贝对象之间的关系。
    //      拷贝当前对象时，先在这个存储空间找，
    //      如果有拷贝过这个对象，直接返回该对象，
    //      如果没有拷贝过，将当前对象在这个存储空间存一份后继续拷贝。
    //
    // 这里的map使用WeakMap类型的好处在于，不用担心被拷贝的对象太大时map占用过多的内存（不用手动删除引用），
    // WeakMap的键名所引用的对象都是弱引用，也就是说垃圾回收机制不将该引用考虑在内，只要所引用的对象的其他
    // 强引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
    if(map.get(target)) return map.get(target);
    map.set(target, cloneTarget);

    // 克隆set
    if(tag === setTag) {
        target.forEach(value => {
           cloneTarget.add(deepClone(value, map)); 
        });
        return cloneTarget;
    }
    // 克隆map
    if(tag === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, deepClone(value, map));
        });
        return cloneTarget;
    }
    // 克隆对象和数组
    if(tag === arrayTag || tag === objectTag) {
        for(let key in target) {
            cloneTarget[key] = deepClone(target[key], map);
        }
        return cloneTarget;
    }
    return target;
}

let mySet = new Set();
mySet.add("123")
mySet.add(5);
mySet.add("456")
let myMap = new Map();
myMap.set("key", 123)
let c = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    mySet,
    myMap,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    error: new Error(),
    func1: function (a, b) {
        return a + b;
    }
};
c.c = c;
// console.time();
let clone_result = deepClone(c);
// console.timeEnd();
console.log(c);
console.log(clone_result);
console.log("field3:", c.field3 === clone_result.field3); // => false
console.log("mySet:", c.mySet === clone_result.mySet); // => false
console.log("num:", c.num === clone_result.num); // => false
console.log("symbol:", c.symbol=== clone_result.symbol); // => false
console.log("date:", c.date === clone_result.date); // => false
console.log("error:", c.error === clone_result.error); // => false
console.log("func1:", c.func1=== clone_result.func1); // => true

export default deepClone;