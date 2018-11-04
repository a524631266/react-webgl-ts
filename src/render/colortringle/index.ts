import BaseRender, { IGlslConfig } from "..";
import fragSource from "../../shadersource/colortringle/fragment.glsl";
import vertexSource from "../../shadersource/colortringle/vertex.glsl";

// 默认设置
const  positions = [
    0.0,0.5,1.0,0.0,0.0,
    -0.5,-0.5,0.0,1.0,0.0,
    0.5,-0.5,0.0,0.0,1.0
];
export const colorconfig:IGlslConfig = {
    attributes:{
        "a_color":[3,false,5, 2],
        "a_position":[2,false, 5 ,0],
    },
    data:{
        position:positions
    },
    fragSource,
    vertexSource,
}
export class TriangleRender extends BaseRender{
    public render(){
        const {gl,program} = this.initProgram()
        this.initShaderConfigWithBuffer(gl,program,this.config)
        gl.drawArrays(gl.TRIANGLE_FAN,0,3)
    }
}
// const n:number = new Float32Array(positions).BYTES_PER_ELEMENT
// // 创建缓存并绑定数据
// readyWithBuffer(this.gl,pro,positions)
// this.gl.clearColor(0.3,0.4,0.5,0.5);
// this.gl.clear(this.gl.COLOR_BUFFER_BIT)
// draw(this.gl,pro,n)


// function draw(gl:WebGLRenderingContext,program:WebGLProgram,pern:number){
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
