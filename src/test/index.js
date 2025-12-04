import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
// import { thunk } from "redux-thunk";
import { bindActionCreators, thunk } from "../redux";
import rootReducers from "./redux";
import * as actions from "./redux/actions";
import { generateRandomUUID } from "../utils/util";
// import createSagaMiddleware from 'redux-saga'
// import { take } from "redux-saga/effects";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger1 = (store) => (next) => (action) => {
  console.log(
    "%c变化前的数据",
    "color: red; font-weight: bold;",
    store.getState()
  );
  next(action);
  console.log(
    "%c变化后的数据",
    "color: green; font-weight: bold;",
    store.getState()
  );
  console.log("");
};

//中间件聚合 最终 store.dispatch   指的是 applyMiddleware 中 第一个 中间件产生的dispatch生成器
//每一次dispatch 都会首先执行 thunk中的中间件链条

function take(env,actionType,next){
    env.channel.take(actionType,(action)=>{
        console.log(action)
        next()
    })
}

function runSaga(env, generator, ...args) {
  let iterator = generator();
  function nextStep(result) {
    if (result.done) return;
    //  Promise.resolve(result.value).then(res => {
    //     nextStep(iterator.next(res));
    // }).catch(err => {
    //     nextStep(iterator.throw(err));
    // });
  }
  //nextStep(iterator.next());

  function next(val){
    let res = iterator.next();
    if(res.done){
        return;
    }else{
        console.log('还没结束')
    }
  }

  take(env,'loading',next);
}

class Channel{
    //这样写法 相当于 类的实例属性
    listener = {};

    //订阅者
    //这种相当于类的原型链上的方法 是挂在到原型链上的
    take(prop,func){
        if(this.listener[prop]){
            this.listener[prop].push(func);
        }else{
            this.listener[prop] = [func]
        }
    }
    //发布者（在某个地方就是高速我要开始执行了）
    put(prop,...args){
        if(this.listener[prop]){
            var funcs = this.listener[prop];
            //移除订阅
            delete this.listener[prop];
            funcs.forEach(func => {
                func(...args)
            });
        }
    }
}

function createSagaMiddleware() {
  return function abc(store) {
    const env = {
        store,
        channel:new Channel()
    }
    abc.run = runSaga.bind(null,)
    return function (next) {
      return function (action) {
        next(action);
        env.channel.put(action.type,action)
      };
    };
  };
}

function* task() {
  console.log("task任务开始执行");
  while (true) {
    const action = yield take("loading");
    console.log("函数执行完毕", action);
  }
}

const sagaMid = createSagaMiddleware();
window.sagaMid = sagaMid;
window.store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMid, thunk, logger1))
);
//开启一个saga任务
sagaMid.run(task);
console.log(window.store.dispatch);

window.bindTest = bindActionCreators(actions, window.store.dispatch);
