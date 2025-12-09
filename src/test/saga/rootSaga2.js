import { select,delay,put } from "../../redux-saga/effect";
import { increase } from "../redux/actions";

export default function* rootSaga2(){
    let  res = yield select(state=>state.counter);
    yield delay(10000)
    yield put(increase())
    console.log("counter:"+res)
}