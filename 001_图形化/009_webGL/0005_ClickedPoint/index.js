// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main (){
        gl_Position=a_Position; // 设置坐标
        gl_PointSize=10.0; // 设置尺寸
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

    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 注册鼠标点击事件
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position)
    }
    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)



}
let g_points = []
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX;
    let y = ev.clientY;
    const rect = ev.target.getBoundingClientRect()
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2)
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2)
    g_points.push(x)
    g_points.push(y)
    //clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT)
    let len = g_points.length
    for (let i = 0; i < len; i += 2) {
        // 将点的位置传递到变量 a_Position 中

        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0)
        gl.drawArrays(gl.POINTS, 0, 1)

    }
}
