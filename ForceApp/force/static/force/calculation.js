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

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}
  
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function visualization() {

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mouseover', () => {
        disableScroll();
        canvas.addEventListener('mousemove', function(event) {
            var rect = canvas.getBoundingClientRect();
            mouse.X = event.clientX - rect.left;
            mouse.Y = event.clientY - rect.top;
            document.querySelector('#posX').innerHTML = `X: <small>${mouse.X.toFixed(3)}</small>`
            document.querySelector('#posY').innerHTML = ` Y: <small>${mouse.Y.toFixed(3)}</small>`
        })
        if (mouseState === 'mousedown') {
            drawRect(ctx, scale, mouse.X, mouse.Y);
        }
    })   
    canvas.addEventListener('mouseout', function(event) {
        enableScroll();
    })

    canvas.width = window.innerWidth * 0.6;
    canvas.height = window.innerHeight * 0.6;

    let scale = 0.5;
    let coord = {
        X: 0,
        Y: 0,
    }
    let mouse = {
        X: 0,
        Y: 0,
    }

    let mouseState = 'mouseup'

    canvas.addEventListener('wheel', function(event) {
        
        scale += 0.05 * Math.sign(event.deltaY)
        if (scale < 0.1) {
            scale = 0.1;
        }
        console.log(scale)
        drawRect(ctx, scale, coord.X, coord.Y);
    })

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth * 0.6;
        canvas.height = window.innerHeight * 0.6;
        drawRect(ctx, scale, coord.X, coord.Y);
    })
    drawRect(ctx, scale, coord.X, coord.Y);
// rectangle fitt ---------------------------------------------->
    canvas.addEventListener('mousedown', (event)=> {
        if (event.button === 0) {
            console.log(mouse.X, mouse.Y)
            canvas.addEventListener('mouseup', (event) => {
                if (event.button === 0) {
                    console.log(mouse.X, mouse.Y)
                }
            })
        }
    })
// translate context

            console.log(mouse.X, mouse.Y)
            canvas.addEventListener('mouseup', (event) => {
                if (event.button === 1) {
                    console.log(mouse.X, mouse.Y)
                }
            })
        }
    })


}

function drawRect(ctx, scale, posX, posY) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'green';
    const rect = {
        width: canvas.width * scale,
        height: canvas.height * scale,
    }
    ctx.strokeRect(canvas.width/2 - rect.width/2 + posX,
        canvas.height/2 - rect.height/2 + posY, 
        rect.width,
        rect.height)

}

document.addEventListener('DOMContentLoaded', function() {

    fill_value("#contacts", "contact", "mu", "contactCoord_X", "contactCoord_Y");
    fill_value("#plungers", "plunger", "a", "b", "f");
    fill_value("#springs", "spring", "springStiff", "freeLen", "springLen");
    fill_value("#angles", "angles", "plungerFric", "N", "FN");
    fill_value("#variables", "variables", "Na", "Nb", "NR");

    visualization();
})
// https://www.youtube.com/watch?v=vxljFhP2krI&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=4