/**@type{HTMLCanvasElement} */
const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let brushArms=3

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
    console.table(atomData)
    requestAnimationFrame(loop)
}

window.addEventListener('click',function(){
    if (atomData.length<1) {
        atomArray.push(new Atom(mouseX,mouseY,brushArms,70,0,false))
    } else {
        const X=atomData.x
        const Y=atomData.y
        const length=atomData.length
        const angle=(atomData.angle)
        const connectX=X
        const connectY=Y
        const armNumber=atomData.armNumber
        atomArray.push(new Atom(connectX,connectY,brushArms,70,angle,true))
    }
})

window.addEventListener('mousemove',function(e){
    mouseX=e.clientX
    mouseY=e.clientY
})

window.addEventListener('keyup',function(e){
    if (e.key==" ") {
        brushArms=window.prompt('How many arms?')
    }
})

loop()