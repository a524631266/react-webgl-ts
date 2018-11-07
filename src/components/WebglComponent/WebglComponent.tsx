import { colorconfig,TriangleRender  } from 'src/render/colortringle';
import * as React from "react"
// import  * as fragSource from "shaders/colortringle/fragment.glsl"
// import * as VertexShaderSource from 'shaders/colortringle/vertex.glsl';
// import { create3DwebglContext ,createProgramUse2Sources, readyWithBuffer} from "../../utils/program";
export interface IProps {
    children?: React.ReactNode
}
export interface IState {
    canvas:HTMLCanvasElement,
}

export default class WebglComponent extends React.Component<IProps, IState> {
    public gl:WebGLRenderingContextBase
    public canvas:any
    constructor(props: IProps) {
        super(props)

        this.state = {
            canvas:document.createElement("canvas"),
        }
    }
    public render() {
        
        const {innerWidth,innerHeight} = window
        return (
            <div>
                { this.props.children }
                <canvas ref={(e)=>this.canvas=e} width={innerWidth * 0.5 } height={innerHeight * 0.5} />
            </div>
        )
    }

    public componentDidMount(){
        const render = new TriangleRender(this.canvas as HTMLCanvasElement,colorconfig)
        render.render()

    }

}
