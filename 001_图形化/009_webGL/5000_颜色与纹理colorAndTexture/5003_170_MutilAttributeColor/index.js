// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    attribute vec4 a_Color;    
    varying vec4 v_Color; 
    void main (){
        gl_Position=a_Position; // 设置坐标
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
    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制
    // gl.drawArrays(gl.POINTS, 0, n)
    gl.drawArrays(gl.TRIANGLES, 0, n)
}

function initVertexBuffers(gl) {
    const verticesColors = new Float32Array([
        // 顶点坐标和颜色
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0,
    ])
    // 顶点数量
    let n = 3

    // 创建缓存区对象
    let vertexColorBuffer = gl.createBuffer()

    // 将顶点坐标写入缓存区对象并开启
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
    // 向缓存区写入对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)

    // BYTES_PER_ELEMENT 每个元素所占的字节数
    let FSIZE = verticesColors.BYTES_PER_ELEMENT
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0)
    // 链接a_Position 变量与分配给他的缓存区对象
    gl.enableVertexAttribArray(a_Position) // 开启分配

    // 将顶点尺寸写入缓存区对象并开启
    let a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    //                                               归一化  向量值      偏移量
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
    gl.enableVertexAttribArray(a_Color) // 开始缓存区分配
    return n
}
