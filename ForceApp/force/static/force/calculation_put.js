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
            var1: v1,
            var2: v2,
            var3: v3,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            alert(result.error)
        } else {
            alert(result.message)
        }
    })
}
