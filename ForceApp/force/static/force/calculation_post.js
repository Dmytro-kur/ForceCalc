function post_data(id, item, v1, v2, v3) {

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
}

function po(){
    
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

}