// 判断是否为引用类型
/*
    @example

    isObject({}); // => true

    isObject(function(){}); // => true

    isObject(null); // => false
*/
function isObject(value) {
    let type = typeof value;
    return value !== null && (type === "object" || type === "function");
}

export default isObject;