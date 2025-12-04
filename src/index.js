import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
//运行一次该模块不做任何的导入
import './test/index'

// 1、迭代器
// 2、迭代器生成函数
// 3、迭代协议
// 4、生成器函数
// 5、调用生成器函数 得到一个生成器对象

//特点：对象必须有一个next函数且该函数必须要返回一个对象  该对象必须有value属性 和done属性 才能称为迭代器对象
//斐波拉契数列
window.iteratorTest = {
    a:1,
    b:1,
    curIndex:1,
    next(){
        if(this.curIndex == 1 || this.curIndex == 2){
            console.log(this)
            this.curIndex++;
            return {
                value:'1',
                done:false
            }
        }
        const c = this.a + this.b;
        this.a = this.b;
        this.b = c;
        this.curIndex++;
        return {
            value:c,
            done:false
        }
    }
}

//一个一个迭代 直到迭代结束
var iteratorTes2 = {
    total:3,
    i:1,
    next(){
        var obj = {
            value:this.i>this.total ? undefined : Math.random(),
            done:this.i>this.total
        }
        this.i++;
        return obj;
    }
}

var nextFn = iteratorTes2.next();
while (!nextFn.done) {
    console.log(nextFn);
    nextFn = iteratorTes2.next();
}

//迭代器生成函数
window.iteratorCreater = function(arr){
    var i = 0;
    //返回一个迭代器
    return {
        next(){
            return {
                value:arr[i++],
                done:i>arr.length
            }
        }
    }
}

window.iteratorTes3 = window.iteratorCreater([1,3,4,5,6,8,9]);

//可迭代协议(本质还是返回一个迭代器) 只要满足可迭代协议就可以使用for of
var obj = {
    [Symbol.iterator](){
        var i = 1;
        return {
            next(){
                var aa = {
                        value:i>3?undefined:Math.random(),
                        done:i>3
                    }
               i++
               return aa;
            }
        }
    }
}

//模拟for of 
var ite = obj[Symbol.iterator]();
//返回一个迭代器
var res = ite.next();
while (!res.done) {
    const val = res.value;
    console.log(val);
    res = ite.next();
}


// for (const element of obj) {
//     console.log(element)
// }



ReactDOM.render(<App/>, document.getElementById('root'));
