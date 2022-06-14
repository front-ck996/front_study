// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_CosB, u_SinB;
    void main (){
        gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
        gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
        gl_Position.z = a_Position.z;
        gl_Position.w = 1.0;
    }
`

// 片元着色器
const FSHADER_SOURCE = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`
// 旋转角度
// const ANGLE = 90.0
const ANGLE = 90.0
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
    const n = initVertexBuffers(gl)
    if (n < 0) {
        console.log('Failed to set the positions of the vertices')
        return false
    }
    // 将旋转图形所需要的数据传递给顶点着色器
    let radian = Math.PI * ANGLE / 180.0 // 转为弧度制
    let cosB = Math.cos(radian)
    let sinB = Math.sin(radian)
    let u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    let u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    gl.uniform1f(u_CosB, cosB)
    gl.uniform1f(u_SinB, sinB)
    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制
    // console.log(n)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ])
    let n = vertices.length / 2

    // 创建缓存区对象
    let vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object')
        return -1
    }

    // 将缓存区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 向缓存区写入对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    // 链接a_Position 变量与分配给他的缓存区对象
    gl.enableVertexAttribArray(a_Position)
    return n
}
