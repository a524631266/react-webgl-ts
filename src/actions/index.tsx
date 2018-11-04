import { DECREMENT_ENTHUSIASM,INCREMENT_ENTHUSIASM } from "../constants";

export interface IIncrementEnthusiasm{
    type:INCREMENT_ENTHUSIASM;
    data:number;
}


export interface IDecrementEnthusiasm{
    type:DECREMENT_ENTHUSIASM;
    data:number;
}



export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;


export function incrementEnthusiam(count:number):IIncrementEnthusiasm {
    return {
        data : count,
        type : INCREMENT_ENTHUSIASM,
    }
}

export function decrementEnthusiam(count:number):IDecrementEnthusiasm {
    return {
        data : count,
        type : DECREMENT_ENTHUSIASM,
    }
}

