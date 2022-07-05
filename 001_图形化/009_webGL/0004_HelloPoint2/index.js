// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main (){
        gl_Position=a_Position; // 设置坐标
        gl_PointSize=a_PointSize; // 设置尺寸
    }
`
// 片元着色器
const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 设置颜色
    }
`


function main() {
    const canvas = document.getElementById('webgl')
    if (!canvas) {
        console.log('Failed to retrieve the canvas element')
        return false;
    }
    let gl = canvas.getContext('webgl')
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL')
        return false
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders')
        return false
    }

    // 获取 attribute 变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')
        return false
    }
    // 将顶点文职传输给attribute 变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    if (a_PointSize < 0) {
        console.log('Failed to get the storage location of a_PointSize')
        return false
    }
    // 设置大小
    gl.vertexAttrib1f(a_PointSize, 35.0)

    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
}
