function initVertexBuffers(gl){
    var vertices  = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, 0.5
    ])
    var n = 3 // 点的个数
    var vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object')
        return -1
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    //获取attribute变量存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1
    }
    // 将缓冲区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    // 链接 a_Position 变量与分配给他的缓冲区
    gl.enableVertexAttribArray(a_Position)
    return n
}
