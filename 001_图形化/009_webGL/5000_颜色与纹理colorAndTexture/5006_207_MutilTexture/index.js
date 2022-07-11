// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    uniform mat4 u_ViewMatrix;
    void main (){
        gl_Position= u_ViewMatrix * a_Position; // 设置坐标
        gl_PointSize=20.0; // 设置尺寸
        v_Color = a_Color;
    }
`

// 片元着色器
const FSHADER_SOURCE = `
    // GLSL的精度限定符 https://www.jianshu.com/p/0e3f80467d46
    precision mediump float;
    varying  vec4 v_Color;
    void main(){
        gl_FragColor = v_Color;
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
    // 设置顶点信息
    const n = initVertexBuffers(gl)
    if (n < 0) {
        console.log('Failed to set the positions of the vertices')
        return false
    }
    // 获取 u_ViewMatrix
    let u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')

    // 设置视点, 视线和 上方向
    let viewMatrix = new Matrix4()
    viewMatrix.setLookAt(0.20, 0.25, 0.25, 0,0,0,0,1,0)
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements)
cv
    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制
    // gl.drawArrays(gl.POINTS, 0, n)
    gl.drawArrays(gl.TRIANGLES, 0, n)
}

function initVertexBuffers(gl) {
    const vertexTexCoord = new Float32Array([
        // 顶点坐标和 纹理坐标
        0.5, 0.5, -0.4,      0.4,1.0,0.4,
        -0.5, -0.5, -0.4,    0.4,1.0,0.4,
        0.5, 0.5, -0.4,      1.0,0.4,0.4,

        0.5, 0.4, -0.2,      1.4,0.4,0.4,
        -0.5, 0.5, -0.2,     1.0,1.0,0.4,
        0.0, -0.6, -0.2,     1.0,1.0,0.4,

        0.0,0.5,0.0,         0.4,0.4,1.0,
        -0.5,-0.5,0.0,       0.4,0.4,1.0,
        0.5,-0.5,0.0,        1.0,0.4,0.4,
    ])
    // 顶点数量
    let n = 9

    // 创建缓存区对象
    let vertexTexCoordBuffer = gl.createBuffer()

    // 将顶点坐标和纹理坐标写入缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
    // 向缓存区写入对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertexTexCoord, gl.STATIC_DRAW)

    // BYTES_PER_ELEMENT 每个元素所占的字节数
    let FSIZE = vertexTexCoord.BYTES_PER_ELEMENT
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
    // 链接a_Position 变量与分配给他的缓存区对象
    gl.enableVertexAttribArray(a_Position) // 开启分配
    return n
}
