function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function draw_initialization() {

    const parse_contactCoord_X = parseFloat(document.querySelector('#contact_Xcoord').value);
    const parse_contactCoord_Y = -parseFloat(document.querySelector('#contact_Ycoord').value);
    const parse_a = parseFloat(document.querySelector('#plunger_a').value);
    const parse_b = parseFloat(document.querySelector('#plunger_b').value);

    canvas.width = 700;
    canvas.height = 600;
    let mouseState = 'mouseup';

    drawRect(ctx, scale, pos.X, pos.Y,
        parse_contactCoord_X, parse_contactCoord_Y, 
        parse_a, parse_b);

    document.querySelector('#home_btn').addEventListener('click', () => {
        scale   = 0.8;

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
        
        scale += 0.05 * Math.sign(event.deltaY)
        if (scale < 0.05) {
            scale = 0.05;
        }
        
        drawRect(ctx, scale, pos.X, pos.Y, reactInputInstance.state.Xcoord,
            reactInputInstance.state.Ycoord, reactInputInstance.state.a, reactInputInstance.state.b);
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
        if (event.button === 1) {
            event.preventDefault();
            mouseState = 'mousedown'

            coord.X = mouse.X - pos.X;
            coord.Y = mouse.Y - pos.Y;

            document.body.addEventListener('mouseup', (event) => {
                if (event.button === 1) {
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

// Find maximum possible scale factor for fitting inside rectangle
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
// Conditions for centering content inside rectangle

    if (Math.min(0, A.x, B.x, C.x) === 0) {
        _O.x = _O.x - (max_width * parse_scale)/2;

    } else if (Math.max(0, A.x, B.x, C.x) === 0) {
        _O.x = _O.x + (max_width * parse_scale)/2;

    } else if (Math.min(0, A.x, B.x, C.x) !== 0
    && Math.max(0, A.x, B.x, C.x) !== 0) {
        _O.x = _O.x + (max_width * parse_scale)/2 - Math.max(0, A.x, B.x, C.x) * parse_scale;
    }

    if (Math.min(0, A.y, B.y, C.y) === 0) {
        _O.y = _O.y - (max_height * parse_scale)/2;
    } else if (Math.max(0, A.y, B.y, C.y) === 0) {
        _O.y = _O.y + (max_height * parse_scale)/2;
    }

// Relative coordinates of a beam
    const _C = {
        x: _O.x + C.x * parse_scale,
        y: _O.y + C.y * parse_scale,
    }

    const _B = {
        x: _O.x + B.x * parse_scale,
        y: _O.y + B.y * parse_scale,
    }

    const _A = {
        x: _O.x + A.x * parse_scale,
        y: _O.y + A.y * parse_scale,
    }

    const absolute_coordinate_X = -(_O.x - origin.x)/parse_scale;
    const absolute_coordinate_Y = -(_O.y - origin.y)/parse_scale;

// Clear all previous drawings
    ctx.clearRect(0, 0, canvas.clientWidth + 100, canvas.height);

// Build rectangle as a reference (optionally)
    // ctx.lineWidth = 0.5;
    // ctx.strokeStyle = 'black';
    // ctx.strokeRect(rect.startX, rect.startY, rect.width, rect.height)

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

// Build first part of beam
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(_A.x, _A.y);
    ctx.lineTo(_B.x, _B.y);
    ctx.closePath();
    ctx.stroke();

// Build second part of beam
    ctx.strokeStyle = 'coral';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(_B.x, _B.y);
    ctx.lineTo(_C.x, _C.y);
    ctx.closePath();
    ctx.stroke();

// Build floating origin
    ctx.beginPath();
    ctx.arc(_O.x, _O.y, 5, 0, Math.PI*2);
    ctx.fillStyle = 'purple';
    ctx.fill();

// Grid
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = 'black';

    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.moveTo(_O.x + (i*5) * parse_scale,            0);
        ctx.lineTo(_O.x + (i*5) * parse_scale, 2 * origin.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(_O.x - (i*5) * parse_scale,            0);
        ctx.lineTo(_O.x - (i*5) * parse_scale, 2 * origin.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(           0, _O.y + (i*5) * parse_scale);
        ctx.lineTo(2 * origin.x, _O.y + (i*5) * parse_scale);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(           0, _O.y - (i*5) * parse_scale);
        ctx.lineTo(2 * origin.x, _O.y - (i*5) * parse_scale);
        ctx.closePath();
        ctx.stroke();
    }





    // document.querySelector('#posX').innerHTML = `X: <small>${absolute_coordinate_X.toFixed(3)}</small>`
    // document.querySelector('#posY').innerHTML = ` Y: <small>${-absolute_coordinate_Y.toFixed(3)}</small>`
}

// https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4