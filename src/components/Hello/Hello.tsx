import * as React from "react"
export interface IPropsChildren{
    children?: React.ReactNode;
}

export interface IPropsConstants{
    
    name:string;
    enthusiasmLevel?:number;
}

export interface IPropsActions{
    onIncrement?:()=>void;
    onDecrement?:()=>void;
}

interface IProps extends IPropsChildren,IPropsConstants,IPropsActions{

}

interface IState {
    data:string;
}
function getExclamationMarks(count:number){
    return Array(count+1).join("!")
}

export class Hello extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            data:"1"
        }
    }

    public render() {
        const {name,enthusiasmLevel=0,onDecrement,onIncrement} = this.props
        return (
            <div>
                {`Hello ${name}  ${getExclamationMarks(enthusiasmLevel)}`}
            { this.props.children }
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        )
    }
}
