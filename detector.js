class Detector{
    constructor(x,y,armLength,armAngle){
        this.x=x
        this.y=y
        this.dx=0
        this.dy=0
        this.distance=0
        this.radius=10
        this.fillStyle='white'
        this.armLength=armLength
        this.armAngle=armAngle
        this.touching=false
    }
    draw(ctx){
        this.dx=this.x-mouseX
        this.dy=this.y-mouseY
        this.distance=Math.hypot(this.dx, this.dy)
        if (this.distance<this.radius) {
            this.touching=true
            this.fillStyle='#00FF00'
            ctx.globalAlpha=1
        } else {
            this.fillStyle='gray'
            ctx.globalAlpha=0
            this.touching=false
        }
        ctx.fillStyle=this.fillStyle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0,Math.PI*2, false)
        ctx.fill()
        ctx.globalAlpha=1
    }
}