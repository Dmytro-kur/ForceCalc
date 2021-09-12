function delete_data(id, item, v1, v2, v3) {

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