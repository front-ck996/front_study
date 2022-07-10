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
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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
    gl.drawArrays(gl.POINTS, 0, n)
}

function initVertexBuffers(gl) {
    const verticesSizes = new Float32Array([
        0.0, 0.5, 10.0,
        -0.5, -0.5, 20.0,
        0.5, -0.5, 30.0,
    ])
    let n = 3

    // 创建缓存区对象
    let vertexSizeBuffer = gl.createBuffer()

    // 将顶点坐标写入缓存区对象并开启
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer)
    // 向缓存区写入对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW)

    // BYTES_PER_ELEMENT 每个元素所占的字节数
    let FSIZE = verticesSizes.BYTES_PER_ELEMENT
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 将缓存区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false ,FSIZE * 3, 0)
    // 链接a_Position 变量与分配给他的缓存区对象
    gl.enableVertexAttribArray(a_Position) // 开启分配

    // 将顶点尺寸写入缓存区对象并开启
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2)
    gl.enableVertexAttribArray(a_PointSize) // 开始缓存区分配
    return n
}
