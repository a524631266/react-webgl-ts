import { createStore } from "redux";

import {enthusiasmReduer} from "../../reducers/index"
// import {IStoreState} from "../../types/index"
// <IStoreState,>
export const store = createStore(
    enthusiasmReduer,{
        enthusiasmLevel: 2,
        languagename:"jln",
    }
)


export const store2 = createStore(
    enthusiasmReduer,{
        enthusiasmLevel: 2,
        languagename:"jln",
    }
)