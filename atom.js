class Atom{
    constructor(x, y, arms, armlength ){
        this.x=x
        this.y=y
        this.armCount=arms
        this.armlength=armlength
        this.radius=10
        this.armSpread=(Math.PI*(arms-1))/this.armCount
        this.arms=[]
        this.turnAngle=this.armSpread/2
        this.detectorRadius=10
        this.halfDetectorRadius=this.detectorRadius/2
        this.detectorArray=[]

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
            this.detectorArray.push(new Detector(end.x, end.y))
        }

        this.arms=[]
        this.armCount=arms
        this.armlength=armlength


    }
    

    update(){
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