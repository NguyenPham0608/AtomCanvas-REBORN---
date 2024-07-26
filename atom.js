class Atom{
    constructor(x, y, arms=4, armlength=10 ){
        this.x=x
        this.y=y
        this.armCount=arms
        this.armlength=armlength
        this.radius=10
    }
    update(){

    }
    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        ctx.fill()
    }
}