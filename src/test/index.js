import { legacy_createStore as createStore ,compose,applyMiddleware} from "redux";
// import { thunk } from "redux-thunk";
import { bindActionCreators,thunk } from "../redux";
import rootReducers from "./redux";
import * as actions from './redux/actions'
import { generateRandomUUID } from "../utils/util";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger1 = store=>next=>action=>{
    console.log('%c变化前的数据','color: red; font-weight: bold;',store.getState());
    next(action);
    console.log('%c变化后的数据','color: green; font-weight: bold;',store.getState());
    console.log('')
}

//中间件聚合 最终 store.dispatch   指的是 applyMiddleware 中 第一个 中间件产生的dispatch生成器
//每一次dispatch 都会首先执行 thunk中的中间件链条

window.store = createStore(rootReducers,composeEnhancers(applyMiddleware(thunk,logger1)));

console.log(window.store.dispatch)

window.bindTest = bindActionCreators(actions,window.store.dispatch)

