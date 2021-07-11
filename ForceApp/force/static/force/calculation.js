function fill_value(id, item, var1, var2, var3) {

// new -------------------------------------------------------------------------------->
    
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
    

// select changes -------------------------------------------------------------------------------->
    if (document.querySelector(id)) {
        document.querySelector(id).addEventListener('change', (event) => {
            
            const val = event.target.value
            const path = window.location.pathname.slice(13)

            if (val !== '0') {
                document.querySelector(`#edit_${item}_btn`).style.display = 'block';
                document.querySelector(`#delete_${item}_btn`).style.display = 'block';
            } else if (val === '0') {
                document.querySelector(`#edit_${item}_btn`).style.display = 'none';
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

// edit -------------------------------------------------------------------------------->
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
                        document.querySelector(`#edit_${item}_btn`).style.display = 'none';
                        document.querySelector(`#delete_${item}_btn`).style.display = 'none';
                    }
                })
            }
        })
    }
}

function fill_angles() {
// new -------------------------------------------------------------------------------->
    
    document.querySelector(`#new_angles_btn`).addEventListener('click', () => {

        if (document.querySelector(`#new_angles`).style.display === 'none') {
            document.querySelector(`#new_angles`).style.display = 'block';
            document.querySelector(`#save_angles_btn`).style.display = 'block';

            document.querySelector(`input#id_angles_key`).value = '';
            if (document.querySelector(`input#id_plungerFric:checked`)) {
                document.querySelector(`input#id_plungerFric:checked`).checked = false;
            }
            if (document.querySelector(`input#id_FN:checked`)) {
                document.querySelector(`input#id_FN:checked`).checked = false;
            }
            document.querySelector(`input#id_N`).value = '';
            
    
        } else {
            document.querySelector(`#new_angles`).style.display = 'none';
            document.querySelector(`#save_angles_btn`).style.display = 'none';
        }

    })
    

// select changes -------------------------------------------------------------------------------->
    if (document.querySelector('#angles')) {
        document.querySelector('#angles').addEventListener('change', (event) => {
            
            const val = event.target.value
            const path = window.location.pathname.slice(13)

            if (val !== '0') {
                document.querySelector(`#edit_angles_btn`).style.display = 'block';
                document.querySelector(`#delete_angles_btn`).style.display = 'block';
            } else if (val === '0') {
                document.querySelector(`#edit_angles_btn`).style.display = 'none';
                document.querySelector(`#delete_angles_btn`).style.display = 'none';
            }

            fetch(`/parameter/angles/${path}?num=${val}`)
            .then(response => response.json())
            .then(result => {
                document.querySelector(`input#plungerFric`).value = result.var1;
                document.querySelector(`input#N`).value = result.var2;
                document.querySelector(`input#FN`).value = result.var3;
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

// save -------------------------------------------------------------------------------->
    document.querySelector(`#save_angles_btn`).addEventListener('click', () => {

        let key = document.querySelector(`input#id_angles_key`).value;
        let v1 = document.querySelector(`input#id_plungerFric:checked`).value;
        let v2 = document.querySelector(`input#id_N`).value;
        let v3 = 0;
        if (document.querySelector('input#id_FN:checked').value === '+') {
            v3 = parseFloat(v2) + 90;
        } else if (document.querySelector('input#id_FN:checked').value === '-') {
            v3 = parseFloat(v2) - 90;
        }
        
        const path = window.location.pathname.slice(13)

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const request = new Request(
            `/parameter/angles/${path}?num=none`,
            {headers: {'X-CSRFToken': csrftoken}}
        );

        fetch(request, {
            method: 'POST',
            mode: 'same-origin',
            body: JSON.stringify({
                key: key,
                var1: v1,
                var2: v2,
                var3: v3.toString(),
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
                document.querySelector('#angles').append(newOption)
            }
        })

        document.querySelector(`input#id_angles_key`).value = '';
        document.querySelector(`input#id_plungerFric:checked`).checked = false;
        document.querySelector(`input#id_N`).value = '';
        document.querySelector(`input#id_FN:checked`).checked = false;
    })

// edit -------------------------------------------------------------------------------->
    if (document.querySelector(`#edit_angles_btn`)) {
        document.querySelector(`#edit_angles_btn`).addEventListener('click', () => {

            if (document.querySelector('#angles').value !== "0") {

                let v1 = document.querySelector(`input#N`).value;
                let v2 = document.querySelector(`input#id_N`).value;
                let v3 = 0;
                if (document.querySelector('input#id_FN:checked').value === '+') {
                    v3 = parseFloat(v2) + 90;
                } else if (document.querySelector('input#id_FN:checked').value === '-') {
                    v3 = parseFloat(v2) - 90;
                }
                
                const project_num = window.location.pathname.slice(13)
                const option_num = document.querySelector('#angles').value;

                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const request = new Request(
                    `/parameter/angles/${project_num}?num=${option_num}`,
                    {headers: {'X-CSRFToken': csrftoken}}
                );
        
                fetch(request, {
                    method: 'PUT',
                    mode: 'same-origin',
                    body: JSON.stringify({
                        var1: v1,
                        var2: v2,
                        var3: v3.toString(),
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
// delete -------------------------------------------------------------------------------->
    if (document.querySelector(`#delete_angles_btn`)) {
        document.querySelector(`#delete_angles_btn`).addEventListener('click', () => {

            if (document.querySelector('#angles').value !== "0") {
        
                const project_num = window.location.pathname.slice(13)
                const option_num = document.querySelector('#angles').value;
    
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const request = new Request(
                    `/parameter/angles/${project_num}?num=${option_num}`,
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
                        const x = document.querySelector('#angles')
                        x.remove(x.selectedIndex)
                        console.log(result.message)
                        document.querySelector(`input#plungerFric`).value = '';
                        document.querySelector(`input#N`).value = '';
                        document.querySelector(`input#FN`).value = '';
                        document.querySelector(`#edit_angles_btn`).style.display = 'none';
                        document.querySelector(`#delete_angles_btn`).style.display = 'none';
                    }
                })
            }
        })
    }

}


function check(event) {

    if (event.target.value !== "0") {
        const val = event.target.value;
        const path = window.location.pathname.slice(13);
    
        fetch(`/check/${path}/${val}`)
        .then(response => response.json())
        .then(result => {
            if (result.agree === true) {
                console.log(result)
                document.querySelector('#agree').style.display = 'block';
                document.querySelector('#discard').style.display = 'none';
        
            } else if (result.agree === false) {
                console.log(result)
                document.querySelector('#agree').style.display = 'none';
                document.querySelector('#discard').style.display = 'block';
            }
        })
    }
}

function calculate() {

// select changes -------------------------------------------------------------------------------->
    document.querySelector('#variables').addEventListener('change', (event) => {
        
        check(event);
        const val = event.target.value
        const path = window.location.pathname.slice(13)

        if (val !== '0') {
            document.querySelector(`#delete_variables_btn`).style.display = 'block';
                        
            fetch(`/result/${path}/${val}`)
            .then(response => response.json())
            .then(result => {

                document.querySelector('input#id_Na').value = result.var1;
                document.querySelector('input#id_Nb').value = result.var2;
                document.querySelector('input#id_NR').value = result.var3;

                document.querySelector('#angles').value = result.angles.id;
                document.querySelector('input#plungerFric').value = result.angles.var1;
                document.querySelector('input#N').value = result.angles.var2;
                document.querySelector('input#FN').value = result.angles.var3;

                document.querySelector('#springs').value = result.spring.id;
                document.querySelector('input#springStiff').value = result.spring.var1;
                document.querySelector('input#freeLen').value = result.spring.var2;
                document.querySelector('input#springLen').value = result.spring.var3;
                
                document.querySelector('#plungers').value = result.plunger.id;
                document.querySelector('input#a').value = result.plunger.var1;
                document.querySelector('input#b').value = result.plunger.var2;
                document.querySelector('input#f').value = result.plunger.var3;

                document.querySelector('#contacts').value = result.contact.id;
                document.querySelector('input#mu').value = result.contact.var1;
                document.querySelector('input#contactCoord_X').value = result.contact.var2;
                document.querySelector('input#contactCoord_Y').value = result.contact.var3;
            
                document.querySelector('#delete_contact_btn').style.display = 'block';
                document.querySelector('#delete_plunger_btn').style.display = 'block';
                document.querySelector('#delete_spring_btn').style.display = 'block';
                document.querySelector('#delete_angles_btn').style.display = 'block';
                
                document.querySelector('#edit_contact_btn').style.display = 'block';
                document.querySelector('#edit_plunger_btn').style.display = 'block';
                document.querySelector('#edit_spring_btn').style.display = 'block';
                document.querySelector('#edit_angles_btn').style.display = 'block';
                document.querySelector('#id_variables_key').value = '';
            })
            .catch(err => {
                console.log(err)
            })
        } else if (val === '0') {

            document.querySelector('input#id_Na').value = '';
            document.querySelector('input#id_Nb').value = '';
            document.querySelector('input#id_NR').value = '';
            document.querySelector('#agree').style.display = 'none';
            document.querySelector('#discard').style.display = 'none';
            document.querySelector('#delete_variables_btn').style.display = 'none';
            
            document.querySelector('#id_variables_key').value = '';
        }
    })

// delete -------------------------------------------------------------------------------->
    if (document.querySelector(`#delete_variables_btn`)) {
        document.querySelector(`#delete_variables_btn`).addEventListener('click', () => {

            if (document.querySelector('#variables').value !== "0") {
        
                const project_num = window.location.pathname.slice(13)
                const option_num = document.querySelector('#variables').value;
    
                const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const request = new Request(
                    `/result/${project_num}/${option_num}`,
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
                        const x = document.querySelector('#variables')
                        x.remove(x.selectedIndex)
                        console.log(result.message)

                        x.value = 0;
                        document.querySelector(`#delete_variables_btn`).style.display = 'none';
                        document.querySelector('input#id_Na').value = '';
                        document.querySelector('input#id_Nb').value = '';
                        document.querySelector('input#id_NR').value = '';
                        
                    }
                })
            }
        })
    }

// create new results -------------------------------------------------------------------------------->
    document.querySelector(`#calculate`).addEventListener('click', () => {

        let contact_input = document.querySelector('#contacts').value;
        let plunger_input = document.querySelector('#plungers').value;
        let spring_input = document.querySelector('#springs').value;
        let angles_input = document.querySelector('#angles').value;
        let key = document.querySelector('#id_variables_key').value;

        const path = window.location.pathname.slice(13)

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const request = new Request(
            `/calculation/${path}`,
            {headers: {'X-CSRFToken': csrftoken}}
        );

        fetch(request, {
            method: 'POST',
            mode: 'same-origin',
            body: JSON.stringify({
                key: key,
                contact: contact_input,
                plunger: plunger_input,
                spring: spring_input,
                angles: angles_input,
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                console.log(result.error[0])
            } else {

                document.querySelector('input#id_Na').value = result.var1;
                document.querySelector('input#id_Nb').value = result.var2;
                document.querySelector('input#id_NR').value = result.var3;
        
                const newOption = document.createElement('option');
                newOption.value = result.id;
                newOption.innerHTML = result.key;
                document.querySelector('#variables').append(newOption)
                document.querySelector('#variables').value = result.id;
                document.querySelector('#delete_variables_btn').style.display = 'block';
                
                document.querySelector('#delete_contact_btn').style.display = 'block';
                document.querySelector('#delete_plunger_btn').style.display = 'block';
                document.querySelector('#delete_spring_btn').style.display = 'block';
                document.querySelector('#delete_angles_btn').style.display = 'block';
                
                document.querySelector('#edit_contact_btn').style.display = 'block';
                document.querySelector('#edit_plunger_btn').style.display = 'block';
                document.querySelector('#edit_spring_btn').style.display = 'block';
                document.querySelector('#edit_angles_btn').style.display = 'block';
            
                document.querySelector('#agree').style.display = 'block';
                document.querySelector('#discard').style.display = 'none';
            }
        })

    })

}










function disableScroll() {
    document.body.classList.add("stop-scrolling");
}
  
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function visualization() {

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    let canvas_scale = 0.6;

    canvas.width = window.innerWidth * canvas_scale;
    canvas.height = window.innerHeight * canvas_scale;

    let mouseState = 'mouseup';
    let coord = {
        X: 0,
        Y: 0,
    }
    let mouse = {
        X: 0,
        Y: 0,
    }
    let scale = 0.8;
    let pos = {
        X: 0,
        Y: 0,
    }

    document.querySelector('#home_btn').addEventListener('click', () => {
        coord.X = 0,
        coord.Y = 0,
        mouse.X = 0,
        mouse.Y = 0,
        scale = 0.8;
        pos.X = 0;
        pos.Y = 0;
        drawRect(ctx, scale, pos.X, pos.Y);
    })

    canvas.addEventListener('mouseover', () => {
        disableScroll();
        canvas.addEventListener('mousemove', function(event) {
            var rect = canvas.getBoundingClientRect();
            mouse.X = event.clientX - rect.left;
            mouse.Y = event.clientY - rect.top;
            if (mouseState === 'mousedown') {
                pos.X = mouse.X - coord.X;
                pos.Y = mouse.Y - coord.Y;
                drawRect(ctx, scale, pos.X, pos.Y);
            }
        })

    })   
    canvas.addEventListener('mouseout', function(event) {
        enableScroll();
    })


// canvas scrolling ---------------------------------------------->
    canvas.addEventListener('wheel', function(event) {
        
        scale += 0.05 * Math.sign(event.deltaY)
        if (scale < 0.1) {
            scale = 0.1;
        }
        drawRect(ctx, scale, pos.X, pos.Y);
    })
// window resizing ---------------------------------------------->
    window.addEventListener('resize', (event) => {
        event.preventDefault();
        canvas.width = window.innerWidth * canvas_scale;
        canvas.height = window.innerHeight * canvas_scale;
        drawRect(ctx, scale, pos.X, pos.Y);
    })
    drawRect(ctx, scale, pos.X, pos.Y);


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
}

function drawRect(ctx, scale, posX, posY) {
    
    ctx.clearRect(0, 0, canvas.clientWidth + 100, canvas.height);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'green';
    const rect = {
        startX: canvas.width/2 * (1 - scale) + posX,
        startY: canvas.height/2 * (1 - scale) + posY,
        width: canvas.width * scale,
        height: canvas.height * scale,
    }
    // ctx.strokeRect(rect.startX, rect.startY, rect.width, rect.height)

    const origin ={
        x: canvas.width/2,
        y: canvas.height/2,
    }

    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, 2 * origin.y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(2 * origin.x, origin.y);
    ctx.closePath();
    ctx.stroke();

    const parse_b = parseFloat(document.querySelector('input#b').value);
    const parse_a = parseFloat(document.querySelector('input#a').value);
    const parse_contactCoord_X = parseFloat(document.querySelector('input#contactCoord_X').value);
    const parse_contactCoord_Y = -parseFloat(document.querySelector('input#contactCoord_Y').value);

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

    const max_width = Math.max(0, A.x, B.x, C.x) - Math.min(0, A.x, B.x, C.x);
    const max_height = Math.max(0, A.y, B.y, C.y) - Math.min(0, A.y, B.y, C.y);

    const parse_scale_X = rect.width/max_width;
    const parse_scale_Y = rect.height/max_height;

    let parse_scale = 1;
    let _O = {
        x: rect.startX + rect.width/2,
        y: rect.startY + rect.height/2,
    }

    if (parse_scale_X < parse_scale_Y) {
        parse_scale = parse_scale_X;
    } else if (parse_scale_Y < parse_scale_X) {
        parse_scale = parse_scale_Y;
    } else if (parse_scale_Y === parse_scale_X) {
        parse_scale = parse_scale_X;
    }

    if (Math.min(0, A.x, B.x, C.x) === 0) {
        _O.x = rect.startX + rect.width/2 - (max_width * parse_scale)/2;
    } else if (Math.max(0, A.x, B.x, C.x) === 0) {
        _O.x = rect.startX + rect.width/2 + (max_width * parse_scale)/2;
    } else if (Math.min(0, A.x, B.x, C.x) !== 0
     && Math.max(0, A.x, B.x, C.x) !== 0) {
        _O.x = rect.startX + rect.width/2 + (max_width * parse_scale)/2 - Math.max(0, A.x, B.x, C.x) * parse_scale;
    }

    if (Math.min(0, A.y, B.y, C.y) === 0) {
        _O.y = rect.startY + rect.height/2 - (max_height * parse_scale)/2;
    } else if (Math.max(0, A.y, B.y, C.y) === 0) {
        _O.y = rect.startY + rect.height/2 + (max_height * parse_scale)/2;
    }

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

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(_A.x, _A.y);
    ctx.lineTo(_B.x, _B.y);
    ctx.closePath();
    ctx.stroke();
    
    ctx.strokeStyle = 'coral';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(_B.x, _B.y);
    ctx.lineTo(_C.x, _C.y);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(_O.x, _O.y, 5, 0, Math.PI*2);
    ctx.fillStyle = 'purple';
    ctx.fill();

    const absolute_coordinate_X = -(_O.x - origin.x)/parse_scale;
    const absolute_coordinate_Y = -(_O.y - origin.y)/parse_scale;

    document.querySelector('#posX').innerHTML = `X: <small>${absolute_coordinate_X.toFixed(3)}</small>`
    document.querySelector('#posY').innerHTML = ` Y: <small>${-absolute_coordinate_Y.toFixed(3)}</small>`

}

document.addEventListener('DOMContentLoaded', function() {

    fill_value("#contacts", "contact", "mu", "contactCoord_X", "contactCoord_Y");
    fill_value("#plungers", "plunger", "a", "b", "f");
    fill_value("#springs", "spring", "springStiff", "freeLen", "springLen");
    fill_angles();
    //fill_value("#angles", "angles", "plungerFric", "N", "FN");

    calculate();
    visualization();
})
// https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4