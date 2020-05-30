function draw(){
    context.setTransform(1,0,0,1,0,0)
    context.clearRect(0,0, canvas.width, canvas.height)
    //clamp the camera to the player
    const camX = -player.locX + canvas.width/2
    const camY = -player.locY + canvas.height/2
    // translate allow us to move the canvas around
    context.translate(camX, camY)

  

    //draw all player 
    players.forEach(p => {
        context.beginPath()
        context.fillStyle = p.color
        // arg1, 2 x,y of center
        // arg3 radius
        //arg4  where to start on the circle in randian
        // arg5 where to stop radian
        context.arc(p.locX, p.locY, p.radius,0,Math.PI*2)
        context.fill()
        context.lineWidth = 3;
        context.strokeStyle = 'rgb(255,0,0)'
        context.stroke()
    })
    //draw all orbs
    orbs.forEach(orb => {
        context.beginPath()
        context.fillStyle = orb.color
        context.arc(orb.locX, orb.locY, orb.radius, 0 , Math.PI*2)
        context.fill()
    })

    requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove',(event)=>{
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
       
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    player.xVector = xVector
    player.yVector = yVector
})