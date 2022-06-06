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
    // 指定清空 canvas 的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空 canvas
    gl.clear(gl.COLOR_BUFFER_BIT)
}
