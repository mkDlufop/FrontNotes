
// 代码一
/* setTimeout(() => {
    console.log("timeout");
}, 0)
Promise.resolve(1).then(
    value => console.log("成功1", value)
)
Promise.resolve(2).then(
    value => console.log("成功2", value)
)
console.log("主线程") */

// 代码二
/* setTimeout(() => {
    console.log("timeout1")
    Promise.resolve(5).then(
        value => console.log("成功5")
    )
})
setTimeout(() => {
    console.log("timeout2")
})
Promise.resolve(3).then(
    value => console.log("成功3", value)
)
Promise.resolve(4).then(
    value => console.log("成功4", value)
) */

// 代码三
setTimeout(() => {
    console.log("0")
}, 0)
new Promise((resolve, reject) => {
    console.log("1")
    resolve()
}).then(() => {
    console.log("2")
    new Promise((resolve, reject) => {
        console.log("3")
        resolve()
    }).then(() => {
        console.log("4")
    }).then(() => {
        console.log("5")
    })
}).then(() => {
    console.log("6")
})
new Promise((resolve, reject) => {
    console.log("7")
    resolve()
}).then(() => {
    console.log("8")
})