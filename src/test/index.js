import { legacy_createStore as createStore } from "redux";
import { bindActionCreators } from "../redux";

function reducer(state,action){
    if(action.type == 'incress'){
        return state + 1; 
    }
    if(action.type == 'dincress'){
        return state - 1
    }
    if(action.type == 'reset'){
        return action.payload
    }
    return state;
}


var obj = {
    incres:function(){
        return {
            type:'incress'
        }
    },
    dincres:function(){
        return {
            type:'dincress'
        }
    },
    reset:function(num){
        return {
            type:'reset',
            payload:num
        }
    }
}


window.store = createStore(reducer,10);

window.bindTest = bindActionCreators(obj,window.store.dispatch)

