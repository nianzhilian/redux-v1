import isGenerator from "is-generator";
import { isEffect } from "./effectHelper";
import isPromise from "is-promise";
import runEffects from "./runEffects";
function runSaga(env,generator,...args){
    //得到一个生成器
    let iterator = generator(...args);
    if(isGenerator(iterator)){
        next();
    }else{
        console.log('是一个普通函数')
    }
    function next(nextVal,err,isOver){
        let res;
        //如果报错生成器直接抛出异常
        if(err){
            res = iterator.throw(err)
            return;
        }
        //如果结束生成器直接返回 结束整个迭代
        if(isOver){
            res = iterator.return();
            return;
        }
        res = iterator.next(nextVal);
        console.log(res)
        let {value,done} = res;
        //如果迭代结束则返回
        if(done){
            return;
        }
        //剩下来判断本次迭代的值
        //1、是一个effect对象
        //2、是一个promise
        //3、其他普通函数
        if(isEffect(value)){
            console.log(value)
            runEffects(env,value,next)
        }else if(isPromise(value)){
            value.then((data)=>next(data)).catch((error)=>next(null,error))
        }else{
            next(value);
        }
    }
}

export default runSaga;