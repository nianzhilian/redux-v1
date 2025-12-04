import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
//运行一次该模块不做任何的导入
import './test/index'

//生成器函数
//执行原理 每次执行到yiled的时候就会卡住  yield后面的表达式作为本次迭代的值
function* generatorCreater(){
    console.log('执行函数体');
    yield 1;
    return;
    console.log('执行函数1');
    yield 2;
    console.log('执行函数2');
    yield 3;
    console.log('执行函数4')
}

//生成器函数有个特点 调用完之后不会执行函数体 其返回的是一个生成器
window.iteratorFn0 = generatorCreater()

function* generatorCreater1(arr){
    for (let index = 0; index < arr.length; index++) {
        const item = arr[index];
        console.log(`本次迭代${index}`)
        yield item;
    }
    console.log('迭代结束')
}
window.iteratorFn1 = generatorCreater1([1,2,3,4])

function* g2(){
    console.log('g2函数体开始运行')
    let res = yield 'g1';
    console.log('g1运行');
    res = yield 'g2';
    console.log('g2运行');
    return 123;
}

function* generatorCreater2(){
    console.log('执行函数体');
    let res = yield 1;
    console.log('执行函数1',res);
    res = yield* g2();
    console.log('g2的返回结果',res);
    res = yield 2;
    console.log('执行函数2',res);
    res = yield 3;
    console.log('执行函数4',res);
    return '执行结束'
}

var iteratorFn2 = generatorCreater2()
window.iteratorFn2 = iteratorFn2;
// //第一次给next传参没有任何的意义
// let res2 = iteratorFn2.next();
// while (!res2.done) {
//     const val = res2.value;
//     //将上一次迭代的值 作为参数进行传递 作为上一次迭代时的yield整个表达式返回值
//     res2 = iteratorFn2.next(val);
// }

function asyncFn(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('完成')
        }, 3000);
    })
}

function* task(){
    console.log('函数体开始执行22')
    let data = yield asyncFn();
    console.log('数据异步执行了',data)
    data = yield asyncFn();
    console.log('数据又异步执行了',data);
    return '整个生成器函数执行完毕'
}
//定义一个run函数 传递一个任务 将任务全部执行完毕
function run(task){
    //得到一个生成器
    let iterator = task();
    next();
    function next(val){
        let res = iterator.next(val);
        console.log(res)
        if(res.done){
            return;
        }
        if(typeof res.value.then == 'function'){
            res.value.then((data)=>next(data));
        }else{
            next(res.value);
        }
    }
}
run(task);
ReactDOM.render(<App/>, document.getElementById('root'));
