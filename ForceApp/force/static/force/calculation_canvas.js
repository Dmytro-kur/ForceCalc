function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function draw_initialization() {

    const parse_contactCoord_X = parseFloat(document.querySelector('#contact_Xcoord').value);
    const parse_contactCoord_Y = parseFloat(document.querySelector('#contact_Ycoord').value);
    const parse_a = parseFloat(document.querySelector('#plunger_a').value);
    const parse_b = parseFloat(document.querySelector('#plunger_b').value);

    canvas.width = 700;
    canvas.height = 600;
    let mouseState = 'mouseup';

    drawRect(ctx, scale, pos.X, pos.Y,
        parse_contactCoord_X, parse_contactCoord_Y, 
        parse_a, parse_b);

    document.querySelector('#home_btn').addEventListener('click', () => {
        scale   =   0.8;
        cscale  = scale;
        // number of pixels in unit square
        i = 35;
// coordinate of starting point when mouse was clicked at first
        coord.X = 0;
        coord.Y = 0;

// Mouse position in canvas coordinate system
        mouse.X = 0;
        mouse.Y = 0;

// Value of the shifted position
        pos.X   = 0;
        pos.Y   = 0;
        drawRect(ctx, scale, pos.X, pos.Y, reactInputInstance.state.Xcoord,
            reactInputInstance.state.Ycoord, reactInputInstance.state.a, reactInputInstance.state.b);
    })

// canvas scrolling ---------------------------------------------->
    canvas.addEventListener('wheel', function(event) {
        
        scale -= 0.05 * Math.sign(event.deltaY)
        if (scale < 0.01) {
            scale = 0.01;
        }
        // console.log(scale)

        drawRect(ctx, scale, pos.X, pos.Y, reactInputInstance.state.Xcoord,
            reactInputInstance.state.Ycoord, reactInputInstance.state.a,
            reactInputInstance.state.b);
    })

// detecting cursor
    canvas.addEventListener('mouseover', () => {
        disableScroll();
        canvas.addEventListener('mousemove', function(event) {
            var rect = canvas.getBoundingClientRect();

            mouse.X = event.clientX - rect.left;
            mouse.Y = event.clientY - rect.top;

            if (mouseState === 'mousedown') {
                pos.X = mouse.X - coord.X;
                pos.Y = mouse.Y - coord.Y;

                drawRect(ctx, scale, pos.X, pos.Y, reactInputInstance.state.Xcoord,
            reactInputInstance.state.Ycoord, reactInputInstance.state.a, reactInputInstance.state.b);
            }
        })

    })   
    canvas.addEventListener('mouseout', function() {
        enableScroll();
    })

// translate context
    canvas.addEventListener('mousedown', (event)=> {
        if (event.button === 0) {
            event.preventDefault();
            mouseState = 'mousedown'

            coord.X = mouse.X - pos.X;
            coord.Y = mouse.Y - pos.Y;

            document.body.addEventListener('mouseup', (event) => {
                if (event.button === 0) {
                    event.preventDefault();
                    mouseState = 'mouseup'

                    coord.X = mouse.X - pos.X;
                    coord.Y = mouse.Y - pos.Y;
                }
            })
        }
    })

// // window resizing ---------------------------------------------->
//     window.addEventListener('resize', (event) => {
//         event.preventDefault();
//         canvas.width = window.innerWidth * canvas_scale;
//         canvas.height = window.innerHeight * canvas_scale;
//         drawRect(ctx, scale, pos.X, pos.Y,
//             parse_contactCoord_X, parse_contactCoord_Y, 
//             parse_a, parse_b);
//     })
    
}

function drawRect(ctx, scale, posX, posY,
    parse_contactCoord_X, parse_contactCoord_Y, 
    parse_a, parse_b) {

// dimensions of a reference rectangle
    const rect = {
        startX: ( canvas.width * (1 - scale) ) / 2 + posX,
        startY: ( canvas.height * (1 - scale) ) / 2 + posY,
        width: canvas.width * scale,
        height: canvas.height * scale,
    }

// Center of the canvas
    const origin ={
        x: canvas.width / 2,
        y: canvas.height / 2,
    }
// Absolute coordinates of a beam
    const C = {
        x: parse_contactCoord_X,
        y: parse_contactCoord_Y,
    }

    const B = {
        x: C.x - parse_a,
        y: parse_contactCoord_Y,
    }

    const A = {
        x: B.x - parse_b,
        y: parse_contactCoord_Y,
    }

// Find maximum possible scale factor for fitting rectangle
    const max_width = Math.max(0, A.x, B.x, C.x) - Math.min(0, A.x, B.x, C.x);
    const max_height = Math.max(0, A.y, B.y, C.y) - Math.min(0, A.y, B.y, C.y);

    const parse_scale_X = rect.width/max_width;
    const parse_scale_Y = rect.height/max_height;

    let parse_scale = 1;

    if (parse_scale_X < parse_scale_Y) {
        parse_scale = parse_scale_X;
    } else if (parse_scale_Y < parse_scale_X) {
        parse_scale = parse_scale_Y;
    } else if (parse_scale_Y === parse_scale_X) {
        parse_scale = parse_scale_X;
    }

// Floating origin
    let _O = {
        x: rect.startX + rect.width/2,
        y: rect.startY + rect.height/2,
    }
// Correction of floating origin

    if (Math.min(0, A.x, B.x, C.x) === 0) {
        _O.x = _O.x - (max_width * parse_scale)/2;

    } else if (Math.max(0, A.x, B.x, C.x) === 0) {
        _O.x = _O.x + (max_width * parse_scale)/2;

    } else if (Math.min(0, A.x, B.x, C.x) !== 0
    && Math.max(0, A.x, B.x, C.x) !== 0) {
        _O.x = _O.x + (max_width * parse_scale)/2 - Math.max(0, A.x, B.x, C.x) * parse_scale;
    }

    if (Math.min(0, A.y, B.y, C.y) === 0) {
        _O.y = _O.y + (max_height * parse_scale)/2;

    } else if (Math.max(0, A.y, B.y, C.y) === 0) {
        _O.y = _O.y - (max_height * parse_scale)/2;
    }

// Relative coordinates of a beam
    const _C = {
        x: _O.x + C.x * parse_scale,
        y: _O.y - C.y * parse_scale,
    }

    const _B = {
        x: _O.x + B.x * parse_scale,
        y: _O.y - B.y * parse_scale,
    }

    const _A = {
        x: _O.x + A.x * parse_scale,
        y: _O.y - A.y * parse_scale,
    }



// Clear all previous drawings
    ctx.clearRect(0, 0, canvas.clientWidth + 100, canvas.height);

// Build rectangle as a reference (optionally)
    // ctx.lineWidth = 0.5;
    // ctx.strokeStyle = 'black';
    // ctx.strokeRect(rect.startX, rect.startY, rect.width, rect.height)



// Build first part of beam
    let koef = 0.4

    ctx.strokeStyle = 'green';
    ctx.lineWidth = koef * parse_scale;
    ctx.beginPath();
    ctx.moveTo(_A.x, _A.y);
    ctx.lineTo(_B.x, _B.y);
    ctx.closePath();
    ctx.stroke();

// Build second part of beam
    ctx.strokeStyle = 'coral';
    ctx.lineWidth = koef * parse_scale;
    ctx.beginPath();
    ctx.moveTo(_B.x, _B.y);
    ctx.lineTo(_C.x, _C.y);
    ctx.closePath();
    ctx.stroke();

// Build floating origin

    let circle_radius = 0.3

    ctx.beginPath();
    ctx.arc(_O.x, _O.y, circle_radius * parse_scale, 0, Math.PI*2);
    ctx.fillStyle = 'purple';
    ctx.fill();

// Grid

// Central lines

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(_O.x,            0);
    ctx.lineTo(_O.x, 2 * origin.y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(           0, _O.y);
    ctx.lineTo(2 * origin.x, _O.y);
    ctx.closePath();
    ctx.stroke();
    
// box size in px
    let box = mm * parse_scale;

    while (box > 50) {
        mm /= 2;
        box = mm * parse_scale;
    }

    while (box < 20) {
        mm *= 2;
        box = mm * parse_scale;
    }
    // console.log('mm: ', mm)
    // console.log('parse_scale: ', parse_scale)
    // console.log('scale: ', scale)

    // console.log('size of element: ', box)
    
    ctx.fillStyle = 'black';
    ctx.font = "15px Arial";

    let grid_right = Math.ceil( (700 - _O.x) / box );
    for (let i = 1; i < grid_right; i++) {
        if (i % 5 == 0) {
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(_O.x + i * box,            0);
            ctx.lineTo(_O.x + i * box, 2 * origin.y);
            ctx.closePath();
            ctx.stroke();

            ctx.fillText(Math.round(i*mm*1000) / 1000, _O.x + i * box - 20, 15);
            ctx.fillText(Math.round(i*mm*1000) / 1000, _O.x + i * box - 20, 2 * origin.y);
        } else {
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(_O.x + i * box,            0);
            ctx.lineTo(_O.x + i * box, 2 * origin.y);
            ctx.closePath();
            ctx.stroke();
        }

    }
    let grid_left = Math.ceil( (_O.x) / box );
    for (let i = 1; i < grid_left; i++) {
        if (i % 5 == 0) {
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(_O.x - i * box,            0);
            ctx.lineTo(_O.x - i * box, 2 * origin.y);
            ctx.closePath();
            ctx.stroke();

            ctx.fillText(-Math.round(i*mm*1000) / 1000, _O.x - i * box - 20, 15);
            ctx.fillText(-Math.round(i*mm*1000) / 1000, _O.x - i * box - 20, 2 * origin.y);
        } else {
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(_O.x - i * box,            0);
            ctx.lineTo(_O.x - i * box, 2 * origin.y);
            ctx.closePath();
            ctx.stroke();
        }
    }
    let grid_bottom = Math.ceil( (600 - _O.y) / box );
    for (let i = 1; i < grid_bottom; i++) {
        if (i % 5 == 0) {
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(           0, _O.y + i * box);
            ctx.lineTo(2 * origin.x, _O.y + i * box);
            ctx.closePath();
            ctx.stroke();

            ctx.fillText(-Math.round(i*mm*1000) / 1000, 0                , _O.y + i * box);
            ctx.fillText(-Math.round(i*mm*1000) / 1000, 2 * origin.x - 45, _O.y + i * box);
        } else {
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(           0, _O.y + i * box);
            ctx.lineTo(2 * origin.x, _O.y + i * box);
            ctx.closePath();
            ctx.stroke();
        }
    }
    let grid_top = Math.ceil( (_O.y) / box );
    for (let i = 1; i < grid_top; i++) {
        if (i % 5 == 0) {
            ctx.lineWidth = 0.25;
            ctx.beginPath();
            ctx.moveTo(           0, _O.y - i * box);
            ctx.lineTo(2 * origin.x, _O.y - i * box);
            ctx.closePath();
            ctx.stroke();

            ctx.fillText(Math.round(i*mm*1000) / 1000, 0                , _O.y - i * box);
            ctx.fillText(Math.round(i*mm*1000) / 1000, 2 * origin.x - 40, _O.y - i * box); 
        } else {
            ctx.lineWidth = 0.1;
            ctx.beginPath();
            ctx.moveTo(           0, _O.y - i * box);
            ctx.lineTo(2 * origin.x, _O.y - i * box);
            ctx.closePath();
            ctx.stroke();
        }
    }

// lines through center (cross)

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - (origin.y * 0.03));
    ctx.lineTo(origin.x, origin.y + (origin.y * 0.03));
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(origin.x - (origin.y * 0.03), origin.y);
    ctx.lineTo(origin.x + (origin.y * 0.03), origin.y);
    ctx.closePath();
    ctx.stroke();

// Clear rectangle for coordinates
    ctx.clearRect(0, 0, 150, 30);

// Build coordinates in upper left corner
    const absolute_coordinate_X = (-(_O.x - origin.x)/parse_scale).toFixed(2);
    const absolute_coordinate_Y = ((_O.y - origin.y)/parse_scale).toFixed(2);
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.rect(0, 0, 150, 30);
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = "15px Arial";
    ctx.fillText(`X: ${absolute_coordinate_X}; Y: ${absolute_coordinate_Y}`, 15, 20);
}

// https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4