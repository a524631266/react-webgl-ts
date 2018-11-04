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
        // // 创建gl上下文
        // this.gl = create3DwebglContext(this.canvas as HTMLCanvasElement)
        // // 创建program 包含两个着色器
        // const pro = createProgramUse2Sources(this.gl,VertexShaderSource,fragSource)
        // // 根据不同着色器获取不同的变量指针
        // // 着色器位置指针
        // const  positions = [
        //     0.0,0.5,1.0,0.0,0.0,
        //     -0.5,-0.5,0.0,1.0,0.0,
        //     0.5,-0.5,0.0,0.0,1.0
        // ];
        // const n:number = new Float32Array(positions).BYTES_PER_ELEMENT
        // // 创建缓存并绑定数据
        // readyWithBuffer(this.gl,pro,positions)
        // this.gl.clearColor(0.3,0.4,0.5,0.5);
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        // this.drawTrigle(this.gl,pro,n)
        // // 接下来就是创建缓冲区对象，用来存储并开启与着色器的交互
        // // 创建缓冲区
        
    }
    // private drawTrigle=(gl:WebGLRenderingContext,program:WebGLProgram,pern:number)=>{
    //     const aposition = gl.getAttribLocation(program,"a_position")
    //     // 每五个元素取两个大小
    //     // 
    //     gl.vertexAttribPointer(aposition,2,gl.FLOAT,false, pern*5 ,0)
    //     gl.enableVertexAttribArray(aposition)
    //     // gl.drawArrays(gl.TRIANGLES,0,3)
    //     const acolor = gl.getAttribLocation(program,"a_color")
    //     gl.vertexAttribPointer(acolor,3,gl.FLOAT,false,pern*5,pern * 2)
    //     gl.enableVertexAttribArray(acolor)
    //     gl.drawArrays(gl.TRIANGLES,0,3)
    // }
}
