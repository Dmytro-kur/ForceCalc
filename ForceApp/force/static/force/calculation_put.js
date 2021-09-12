function change_data(id, item) {

    let v1 = document.querySelector(`input#${var1}`).value;
    let v2 = document.querySelector(`input#${var2}`).value;
    let v3 = document.querySelector(`input#${var3}`).value;

    const project_num = window.location.pathname.slice(13)
    const option_num = document.querySelector(id).value;

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        `/parameter/${item}/${project_num}?num=${option_num}`,
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

            console.log(result.error)
        } else {

            console.log(result.message)
        }
    })
}
