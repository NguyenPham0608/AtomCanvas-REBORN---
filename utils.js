function lerp(A,B,t){
    return A+(B-A)*t;
}

function getXandYfrom(x,y,angle,length){
    const end={
        x:x-
            Math.sin(angle)*length,
        y:y-
            Math.cos(angle)*length
    };
    return end;
}