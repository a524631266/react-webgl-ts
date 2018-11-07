import * as React from "react"

interface IProps {
    children?: React.ReactNode
}

interface IState {
    color:string
}

export default class CanvasText extends React.Component<IProps, IState> {
    public ele:HTMLCanvasElement | any
    constructor(props: IProps) {
        super(props)

        this.state = {
            color:"red"
        }
    }

    public componentDidMount(){
        this.ele.width = 60
        this.ele.height = 20
        console.log("this.ele",this.ele)
        const textCtx:CanvasRenderingContext2D = this.ele.getContext("2d")
        console.log("textCtx",textCtx)
        textCtx.fillStyle = "red"
        // 接口1 填充颜色
        // textCtx.fillRect(0,0,100,100)
        // 写字的话，需要提前设置好样式
        textCtx.font = `20px monospace`;
        textCtx.textAlign = "center";
        textCtx.textBaseline = "middle";
        textCtx.fillStyle = "blue";
        textCtx.fillText("张亮亮",textCtx.canvas.width/2,textCtx.canvas.height/2)
        // 清理颜色
        // textCtx.clearRect(0,0,100,100)
        // textCtx.
    }
    public render() {
        return (
            <canvas id="canvas" ref={ele=>this.ele = ele} >
            {this.props.children}
            </canvas>
        )
    }
}
