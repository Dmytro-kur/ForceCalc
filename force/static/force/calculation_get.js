function parameter(event, name){

// val is a value of selected choice id number on server side
// name is a string, i.e. "contacts", "plunger" etc.

    const val = event.target.value;
    const project_num = window.location.pathname.slice(13);

    return fetch(`/parameter/${name}/${project_num}?value=${val}`)
    .then(response => response.json())
    .then(response => {
        if (response['disclaimer']) {
            alert(response['disclaimer'])
        }
        return response
    })
    .catch(error => {
        alert(error)
    })

}

function get_forces(
    mu, 
    contactCoord_X, 
    contactCoord_Y, 
    a,
    b,
    f,
    springStiff,
    freeLen,
    springLen,
    plungerFric,
    N,
    FN
    ) {
    
    return fetch(
        `/result?mu=${mu}&contactCoord_X=${contactCoord_X}&contactCoord_Y=${contactCoord_Y}&a=${a}&b=${b}&f=${f}&springStiff=${springStiff}&freeLen=${freeLen}&springLen=${springLen}&plungerFric=${plungerFric}&N=${N}&FN=${FN}`
        )
    .then(response => response.json())
    .then(response => {
        if (response['disclaimer']) {
            alert(response['disclaimer'])
        }
        return response
    })
    .catch(error => {
        alert(error)
    })

}