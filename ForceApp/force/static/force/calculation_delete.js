function delete_data(select, name) {

    const project_num = window.location.pathname.slice(13)
    const val = document.querySelector(`#${name}`).value;

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        `/parameter/${name}/${project_num}?value=${val}`,
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'DELETE',
        mode: 'same-origin',
    })
    .then(response => response.json())
    .then(result => {
        select.remove(select.selectedIndex)
        alert(result.message)
    })
    .catch(error => {
        console.log(error)
    })

}

function del() {
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