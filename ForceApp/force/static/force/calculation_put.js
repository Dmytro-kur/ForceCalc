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

            //   throw new Error('Something went wrong');
            const source = response['errors']
            const errors = Object.keys(response['errors']);
            let error_list= []

            errors.forEach((field, index) => {
                error_list.push(`${field} error: ${source[field]}\n`);
            });
            alert(error_list.join(""))

        } else {
            console.log(response['message'])
        }
    })
    .catch(error => {
        console.log(error)
    })
}
