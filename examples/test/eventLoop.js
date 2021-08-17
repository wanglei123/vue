console.log('1');

// 宏任务A
setTimeout(function() {
    console.log('2');
    Promise.resolve().then(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
}, 100)

// 微任务1
Promise.resolve().then(function() {
    console.log('6');
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    // 微任务2
    console.log('8')
})

// 宏任务B
setTimeout(function() {
    console.log('9');
    Promise.resolve().then(function() {
        // 微任务3
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        // 微任务4
        console.log('12')
    })
})

console.log('13')

// 1. 整个script是一个宏任务，从开始执行
// 2. 打印1
// 3. 碰到第一个setTimeout,宏任务A，放入宏任务队列
// 4. 碰到第一个Promise.reslove 微任务，放入微任务队列
// 5. new Promise直接执行，打印7
// 6. then后面的 微任务，放入微任务队列
// 7. 碰到第二个setTimeout，