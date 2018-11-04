
import { EnthusiasmAction } from "../actions";
import {DECREMENT_ENTHUSIASM,INCREMENT_ENTHUSIASM} from "../constants"
import {IStoreState} from "../types";


export function enthusiasmReduer(state:IStoreState,action:EnthusiasmAction):IStoreState{
    switch (action.type) {
        case DECREMENT_ENTHUSIASM:
            
            return {
                ...state,
                enthusiasmLevel:state.enthusiasmLevel-action.data
            }
        case INCREMENT_ENTHUSIASM:
            
            return {
                ...state,
                enthusiasmLevel:state.enthusiasmLevel+action.data
            }
        default:
            break;
    }
    return state
    
}
 