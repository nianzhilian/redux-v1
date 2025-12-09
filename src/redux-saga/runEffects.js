
import { effectTypes } from "./effectHelper"
import { runSelect } from "./effect/select"
import { runCall } from "./effect/call";
import { runPut } from "./effect/put";
export default function runEffects(env,effect,next){
    switch (effect.type) {
        case effectTypes.SELECT:
            runSelect(env,effect,next);
            break;
        case effectTypes.CALL:
            runCall(env,effect,next);
            break;
        case effectTypes.PUT:
            runPut(env,effect,next)
            break;
        default:
            break;
    }

}