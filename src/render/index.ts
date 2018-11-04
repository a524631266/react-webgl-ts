import { create3DwebglContext,createProgramUse2Sources,readyWithBuffer } from "../utils/program";
// type C3WC = typeof create3DwebglContext
// type ICPS = typeof createProgramUse2Sources;
// type RWB = typeof readyWithBuffer;
interface Idata{
    position:number[];
    uniform?:any[];
}

/**
 * 
 */
interface Iattribute{
    [attributename:string]:[ number,boolean,number,number],
    // size: number, normalized: boolean, stride: number, offset: number
}
/**
 * 
 */
interface Iuniform{
    // index // 为Idata["uniform"][index]
    [uniformname:string]:[ number]
}


export interface IGlslConfig{
    vertexSource:string;
    fragSource:string;
    data:Idata;// 这个是位置数据
    attributes:Iattribute;// 用来存储attributes变量的名称及其渲染数据
    uniforms?:Iuniform;// 用来存储uniform变量的名称列表
}

abstract class Arender{
    public abstract  create3DwebglContext(cv: HTMLCanvasElement):any;
    public abstract  createProgramUse2Sources(gl: WebGLRenderingContext, vertexSource: string, fragSource: string): WebGLProgram;   
    public abstract  readyWithBufferConnectAttribute(gl: WebGLRenderingContext, program: WebGLProgram, data: number[]):void;

}

export default class BaseRender extends Arender{
    constructor(protected canvas:HTMLCanvasElement,public config:IGlslConfig){
        super()
    }
    /**
     * 1. 创建gl上下文
     * @param canvas 需要挂载的canvas，后期所有
     */
    public create3DwebglContext(canvas:HTMLCanvasElement):any{
        return create3DwebglContext(canvas)
    }
    /**
     * 2. 创建program 包含两个着色器
     * @param gl webgl上下文
     * @param vertexSource 顶点着色器代码
     * @param fragSource 片元着色器代码
     */
    public createProgramUse2Sources(gl: WebGLRenderingContext, vertexSource: string, fragSource: string): WebGLProgram{
        return createProgramUse2Sources(gl,vertexSource,fragSource)
    }
    /**
     * 3. 准备着色器与缓冲对象对接
     * @param gl webgl上下文
     * @param program 着色器程序打包组合
     * @param data 数据
     */
    public readyWithBufferConnectAttribute(gl: WebGLRenderingContext, program: WebGLProgram, data: number[]):void{
        readyWithBuffer(gl,program,data)
    }
    /**
     * 用来画背景图颜色的，此时在画其他数据之前实现画好
     * @param gl webgl上下文
     */
    public clearBackgroud(gl:WebGLRenderingContext):void{
        gl.clearColor(0.3,0.4,0.5,0.5)
        gl.clear(gl.COLOR_BUFFER_BIT)
    }
    /**
     * 初始化一个项目，用来管理两个着色器，并链接
     * @param gl webgl上下文
     * @param program webgl上下文
     */
    public initProgram():{gl:WebGLRenderingContext,program:WebGLProgram}{
        const gl = this.create3DwebglContext(this.canvas);
        const {vertexSource,fragSource,data:{position}} = this.config;
        const program = this.createProgramUse2Sources(gl,vertexSource,fragSource);
        this.readyWithBufferConnectAttribute(gl,program,position);
        this.clearBackgroud(gl)
        return {
            gl,
            program
        }
    }
    /**
     * 此方法对以及激活着色器与缓冲区的绑定之后的步骤，用来配置渲染器与缓冲区对象之间的通道
     * @param gl 上下文
     * @param program 项目程序容器
     * @param pern 数据中的每个元素字节大小
     */
    public initShaderConfigWithBuffer(gl:WebGLRenderingContext,program:WebGLProgram,config:IGlslConfig){
        const {data:{position:data,uniform:uniformdatalist},attributes,uniforms} = config;
        const byteN:number = new Float32Array(data).BYTES_PER_ELEMENT;
        const attributenames = Object.keys(attributes)
        console.log("buteN",byteN,"attribunames:",attributenames);
        attributenames.forEach(
            name=>{
                const aposition = gl.getAttribLocation(program,name);
                const [size,normalize,stridenum,offsetnum] = attributes[name]
                gl.vertexAttribPointer(aposition,size,gl.FLOAT,normalize,byteN * stridenum,byteN * offsetnum)
                gl.enableVertexAttribArray(aposition)
            }
        )
        if(uniforms){
            const uniformnames = Object.keys(attributes)
            uniformnames.forEach(
                (name,index)=>{
                    const ucolor = gl.getUniform(program,name);
                    const unidata:number[] = uniformdatalist && uniformdatalist[index];
                    const uniformlen = unidata.length
                    switch (uniformlen) {
                        case 1:
                            gl.uniform1f(ucolor,unidata[0])
                            break;
                        case 2:
                            gl.uniform2f(ucolor,unidata[0],unidata[1])
                            break;
                        case 3:
                            gl.uniform3f(ucolor,unidata[0],unidata[1],unidata[2])
                            break;
                        case 4:
                            gl.uniform4f(ucolor,unidata[0],unidata[1],unidata[2],unidata[3])
                            break;
                        default:
                            break;
                    }

                }
            )
        }
        // const aposition = gl.getAttribLocation(program,"a_position") 
        // gl.vertexAttribPointer(aposition,2,gl.FLOAT,false, byteN*5 ,0)
        // gl.enableVertexAttribArray(aposition)
        // // gl.drawArrays(gl.TRIANGLES,0,3)
        // const acolor = gl.getAttribLocation(program,"a_color")
        // gl.vertexAttribPointer(acolor,3,gl.FLOAT,false,byteN*5,byteN * 2)
        // gl.enableVertexAttribArray(acolor)
        // gl.drawArrays(gl.TRIANGLES,0,3)
    }
    /**
     * 开始执行绘制渲染
     */
    public render(){
        const {gl,program} = this.initProgram()
        this.initShaderConfigWithBuffer(gl,program,this.config)

    }
    
}



