// import {  } from "shaders/vertex.glsl";

// const gl: WebGLRenderingContext 
// let canvas = typeof HTMLCanvasElement
// interface ICanvas2WebglContext{
//     (cv:HTMLCanvasElement):WebGLRenderingContextBase;
// }
// const shaderTypes = gl.VERTEX_SHADER || gl.FRAGMENT_SHADER
// 通过canvas 初始化一个webgl容器
export const create3DwebglContext:(cv:HTMLCanvasElement)=>WebGLRenderingContext | any =(cv)=>{
    const webnames:string[] = ["experimental-webgl","webgl","webkit-3d","moz-webgl"];
    for (const name of webnames){
        const gl = cv.getContext(name) as WebGLRenderingContext;
        if(gl){
            return gl
        }
    }

    return 
}

        

export const createShader=(gl:WebGLRenderingContext,type:number,source:string)=>{
    const shader = gl.createShader(type) as WebGLShader; // 创建着色器对象
    console.log(source)
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    console.log("shader",shader)
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    // console.log(gl.getShaderInfoLog(shader));
    // gl.deleteShader(shader);
    alert(`shader not have${type}`)
    return shader
}

export function createProgram(gl:WebGLRenderingContext,vertexShader:WebGLShader,fragShader:WebGLShader):WebGLProgram{
    const program:WebGLProgram = gl.createProgram() as WebGLProgram
    console.log(vertexShader)
    console.log(fragShader)
    gl.attachShader(program,vertexShader)
    gl.attachShader(program,fragShader)
    gl.linkProgram(program)
    if(gl.getProgramParameter(program,gl.LINK_STATUS)){
        gl.useProgram(program)
        alert("成功创建program" )
        return program;
    }
    alert("创建program失败" )
    return program

}


// 根据数据源直接生成program
export function createProgramUse2Sources(gl:WebGLRenderingContext,vertexSource:string,fragSource:string):WebGLProgram{
    const vertexShader = createShader(gl,gl.VERTEX_SHADER,vertexSource) as WebGLShader;
    const fragShader = createShader(gl,gl.FRAGMENT_SHADER,fragSource) as WebGLShader;
    return createProgram(gl,vertexShader,fragShader)
}

// 创建缓存区对象，并绑定到绑定点才能输入数据，之后批量导入置入数据到缓冲区，并开启

export function createBuffer(gl:WebGLRenderingContext,data:number[]){
    const bufferobj = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferobj);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    // 最好重新调整画布
    gl.viewport(0,0,gl.canvas.width,gl.canvas.height)
       
    // return bufferobj
}


export function readyWithBuffer(gl:WebGLRenderingContext,program:WebGLProgram,data:number[]){
    // 把数据导入到缓冲区对象中
    createBuffer(gl,data)
    // 开启使用着色器的权限，因为着色器是在program中，同时还只是引用，并未通知开启着色器
    gl.useProgram(program)

}
// // 如何设置规则还是有很多变化的所以还是不要写统一接口了
// export function setShaderReadRule(){

// }