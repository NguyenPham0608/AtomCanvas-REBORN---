/**@type{HTMLCanvasElement} */
const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let mouseX=0
let mouseY=0


let atomArray=[]

function loop(){
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    console.table(atomArray)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    atomArray.forEach((atom) => {
        atom.update();
        atom.draw(ctx);
    });
    requestAnimationFrame(loop)
}

window.addEventListener('click',function(){
    atomArray.push(new Atom(mouseX,mouseY,10,70))
})

window.addEventListener('mousemove',function(e){
    mouseX=e.clientX
    mouseY=e.clientY
})


loop()