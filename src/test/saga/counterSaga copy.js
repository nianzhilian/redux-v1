import { take } from "redux-saga/effects";
import { actionTypes } from "../redux/actions";

export default function*(){
    //监听action类型 为‘loading’的action是否触发
    //会阻塞 并且只监听一次
    // 这种写法一直会监听，这个生成器函数永远不会执行完成
    //take会进行阻塞
    while (true) {
        yield take(actionTypes.LOADING)
        console.log('这个saga也会执行')
    }
}