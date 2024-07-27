/**@type{HTMLCanvasElement} */
const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let mouseX=0
let mouseY=0
let atomData=[]

//atomData format:
//0: armAngle
//1: armLength
//2: x
//3: y

let atomArray=[]

function loop(){
    atomData=[]
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    ctx.clearRect(0,0,canvas.width,canvas.height)
    atomArray.forEach((atom) => {
        atom.update();
        atom.draw(ctx);
    });
    requestAnimationFrame(loop)
}

window.addEventListener('click',function(){
    if (atomData.length<1) {
        atomArray.push(new Atom(mouseX,mouseY,3,70,0))
    } else {
        const X=atomData.x
        const Y=atomData.y
        const length=atomData.length
        const angle=atomData.angle
        const connectX=X
        const connectY=Y
        atomArray.push(new Atom(connectX,connectY,3,70,angle,true))
    }
})

window.addEventListener('mousemove',function(e){
    mouseX=e.clientX
    mouseY=e.clientY
})


loop()