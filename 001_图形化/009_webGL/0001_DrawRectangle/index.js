function main() {
    const canvas = document.getElementById('example')
    if (!canvas){
        console.log('Failed to retrieve the canvas element')
        return false;
    }
    // console.log(canvas.getBoundingClientRect())
    // console.log(window.devicePixelRatio)
    var ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'
    ctx.fillRect(200  - (120 / 2), 200  - (120 / 2), 120, 120)

}
