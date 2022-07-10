// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord; 
    void main (){
        gl_Position=a_Position; // 设置坐标
        gl_PointSize=20.0; // 设置尺寸
        v_TexCoord = a_TexCoord;
    }
`

// 片元着色器
const FSHADER_SOURCE = `
    // GLSL的精度限定符 https://www.jianshu.com/p/0e3f80467d46
    precision mediump float;
    uniform sampler2D u_Sampler0; 
    uniform sampler2D u_Sampler1; 
    varying  vec2 v_TexCoord;
   
    void main(){
        vec4 color0 = texture2D(u_Sampler0,v_TexCoord);
        vec4 color1 = texture2D(u_Sampler1,v_TexCoord);
        gl_FragColor = color0 * color1;
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

    // 设置纹理
    if (!initTexTrues(gl, n)) {

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
    const vertexTexCoord = new Float32Array([
        // 顶点坐标和 纹理坐标
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0,
    ])
    // 顶点数量
    let n = 4

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
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
    // 链接a_Position 变量与分配给他的缓存区对象
    gl.enableVertexAttribArray(a_Position) // 开启分配


    // 将顶点尺寸写入缓存区对象并开启
    let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
    //                                               归一化  向量值      偏移量
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
    gl.enableVertexAttribArray(a_TexCoord) // 开始缓存区分配
    return n
}

function initTexTrues(gl, n) {
    // 创建纹理对象
    let texture0 = gl.createTexture()
    let texture1 = gl.createTexture()

    // 获取 u_samplaer 存储位置
    let u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0')
    let u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1')
    // 创建一个image 对象
    let image0 = new Image()
    let image1 = new Image()
    image0.onload = function (){
        loadTexture(gl,n, texture0, u_Sampler0, image0)
    }
    image1.onload = function (){
        loadTexture(gl,n, texture1, u_Sampler1, image1)
    }
    image0.src = "../../WebGL-Programming-Guide/texture/mud_cracked_dry_03_diff_1k.jpg"
    image0.src = "../../WebGL-Programming-Guide/texture/mud_cracked_dry_03_diff_1k.jpg"
    return true;
}
function loadTexture(gl,n, texture, u_Sampler, image){
    // 由于图像的坐标系统的 y 轴 和webgl 的坐标系统是相反的 所以需要对齐进行y轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1) // 对纹理图像进行 y 轴反转

    // 开启 0 号纹理单元  必须绑定纹理, 默认有 8 个纹理单元
    gl.activeTexture(gl.TEXTURE0)

    // 向target 绑定纹理对象 TEXTURE_2D 二维纹理 TEXTURE_CUBE_MAP 立方体纹理
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB, gl.UNSIGNED_BYTE, image)

    // 将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0 )
    // 绘制矩形
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
