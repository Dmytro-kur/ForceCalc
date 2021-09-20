function post_data(select, name, v1, v2, v3) {

    const key = document.querySelector(`#${name}_key`).value
    const project_num = window.location.pathname.slice(13)

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        `/parameter/${name}/${project_num}?value=none`,
        {headers: {'X-CSRFToken': csrftoken}}
    );

    fetch(request, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify({
            key: key,
            var1: parseFloat(v1),
            var2: parseFloat(v2),
            var3: parseFloat(v3),
        })
    })
    .then(response => response.json())
    .then(result => {

        const courses = {
            java: 10,
        
            javascript: 55,
        
            nodejs: 5,
        
            php: 15
        };
        
        // convert object to key's array
        
        const keys = Object.keys(courses);
        
        // print all keys
        
        console.log(keys);
        
        // [ 'java', 'javascript', 'nodejs', 'php' ]
        
        // iterate over object
        
        keys.forEach((key, index) => {
            console.log(`${key}: ${courses[key]}`);
        });
        
        // java: 10
        
        // javascript: 55
        
        // nodejs: 5
        
        // php: 15
        if (result.error) {
            console.log('length of the errors obj: ', Object.keys(result.error).length, result.error[0])
            let errors = [];

            for (let i = 0; i < Object.keys(result.error).length; i++) {
                errors.push(result.error[i])

            }

            alert(errors)
        } else {
        
        alert(result.message)
        const newOption = document.createElement('option');
        newOption.value = result.id;
        newOption.innerHTML = result.key;
        newOption.selected = true;
        select.append(newOption)
        }
    })
    // .catch(errors => {
    //     console.log(errors)
    //     let err = [];

    //     for (let i = 0; i < Object.keys(errors).length; i++) {
    //         err.push(err)
    //     }

    //     alert(errors)
    // })
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