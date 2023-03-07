// 返回用来判断不同引用类型的标识符
/*
    @example

    console.log(getTag(1)); // => [object Number]

    console.log(getTag([])); // => [object Array]
*/
function getTag(value) {
    return Object.prototype.toString.call(value);
}

export default getTag;