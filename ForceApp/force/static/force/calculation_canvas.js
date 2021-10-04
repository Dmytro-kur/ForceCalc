function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function draw_initialization() {

    el = document.querySelector('#body').offsetWidth
    canvas.width = el * 0.9;
    
    if (canvas.width < 600) {
        canvas.height = canvas.width;
    } else {
        canvas.height = 600;
    }

    let mouseState = 'mouseup';

    document.querySelector('#home_btn').addEventListener('click', () => {
        scale   =   0.8;

// coordinate of starting point when mouse was clicked at first
        coord.X = 0;
        coord.Y = 0;

// Mouse position in canvas coordinate system
        mouse.X = 0;
        mouse.Y = 0;

// Value of the shifted position
        pos.X   = 0;
        pos.Y   = 0;
        
        draw(ctx, scale, pos.X, pos.Y, 
            reactInputInstance.state.mu, 
            reactInputInstance.state.contactCoord_X,
            reactInputInstance.state.contactCoord_Y, 
            reactInputInstance.state.a, 
            reactInputInstance.state.b,
            reactInputInstance.state.f,
            reactInputInstance.state.springStiff,
            reactInputInstance.state.freeLen,
            reactInputInstance.state.springLen,
            reactInputInstance.state.Na,
            reactInputInstance.state.Nb,
            reactInputInstance.state.NR,
            reactInputInstance.state.NaFD,
            reactInputInstance.state.NbFD,
            reactInputInstance.state.NRFD,
            reactInputInstance.state.NaD,
            reactInputInstance.state.NbD,
            reactInputInstance.state.NRD,
        );
    })

// canvas scrolling ---------------------------------------------->
    canvas.addEventListener('wheel', function(event) {
        
        scale -= 0.05 * Math.sign(event.deltaY)
        if (scale < 0.01) {
            scale = 0.01;
        }

        draw(ctx, scale, pos.X, pos.Y, 
            reactInputInstance.state.mu, 
            reactInputInstance.state.contactCoord_X,
            reactInputInstance.state.contactCoord_Y, 
            reactInputInstance.state.a, 
            reactInputInstance.state.b,
            reactInputInstance.state.f,
            reactInputInstance.state.springStiff,
            reactInputInstance.state.freeLen,
            reactInputInstance.state.springLen,
            reactInputInstance.state.Na,
            reactInputInstance.state.Nb,
            reactInputInstance.state.NR,
            reactInputInstance.state.NaFD,
            reactInputInstance.state.NbFD,
            reactInputInstance.state.NRFD,
            reactInputInstance.state.NaD,
            reactInputInstance.state.NbD,
            reactInputInstance.state.NRD,
        );
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

                draw(ctx, scale, pos.X, pos.Y, 
                    reactInputInstance.state.mu, 
                    reactInputInstance.state.contactCoord_X,
                    reactInputInstance.state.contactCoord_Y, 
                    reactInputInstance.state.a, 
                    reactInputInstance.state.b,
                    reactInputInstance.state.f,
                    reactInputInstance.state.springStiff,
                    reactInputInstance.state.freeLen,
                    reactInputInstance.state.springLen,
                    reactInputInstance.state.Na,
                    reactInputInstance.state.Nb,
                    reactInputInstance.state.NR,
                    reactInputInstance.state.NaFD,
                    reactInputInstance.state.NbFD,
                    reactInputInstance.state.NRFD,
                    reactInputInstance.state.NaD,
                    reactInputInstance.state.NbD,
                    reactInputInstance.state.NRD,
                );
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

// window resizing ---------------------------------------------->
    window.addEventListener('resize', (event) => {
        event.preventDefault();

        el = document.querySelector('#body').offsetWidth
        canvas.width = el * 0.9;
        
        if (canvas.width < 600) {
            canvas.height = canvas.width;
        } else {
            canvas.height = 600;
        }

        draw(ctx, scale, pos.X, pos.Y, 
            reactInputInstance.state.mu, 
            reactInputInstance.state.contactCoord_X,
            reactInputInstance.state.contactCoord_Y, 
            reactInputInstance.state.a, 
            reactInputInstance.state.b,
            reactInputInstance.state.f,
            reactInputInstance.state.springStiff,
            reactInputInstance.state.freeLen,
            reactInputInstance.state.springLen,
            reactInputInstance.state.Na,
            reactInputInstance.state.Nb,
            reactInputInstance.state.NR,
            reactInputInstance.state.NaFD,
            reactInputInstance.state.NbFD,
            reactInputInstance.state.NRFD,
            reactInputInstance.state.NaD,
            reactInputInstance.state.NbD,
            reactInputInstance.state.NRD,
        );
    })
    
}

function draw(ctx, scale, posX, posY,
    raw_mu, 
    raw_contactCoord_X, 
    raw_contactCoord_Y, 
    raw_a,
    raw_b,
    raw_f,
    raw_springStiff,
    raw_freeLen,
    raw_springLen,
    raw_Na,
    raw_Nb,
    raw_NR,
    raw_NaFD,
    raw_NbFD,
    raw_NRFD,
    raw_NaD,
    raw_NbD,
    raw_NRD,
    ) {

    const mu = parseFloat(raw_mu)
    const contactCoord_X = parseFloat(raw_contactCoord_X)
    const contactCoord_Y = parseFloat(raw_contactCoord_Y)
    const a = parseFloat(raw_a)
    const b = parseFloat(raw_b)
    const f = parseFloat(raw_f)
    const springStiff = parseFloat(raw_springStiff)
    const freeLen = parseFloat(raw_freeLen)
    const springLen = parseFloat(raw_springLen)
    const Na = parseFloat(raw_Na)
    const Nb = parseFloat(raw_Nb)
    const NR = parseFloat(raw_NR)
    const NaFD = parseFloat(raw_NaFD)
    const NbFD = parseFloat(raw_NbFD)
    const NRFD = parseFloat(raw_NRFD)
    const NaD = parseFloat(raw_NaD)
    const NbD = parseFloat(raw_NbD)
    const NRD = parseFloat(raw_NRD)

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
        x: contactCoord_X,
        y: contactCoord_Y,
    }

    const B = {
        x: C.x -a,
        y: contactCoord_Y,
    }

    const A = {
        x: B.x - b,
        y: contactCoord_Y,
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
    let W = 0.4 * parse_scale

    ctx.strokeStyle = 'green';
    ctx.lineWidth = W/5;
    ctx.strokeRect(_A.x, (_A.y - W/2), Math.abs(_B.x - _A.x), W)

// Build second part of beam
    ctx.strokeStyle = 'coral';
    ctx.lineWidth = W/5;
    ctx.strokeRect(_B.x, (_B.y - W/2), Math.abs(_B.x - _C.x), W)

    // Build floating origin

    let R = 0.4 * parse_scale
    ctx.beginPath();
    ctx.arc(_O.x, _O.y, R, 0, Math.PI*2);
    ctx.strokeStyle = 'purple';
    ctx.stroke();

// Build rigid fixation
    function build_rigid_fix(P, W, n) {
        // P - point, where fixation was added,
        // W - width of the beam
        // n - number of lines for ground

        ctx.strokeStyle = 'brown';
        ctx.lineWidth = W/3;
        ctx.beginPath();
    
        ctx.moveTo(P.x - 2*W, P.y + W);
        ctx.lineTo(P.x + 2*W, P.y + W);
    
        ctx.moveTo(P.x - 2*W, P.y - W);
        ctx.lineTo(P.x + 2*W, P.y - W);
        ctx.stroke();

        ctx.lineWidth = W/6;
        ctx.beginPath();

        for (let i = 0; i < n; i++) {

            ctx.moveTo(P.x - 2*W + i*4*W/n, P.y + W);
            ctx.lineTo(P.x - 2*W + i*4*W/n + 4*W/n, P.y + W + 4*W/n);

            ctx.moveTo(P.x + 2*W - i*4*W/n, P.y - W);
            ctx.lineTo(P.x + 2*W - i*4*W/n - 4*W/n, P.y - W - 4*W/n);
        }

        ctx.stroke();
    }

    build_rigid_fix(_A, W, 6);
    build_rigid_fix(_B, W, 6);

    function reaction(P, R, A, s, color) {
        // P - point where force was applied
        // R - reaction force value
        // A - direction of force
        // s - scale for force value

        const S = s * parse_scale

        ctx.strokeStyle = color;
        ctx.lineWidth = W/2;
        ctx.beginPath();
    
        ctx.moveTo(P.x, P.y);
        ctx.lineTo(P.x + (Math.abs(R) * Math.cos(A*Math.PI/180)) * S, 
                   P.y - (Math.abs(R) * Math.sin(A*Math.PI/180)) * S);
    
        ctx.stroke();

        const text_X = (P.x + (Math.abs(R) * Math.cos(A*Math.PI/180)) * S).toFixed(2);
        const text_Y = (P.y - (Math.abs(R) * Math.sin(A*Math.PI/180)) * S).toFixed(2);
        
        ctx.lineWidth = 1;   
        ctx.fillStyle = 'black';
        ctx.font = "15px Arial";


        ctx.fillText(`(${Math.abs(R).toFixed(2)} N; ${(A).toFixed(0)} deg)`, text_X, text_Y);
    
    }

    let colors = [
        '#98D7C2',
        '#167D7F',
        '#29A0B1',
        
        '#145DA0',
        '#2E8BC0',
        '#B1D4E0',
        '#659DBD'
    ]

    const color1 = Math.floor(Math.random() * colors.length);
    reaction(_C, NR, NRD, 0.5, colors[color1]);
    
    const color2 = Math.floor(Math.random() * colors.length);
    reaction(_C, NR*mu, NRFD, 0.5, colors[color2]);
    
    const color3 = Math.floor(Math.random() * colors.length);
    reaction(_A, Na, NaD, 0.5, colors[color3]);
    
    const color4 = Math.floor(Math.random() * colors.length);
    reaction(_A, Math.abs(Na*f), NaFD, 0.5, colors[color4]);
    
    const color5 = Math.floor(Math.random() * colors.length);
    reaction(_B, Nb, NbD, 0.5, colors[color5]);
    
    const color6 = Math.floor(Math.random() * colors.length);
    reaction(_B,  Math.abs(Nb*f), NbFD, 0.5, colors[color6]);

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
    
    ctx.fillStyle = 'black';
    ctx.font = "15px Arial";

    let grid_right = Math.ceil( (canvas.width - _O.x) / box );
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
    let grid_bottom = Math.ceil( (canvas.height - _O.y) / box );
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
// https://www.canva.com/colors/color-palettes/
// https://css-tricks.com/clipping-masking-css/
// https://www.photopea.com/