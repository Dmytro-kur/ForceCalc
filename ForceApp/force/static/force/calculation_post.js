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
            [`${name}_key`]: key,
            var1: parseFloat(v1),
            var2: parseFloat(v2),
            var3: parseFloat(v3),
        })
    })
    .then(response => response.json())
    .then((response) => {

        if (response['errors']) {

            reactInputInstance.newState(`${name}`);
            reactInputInstance.setState({
                [`${name}_state`]: 0,
            })

            let fields = {
                'contact': [
                    'contact_key', 'mu', 'contactCoord_X', 'contactCoord_Y'
                ],
                'plunger': [
                    'plunger_key', 'a', 'b', 'f'
                ],
                'spring': [
                    'spring_key', 'springStiff', 'freeLen', 'springLen'
                ],
                'angles': [
                    'angles_key', 'plungerFric', 'N', 'FN'
                ],
                'variables': [
                    'variables_key', 'Na', 'Nb', 'NR'
                ],
            }

            // throw new Error('Something went wrong');
            const source = response['errors']
            const errors = Object.keys(response['errors']);

            errors.forEach((field, index) => {
                for (let i = 0; i < fields[`${name}`].length; i++) { 
                    if (fields[`${name}`][i] === field) { 
                        fields[`${name}`].splice(i, 1);
                    }
                }
                let field_errors = [];
                for (let i = 0; i < source[field].length; i++) {
                    field_errors.push(`${source[field][i]}`)
                }
                console.log(`${field}: ${field_errors.join("")}`)
                document.querySelector(`#${field}`).classList.remove('is-valid')
                document.querySelector(`#${field}`).classList.add('is-invalid')
                document.querySelector(`#${field}_invalid-tooltip`).innerHTML = `${field_errors.join("")}`
            });
            fields[`${name}`].forEach((field) => {
                document.querySelector(`#${field}`).classList.remove('is-invalid')
                document.querySelector(`#${field}`).classList.add('is-valid')
                document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
            })

        } else if (response['message']) {
            console.log(`message: ${response['message']}`)

            const newOption = document.createElement('option');
            newOption.value = response.id;
            newOption.innerHTML = response.key;
            select.append(newOption)
            newOption.selected = true;

            reactInputInstance.activeState(`${name}`);
            reactInputInstance.setState({
                [`${name}_state`]: 1,
            });

            let FIELDS = {
                'contact': [
                    'contact_key', 'mu', 'contactCoord_X', 'contactCoord_Y'
                ],
                'plunger': [
                    'plunger_key', 'a', 'b', 'f'
                ],
                'spring': [
                    'spring_key', 'springStiff', 'freeLen', 'springLen'
                ],
                'angles': [
                    'angles_key', 'plungerFric', 'N', 'FN'
                ],
                'variables': [
                    'variables_key', 'Na', 'Nb', 'NR'
                ],
            }

            FIELDS[`${name}`].forEach((field) => {
                document.querySelector(`#${field}`).classList.remove('is-invalid')
                document.querySelector(`#${field}`).classList.add('is-valid')
                document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
            })

            setTimeout(() => {
                FIELDS[`${name}`].forEach((field) => {
                    document.querySelector(`#${field}`).classList.remove('is-invalid')
                    document.querySelector(`#${field}`).classList.remove('is-valid')
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                })
            }, 3000)
            
        } else if (response['disclaimer']) {
            alert(response['disclaimer'])
        }
    })
    .catch(error => {
        console.log(error)
    })
}

// function po(){
    
//     const path = window.location.pathname.slice(13)
    
//     const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
//     const request = new Request(
//         `/calculation/${path}`,
//         {headers: {'X-CSRFToken': csrftoken}}
//     );

//     fetch(request, {
//         method: 'POST',
//         mode: 'same-origin',
//         body: JSON.stringify({
//             key: key,
//             contact: contact_input,
//             plunger: plunger_input,
//             spring: spring_input,
//             angles: angles_input,
//         })
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.error) {
//             console.log(result.error[0])
//         } else {

//             document.querySelector('input#id_Na').value = result.var1;
//             document.querySelector('input#id_Nb').value = result.var2;
//             document.querySelector('input#id_NR').value = result.var3;
    
//             const newOption = document.createElement('option');
//             newOption.value = result.id;
//             newOption.innerHTML = result.key;
//             document.querySelector('#variables').append(newOption)
//             document.querySelector('#variables').value = result.id;
//             document.querySelector('#delete_variables_btn').style.display = 'block';
            
//             document.querySelector('#delete_contact_btn').style.display = 'block';
//             document.querySelector('#delete_plunger_btn').style.display = 'block';
//             document.querySelector('#delete_spring_btn').style.display = 'block';
//             document.querySelector('#delete_angles_btn').style.display = 'block';
            
//             document.querySelector('#edit_contact_btn').style.display = 'block';
//             document.querySelector('#edit_plunger_btn').style.display = 'block';
//             document.querySelector('#edit_spring_btn').style.display = 'block';
//             document.querySelector('#edit_angles_btn').style.display = 'block';
        
//             document.querySelector('#agree').style.display = 'block';
//             document.querySelector('#discard').style.display = 'none';
//         }
//     })

// }