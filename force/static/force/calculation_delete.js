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
    .then(response => {
        if (response.message) {

            select.remove(select.selectedIndex)
            console.log(response.message)

        } else if (response.disclaimer) {
            alert(response.disclaimer)
        }
    })
    .catch(error => {
        console.log(error)
    })
}