document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    // // canvas.width = window.innerWidth;
    // // make rectangle 
    // ctx.fillStyle = 'red';
    // ctx.fillRect(20, 20, 150, 100);
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(200, 20, 150, 100);

    // // create outline of rectangle
    // ctx.lineWidth = 0.5;
    // ctx.strokeStyle = 'green';
    // ctx.strokeRect(100, 200, 150, 100);

    // // clear out part of the rectangle
    // ctx.clearRect(25, 25, 140, 90);

    // // fill text
    // ctx.font = '30px Arial';
    // ctx.fillStyle = 'black';
    // ctx.fillText('Hello, world!', 400, 50)

    // //stroke text
    // ctx.lineWidth = 0.5;
    // ctx.strokeStyle = 'orange';
    // ctx.strokeText('Hello, world!', 400, 100);

    // Paths
    // // triangle
    // ctx.beginPath();
    // ctx.moveTo(50, 50);
    // ctx.lineTo(150, 50);
    // ctx.lineTo(100, 200);
    // ctx.lineTo(50, 50);
    // // ctx.closePath();
    // ctx.fillStyle = 'coral';
    // ctx.fill(); //or ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(200, 50);
    // ctx.lineTo(150, 200);
    // ctx.lineTo(250, 200);
    // ctx.closePath();
    // ctx.stroke();

    // // rectangle
    // ctx.beginPath();
    // ctx.rect(300, 50, 150, 100);
    // ctx.fillStyle = 'teal';
    // ctx.fill();

    // // arc (circles)
    // ctx.beginPath();

    // // canvas variables

    // const centerX = canvas.width/2;
    // const centerY = canvas.height/2;

    // ctx.arc(centerX, centerY, 200, 40, 0, Math.PI * 2, );

    // // move to mouth
    // ctx.moveTo(centerX + 100, centerY);

    // // Draw mouth
    // ctx.arc(centerX, centerY, 100, 0, Math.PI, false);

    // // move to left eye
    // ctx.moveTo(centerX-60, centerY-80);

    // // draw left eye
    // ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI*2);

    // // move to right eye
    // ctx.moveTo(centerX + 100, centerY - 80)
    // ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

    // ctx.stroke();

    // Animation 1

    // const circle = {
    //     x: 200,
    //     y: 200, 
    //     size: 30,
    //     dx: 5,
    //     dy: 4,
    // }

    // function drawCircle () {
    //     ctx.beginPath();
    //     ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI*2);
    //     ctx.fillStyle = 'purple';
    //     ctx.fill();
    // }

    // function update() {
    //     ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
    //     drawCircle();
    //     // change positopn
    //     circle.x += circle.dx;
    //     circle.y += circle.dy;

    //     // detect side walls
    //     if (circle.x + circle.size > canvas.width || 
    //         circle.x - circle.size < 0) {
    //         circle.dx *= -1; 
    //     }

    //     //detect bottom walls
    //     if (circle.y + circle.size > canvas.height || 
    //         circle.y - circle.size < 0) {
    //         circle.dy *= -1; 
    //     }
    //     requestAnimationFrame(update);
    // }
    // update();

    const image = document.getElementById('source');

    const player = {
        w: 50,
        h: 70,
        x: 20,
        y: 200,
        speed: 5,
        dx: 0,
        dy: 0
    }

    function drawPlayer() {
        ctx.drawImage(image, player.x, player.y, player.w, player.h)
    }

    function update() {
        drawPlayer();
    }

    update();

})