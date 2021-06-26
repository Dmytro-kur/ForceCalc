function fill_value(id, item, var1, var2, var3) {

// new -------------------------------------------------------------------------------->
    if (item !== "variables") {
        document.querySelector(`#new_${item}_btn`).addEventListener('click', () => {

            if (document.querySelector(`#new_${item}`).style.display === 'none') {
    
                document.querySelector(`#id_${item}_key`).value = '';
                document.querySelector(`#id_${var1}`).value = '';
                document.querySelector(`#id_${var2}`).value = '';
                document.querySelector(`#id_${var3}`).value = '';
                document.querySelector(`#new_${item}`).style.display = 'block';
                document.querySelector(`#save_${item}_btn`).style.display = 'block';
            } else {
                document.querySelector(`#id_${item}_key`).value = '';
                document.querySelector(`#id_${var1}`).value = '';
                document.querySelector(`#id_${var2}`).value = '';
                document.querySelector(`#id_${var3}`).value = '';
                document.querySelector(`#new_${item}`).style.display = 'none';
                document.querySelector(`#save_${item}_btn`).style.display = 'none';
            }
        })
    }

// select changes -------------------------------------------------------------------------------->
    if (document.querySelector(id)) {
        document.querySelector(id).addEventListener('change', (event) => {

            const val = event.target.value
            const path = window.location.pathname.slice(13)

            if (val !== '0') {
                if (item !== "variables") {
                    document.querySelector(`#edit_${item}_btn`).style.display = 'block';
                }
                document.querySelector(`#delete_${item}_btn`).style.display = 'block';
            } else if (val === '0') {
                if (item !== "variables") {
                    document.querySelector(`#edit_${item}_btn`).style.display = 'none';
                }
                document.querySelector(`#delete_${item}_btn`).style.display = 'none';
            }

            fetch(`/parameter/${item}/${path}?num=${val}`)
            .then(response => response.json())
            .then(result => {
                document.querySelector(`input#${var1}`).value = result.var1;
                document.querySelector(`input#${var2}`).value = result.var2;
                document.querySelector(`input#${var3}`).value = result.var3;
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

// save -------------------------------------------------------------------------------->
    if (item !== "variables") {
        document.querySelector(`#save_${item}_btn`).addEventListener('click', () => {

            let key = document.querySelector(`#id_${item}_key`).value;
            let v1 = document.querySelector(`#id_${var1}`).value;
            let v2 = document.querySelector(`#id_${var2}`).value;
            let v3 = document.querySelector(`#id_${var3}`).value;
    
            const path = window.location.pathname.slice(13)
    
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const request = new Request(
                `/parameter/${item}/${path}?num=none`,
                {headers: {'X-CSRFToken': csrftoken}}
            );
    
            fetch(request, {
                method: 'POST',
                mode: 'same-origin',
                body: JSON.stringify({
                    key: key,
                    var1: v1,
                    var2: v2,
                    var3: v3,
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error)
                } else {
                    console.log(result.message)
                    const newOption = document.createElement('option');
                    newOption.value = result.id;
                    newOption.innerHTML = result.key;
                    document.querySelector(id).append(newOption)
                }
            })
    
            document.querySelector(`#id_${item}_key`).value = '';
            document.querySelector(`#id_${var1}`).value = '';
            document.querySelector(`#id_${var2}`).value = '';
            document.querySelector(`#id_${var3}`).value = '';
        })
    
    }

// edit -------------------------------------------------------------------------------->
    if (item !== "variables") {
            if (document.querySelector(`#edit_${item}_btn`)) {
        document.querySelector(`#edit_${item}_btn`).addEventListener('click', () => {

            if (document.querySelector(id).value !== "0") {
    
                let v1 = document.querySelector(`input#${var1}`).value;
                let v2 = document.querySelector(`input#${var2}`).value;
                let v3 = document.querySelector(`input#${var3}`).value;
        
                const project_num = window.location.pathname.slice(13)
                const option_num = document.querySelector(id).value;
    
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const request = new Request(
                    `/parameter/${item}/${project_num}?num=${option_num}`,
                    {headers: {'X-CSRFToken': csrftoken}}
                );
        
                fetch(request, {
                    method: 'PUT',
                    mode: 'same-origin',
                    body: JSON.stringify({
                        var1: v1,
                        var2: v2,
                        var3: v3,
                    })
                })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
        
                        console.log(result.error)
                    } else {
        
                        console.log(result.message)
                    }
                })
            }
        })
    }
    
    }

// delete -------------------------------------------------------------------------------->
    if (document.querySelector(`#delete_${item}_btn`)) {
        document.querySelector(`#delete_${item}_btn`).addEventListener('click', () => {

            if (document.querySelector(id).value !== "0") {
        
                const project_num = window.location.pathname.slice(13)
                const option_num = document.querySelector(id).value;
    
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const request = new Request(
                    `/parameter/${item}/${project_num}?num=${option_num}`,
                    {headers: {'X-CSRFToken': csrftoken}}
                );
                fetch(request, {
                    method: 'DELETE',
                    mode: 'same-origin',
                })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        console.log(result.error)
                    } else {
                        const x = document.querySelector(id)
                        x.remove(x.selectedIndex)
                        console.log(result.message)
                        document.querySelector(`input#${var1}`).value = '';
                        document.querySelector(`input#${var2}`).value = '';
                        document.querySelector(`input#${var3}`).value = '';
                        if (item !== "variables") {
                            document.querySelector(`#edit_${item}_btn`).style.display = 'none';
                        }
                        document.querySelector(`#delete_${item}_btn`).style.display = 'none';
                    }
                })
            }
        })
    }



}

document.addEventListener('DOMContentLoaded', function() {

    fill_value("#contacts", "contact", "mu", "contactCoord_X", "contactCoord_Y");
    fill_value("#plungers", "plunger", "a", "b", "f");
    fill_value("#springs", "spring", "springStiff", "freeLen", "springLen");
    fill_value("#angles", "angles", "plungerFric", "N", "FN");
    fill_value("#variables", "variables", "Na", "Nb", "NR");

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    // canvas.width = window.innerWidth * 0.6;
    // canvas.height = window.innerHeight * 0.6;

    canvas.width = 900;
    canvas.height = 1500;

    // make rectangle 
    ctx.fillStyle = '#1AC8DB';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(250, 200, 150, 100);

    // create outline of rectangle
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(100, 200, 150, 100);

    // clear out part of the rectangle
    ctx.clearRect(255, 205, 140, 90);

    // fill text
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Hello, world!', 250, 205)

    //stroke text
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'orange';
    ctx.strokeText('Hello, world!', 250, 255);

    // Paths
    // triangle
    ctx.fillStyle = 'coral';
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(100, 200);
    ctx.lineTo(50, 50);
    ctx.closePath();
    
    ctx.fill(); //or ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(150, 200);
    ctx.lineTo(250, 200);
    ctx.closePath();
    ctx.stroke();

    // rectangle
    ctx.beginPath();
    ctx.rect(300, 50, 150, 100);
    ctx.fillStyle = 'teal';
    ctx.fill();

    // arc (circles)
    ctx.beginPath();

    // canvas variables

    const centerX = 450;
    const centerY = 250;

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5;
    ctx.arc(centerX, centerY, 100, 0, Math.PI * 2 * 0.75);

    // move to mouth
    ctx.moveTo(centerX + 110, centerY);

    /// Draw mouth
    ctx.arc(centerX, centerY, 110, 0, Math.PI, false);

    // move to left eye
    ctx.moveTo(centerX-60, centerY-80);

    // draw left eye
    ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI*2);

    // move to right eye
    ctx.moveTo(centerX + 100, centerY - 80)
    ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);

    ctx.stroke();
//--------------------------------------------
    // Animation 1

    const circle = {
        x: 200,
        y: 600, 
        size: 30,
        dx: 5,
        dy: 4,
    }

    function drawCircle () {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI*2);
        ctx.fillStyle = 'purple';
        ctx.fill();
    }

    function update() {
        ctx.clearRect(0,490, canvas.clientWidth, 1000);
        drawCircle();
        // change positopn
        circle.x += circle.dx;
        circle.y += circle.dy;

        // detect side walls
        if (circle.x + circle.size > canvas.width || 
            circle.x - circle.size < 0) {
            circle.dx *= -1; 
        }

        //detect bottom walls
        if (circle.y + circle.size > 1000 || 
            circle.y - circle.size < 500) {
            circle.dy *= -1; 
        }
        requestAnimationFrame(update);
    }
    update();

    const image = document.getElementById('source');

    const player = {
        w: 50,
        h: 70,
        x: 20,
        y: 1200,
        speed: 10,
        dx: 0,
        dy: 0
    }

    function clear() {
        ctx.clearRect(0,1000, canvas.clientWidth, canvas.height);
    }

    function newPos() {
        player.x += player.dx;
        player.y += player.dy;

        detectWalls();
    }

    function detectWalls() {
        // Left wall
        if (player.x < 0) {
            player.x = 0;
        }

    //     // Right wall
    //     if (player.x + player.w > canvas.width) {
    //         player.x = canvas.width - player.w;
    //     }

    //     // Top wall
    //     if (player.y < 0) {
    //         player.y = 0;
    //     }

    //     // Bottom wall
    //     if (player.y + player.h > canvas.height) {
    //         player.y = canvas.height - player.h;
    //     }
    // }

    // image.addEventListener('load', () => {

    //     function drawPlayer() {
    //         ctx.drawImage(image, player.x, player.y, player.w, player.h)
    //     }
    
    //     function update() {
    //         clear();
    //         drawPlayer();
    //         newPos();
    //         requestAnimationFrame(update);
    //     }
    //     update();

    //     function moveUp() {
    //         player.dy = -player.speed;
    //     }
    //     function moveDown() {
    //         player.dy = player.speed;
    //     }
    //     function moveRight() {
    //         player.dx = player.speed;
    //     }
    //     function moveLeft() {
    //         player.dx = -player.speed;
    //     }

    //     function keyDown(event) {
    //         if (event.key === 'ArrowRight' || event.key === 'Right') {
    //             moveRight();
    //         } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
    //             moveLeft();
    //         } else if (event.key === 'ArrowUp' || event.key === 'Up') {
    //             moveUp();
    //         } else if (event.key === 'ArrowDown' || event.key === 'Down') {
    //             moveDown();
    //         }
    //     }

    //     function keyUp(event) {
    //         if (
    //             event.key === 'Right' ||
    //             event.key === 'ArrowRight' ||
    //             event.key === 'Left' ||
    //             event.key === 'ArrowLeft' ||
    //             event.key === 'Up' ||
    //             event.key === 'ArrowUp' ||
    //             event.key === 'Down' ||
    //             event.key === 'ArrowDown'
    //         ) {
    //             player.dx = 0;
    //             player.dy = 0;
    //         }
    //     }

    //     document.addEventListener('keydown', keyDown);
    //     document.addEventListener('keyup', keyUp);
    // })

    // var mouse = {
    //     x: 0,
    //     y: 0
    // }

    // var maxRadius = 40;

    // var scale = 1;
    // var ds = 0.1
    // var colorArray = [
    //     '#2C3E50',
    //     '#E74C3C',
    //     '#ECF0F1',
    //     '#3498DB',
    //     '#2980B9'

    // ];

    // canvas.addEventListener('mousemove', function(event) {
    //     var rect = canvas.getBoundingClientRect();

    //     mouse.x = event.clientX - rect.left;
    //     mouse.y = event.clientY - rect.top;

        
    // })

    // canvas.addEventListener('wheel', function(event) {
        
    //     if (event.deltaY/100 === 1) {
    //         scale = 1 + ds
    //     } else if (event.deltaY/100 === -1) {
    //         scale = 1/(1 + ds)
    //     }
    //     init();
    //     // console.log(scale)
    // })

    // window.addEventListener('resize', function() {
    //     canvas.width = window.innerWidth * 0.6;
    //     canvas.height = window.innerHeight * 0.6;
        
    //     init();
    // })

    // function Circle(x, y, dx, dy, dr, radius) {
    //     this.x = x;
    //     this.y = y;
    //     this.dx = dx;
    //     this.dy = dy;
    //     this.dr = dr;
    //     this.radius = radius;
    //     this.minRadius = radius;
    //     this.color = colorArray[ Math.round(Math.random()*(colorArray.length-1)) ];
        
    //     this.draw = function() {
            
    //         // ctx.strokeStyle = 'blue';
    //         // ctx.stroke();
            
    //         ctx.fillStyle = this.color
    //         ctx.beginPath();
    //         ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    //         ctx.fill();
    
    //     }

    //     this.update = function() {
    //         if (this.x + this.radius > canvas.width ||
    //             this.x - this.radius < 0) {
    //             this.dx = -this.dx;
    //         }
    
    //         if (this.y + this.radius > canvas.height ||
    //             this.y - this.radius < 0) {
    //             this.dy = -this.dy;
    //         }
    //         this.x += this.dx;
    //         this.y += this.dy;

    //         // interactivity

    //         if (Math.abs(mouse.x - this.x) < 50 && 
    //             Math.abs(mouse.y - this.y) < 50) {
    //             if (this.radius < maxRadius) {
    //                 this.radius += this.dr;
    //             }
    //         } else if (this.radius > this.minRadius) {
    //             this.radius -= this.dr;
    //         }

    //         this.draw();
    //     }
    // }

    // var circleArray = [];

    // function init() {

    //     ctx.clearRect(0, 0, canvas.width + 100, canvas.height + 100);
    //     console.log(scale)
    //     ctx.scale(scale, scale);

    //     circleArray = [];

    //     for (var i = 0; i < 800; i++) {
    //         var radius = Math.random() * 3 + 1;
    //         var x = Math.max(radius, Math.random() * canvas.width - radius);
    //         var y = Math.max(radius, Math.random() * canvas.height - radius);
    //         var dx = (Math.random() - 0.5)*0.5;// 0.5;
    //         var dy = (Math.random() - 0.5)*0.5;// 0.5;
    //         var dr = 0.3;// 0.3;
    //         circleArray.push(new Circle(x, y, dx, dy, dr, radius));
    //     }
    // }
    
    // function animate() {
    //     requestAnimationFrame(animate);
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     ctx.fillStyle = '#74BDCB';
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     for (var i = 0; i < circleArray.length; i++) {
    //         circleArray[i].update();
    //     }

    //     ctx.font = '30px Arial';
    //     ctx.fillStyle = 'black';
    //     ctx.fillText(`x: ${mouse.x.toFixed(2)}, y: ${mouse.y.toFixed(2)}`, mouse.x, mouse.y)

    // }

    // init();

    // animate();
})
// https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4