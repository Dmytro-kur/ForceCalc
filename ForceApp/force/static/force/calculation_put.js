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
    .then(result => {
        if (result.error) {
            let errors = [];

            for (let i = 0; i < Object.keys(result.error).length; i++) {
                errors.push(err)
            }

            alert(errors)
        } else {
            alert(result.message)
        }
    })
}
