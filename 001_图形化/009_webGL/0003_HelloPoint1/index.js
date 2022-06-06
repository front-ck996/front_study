// 顶点着色器
const VSHADER_SOURCE = `
    void main (){
        gl_Position=vec4(0.0, 0.0, 0.0, 1.0); // 设置坐标
        gl_PointSize = 10.0; // 设置尺寸
    }
`
// 片元着色器
const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 设置颜色
    }
`


function main() {
    const canvas = document.getElementById('example')
    if (!canvas){
        console.log('Failed to retrieve the canvas element')
        return false;
    }
    let gl = canvas.getContext('webgl')
    if (!gl){
        console.log('Failed to get the rendering context for WebGL')
        return  false
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders')
        return  false
    }

    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}
