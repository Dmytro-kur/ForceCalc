function change_data(name, v1, v2, v3) {

    const project_num = window.location.pathname.slice(13)
    const val = document.querySelector(`#${name}`).value;

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        `/parameter/${name}/${project_num}?value=${val}`,
        {headers: {'X-CSRFToken': csrftoken}}
    );

    fetch(request, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify({
            var1: parseFloat(v1),
            var2: parseFloat(v2),
            var3: parseFloat(v3),
        })
    })
    .then(response => response.json())
    .then(response => {
        if (response['errors']) {

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
            }

            //   throw new Error('Something went wrong');
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
                if (field === 'plungerFric') {
                    document.querySelector(`#${field}0`).classList.remove('is-valid');
                    document.querySelector(`#${field}0`).classList.add('is-invalid');
                    document.querySelector(`#${field}180`).classList.remove('is-valid');
                    document.querySelector(`#${field}180`).classList.add('is-invalid');
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = `${field_errors.join("")}`;
                
                } else if (field === 'FN') {
                    document.querySelector(`#${field}plus`).classList.remove('is-valid');
                    document.querySelector(`#${field}plus`).classList.add('is-invalid');
                    document.querySelector(`#${field}minus`).classList.remove('is-valid');
                    document.querySelector(`#${field}minus`).classList.add('is-invalid');
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = `${field_errors.join("")}`;

                } else {
                    document.querySelector(`#${field}`).classList.remove('is-valid');
                    document.querySelector(`#${field}`).classList.add('is-invalid');
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = `${field_errors.join("")}`;
                }
            });
            fields[`${name}`].forEach((field) => {
                if (field === 'plungerFric') {
                    document.querySelector(`#${field}0`).classList.remove('is-invalid')
                    document.querySelector(`#${field}0`).classList.add('is-valid')
                    document.querySelector(`#${field}180`).classList.remove('is-invalid')
                    document.querySelector(`#${field}180`).classList.add('is-valid')
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''

                } else if (field === 'FN') {
                    document.querySelector(`#${field}plus`).classList.remove('is-invalid')
                    document.querySelector(`#${field}plus`).classList.add('is-valid')
                    document.querySelector(`#${field}minus`).classList.remove('is-invalid')
                    document.querySelector(`#${field}minus`).classList.add('is-valid')
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''

                } else {
                    document.querySelector(`#${field}`).classList.remove('is-invalid')
                    document.querySelector(`#${field}`).classList.add('is-valid')
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                }
            })

        } else if (response.message) {
            console.log(`message: ${response['message']}`)

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
            }
            FIELDS[`${name}`].forEach((field) => {
                if (field === 'plungerFric') {
                    document.querySelector(`#${field}0`).classList.remove('is-invalid')
                    document.querySelector(`#${field}0`).classList.add('is-valid')
                    document.querySelector(`#${field}180`).classList.remove('is-invalid')
                    document.querySelector(`#${field}180`).classList.add('is-valid')

                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''

                } else if (field === 'FN') {
                    document.querySelector(`#${field}plus`).classList.remove('is-invalid')
                    document.querySelector(`#${field}plus`).classList.add('is-valid')
                    document.querySelector(`#${field}minus`).classList.remove('is-invalid')
                    document.querySelector(`#${field}minus`).classList.add('is-valid')
                    
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                    
                } else {
                    document.querySelector(`#${field}`).classList.remove('is-invalid')
                    document.querySelector(`#${field}`).classList.add('is-valid')
                    document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                }            })

            setTimeout(() => {
                FIELDS[`${name}`].forEach((field) => {
                    if (field === 'plungerFric') {
                        document.querySelector(`#${field}0`).classList.remove('is-invalid')
                        document.querySelector(`#${field}0`).classList.remove('is-valid')
                        document.querySelector(`#${field}180`).classList.remove('is-invalid')
                        document.querySelector(`#${field}180`).classList.remove('is-valid')

                        document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
    
                    } else if (field === 'FN') {
                        document.querySelector(`#${field}plus`).classList.remove('is-invalid')
                        document.querySelector(`#${field}plus`).classList.remove('is-valid')
                        document.querySelector(`#${field}minus`).classList.remove('is-invalid')
                        document.querySelector(`#${field}minus`).classList.remove('is-valid')

                        document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                        
                    } else {
                        document.querySelector(`#${field}`).classList.remove('is-invalid')
                        document.querySelector(`#${field}`).classList.remove('is-valid')
                        document.querySelector(`#${field}_invalid-tooltip`).innerHTML = ''
                    }                })
            }, 3000)

        } else if (response.disclaimer) {
            alert(response.disclaimer)
        }
    })
    .catch(error => {
        console.log(error)
    })
}
