
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import {decrementEnthusiam,EnthusiasmAction,incrementEnthusiam} from '../../actions/index'

import { Hello,IPropsActions,IPropsConstants } from "../../components/Hello/Hello";
import { IStoreState } from "../../types/index";
const count = 2;
export function mapStateToProps(state:IStoreState):IPropsConstants{
    const {enthusiasmLevel,languagename} = state
    return {
        enthusiasmLevel,
        name:languagename
    }
}

export function mapDispatchToProps(dispatch:Dispatch<EnthusiasmAction>):IPropsActions{
    return {
        onDecrement:()=>dispatch(decrementEnthusiam(count)),
        onIncrement:()=>dispatch(incrementEnthusiam(count)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Hello)