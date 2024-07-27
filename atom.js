class Atom{
    constructor(x, y, arms, armlength, armAngle, attached=false ){
        this.x=x
        this.y=y
        this.armCount=arms
        this.armlength=armlength
        this.radius=10
        this.armSpread=(Math.PI*2)/this.armCount
        this.arms=[]
        this.detectorRadius=10
        this.halfDetectorRadius=this.detectorRadius/2
        this.detectorArray=[]
        this.attached=attached
        if (this.attached) {
            this.turnAngle=armAngle 
        }else{
            this.turnAngle=0
        }
        for(let i=0;i<this.armCount;i++){
            const armAngle1=lerp(
                this.armSpread,
                -this.armSpread,
                this.armCount==1?0.5:i/(this.armCount-1)
            )+this.turnAngle;

            const start1={x:this.x, y:this.y};
            const end1={
                x:this.x-
                    Math.sin(armAngle1)*(this.armlength),
                y:this.y-
                    Math.cos(armAngle1)*(this.armlength)
            };
            this.arms.push([start1,end1]);
        }

        for(let i=0;i<this.armCount;i++){
            let end=this.arms[i][1];
            ctx.stroke();
            this.detectorArray.push(new Detector(end.x, end.y, this.armlength, this.armSpread*i))
        }
        console.log(this.armSpread)

        this.arms=[]
        this.armCount=arms
        this.armlength=armlength

    }
    

    update(){
        console.log(atomData)

        this.arms=[];
        for(let i=0;i<this.armCount;i++){
            const armAngle=lerp(
                this.armSpread,
                -this.armSpread,
                this.armCount==1?0.5:i/(this.armCount-1)
            )+this.turnAngle;

            const start={x:this.x, y:this.y};
            const end={
                x:this.x-
                    Math.sin(armAngle)*this.armlength,
                y:this.y-
                    Math.cos(armAngle)*this.armlength
            };
            this.arms.push([start,end]);
        }
        for(let i=0; i<this.armCount;i++){
            if(this.detectorArray[i].touching){
                atomData={
                    angle:this.detectorArray[i].armAngle,
                    length:this.detectorArray[i].armLength,
                    x:this.detectorArray[i].x,
                    y:this.detectorArray[i].y
                }
            }
        }
    }
    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        ctx.fill()

    

        for(let i=0;i<this.armCount;i++){


            let end=this.arms[i][1];

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.arms[i][0].x,
                this.arms[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.arms[i][1].x,
                this.arms[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
        this.detectorArray.forEach((detector)=>{
            detector.draw(ctx)
        })

    }
}