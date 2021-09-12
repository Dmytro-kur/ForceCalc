function par(event){
    const val = event.target.value
    const path = window.location.pathname.slice(13)

    if (val !== '0') {
        document.querySelector(`#edit_${item}_btn`).style.display = 'block';
        document.querySelector(`#delete_${item}_btn`).style.display = 'block';
    } else if (val === '0') {
        document.querySelector(`#edit_${item}_btn`).style.display = 'none';
        document.querySelector(`#delete_${item}_btn`).style.display = 'none';
    }

    fetch(`/parameter/${item}/${path}?num=${val}`)
    .then(response => response.json())
    .then(result => {
        document.querySelector(`input#${var1}`).value = result.var1;
        document.querySelector(`input#${var2}`).value = result.var2;
        document.querySelector(`input#${var3}`).value = result.var3;
    })
    .catch(err => {
        console.log(err)
    })

}

function check(event) {
    
    if (event.target.value !== "0") {
        const val = event.target.value;
        const path = window.location.pathname.slice(13);
    
        fetch(`/check/${path}/${val}`)
        .then(response => response.json())
        .then(result => {
            if (result.agree === true) {
                console.log(result)
                document.querySelector('#agree').style.display = 'block';
                document.querySelector('#discard').style.display = 'none';
        
            } else if (result.agree === false) {
                console.log(result)
                document.querySelector('#agree').style.display = 'none';
                document.querySelector('#discard').style.display = 'block';
            }
        })
    }
}

function calculate() {
    
    // select changes -------------------------------------------------------------------------------->
    document.querySelector('#variables').addEventListener('change', (event) => {
        
        check(event);
        const val = event.target.value
        const path = window.location.pathname.slice(13)

        if (val !== '0') {
            document.querySelector(`#delete_variables_btn`).style.display = 'block';
                        
            fetch(`/result/${path}/${val}`)
            .then(response => response.json())
            .then(result => {

                document.querySelector('input#id_Na').value = result.var1;
                document.querySelector('input#id_Nb').value = result.var2;
                document.querySelector('input#id_NR').value = result.var3;

                document.querySelector('#angles').value = result.angles.id;
                document.querySelector('input#plungerFric').value = result.angles.var1;
                document.querySelector('input#N').value = result.angles.var2;
                document.querySelector('input#FN').value = result.angles.var3;

                document.querySelector('#springs').value = result.spring.id;
                document.querySelector('input#springStiff').value = result.spring.var1;
                document.querySelector('input#freeLen').value = result.spring.var2;
                document.querySelector('input#springLen').value = result.spring.var3;
                
                document.querySelector('#plungers').value = result.plunger.id;
                document.querySelector('input#a').value = result.plunger.var1;
                document.querySelector('input#b').value = result.plunger.var2;
                document.querySelector('input#f').value = result.plunger.var3;

                document.querySelector('#contacts').value = result.contact.id;
                document.querySelector('input#mu').value = result.contact.var1;
                document.querySelector('input#contactCoord_X').value = result.contact.var2;
                document.querySelector('input#contactCoord_Y').value = result.contact.var3;
            
                document.querySelector('#delete_contact_btn').style.display = 'block';
                document.querySelector('#delete_plunger_btn').style.display = 'block';
                document.querySelector('#delete_spring_btn').style.display = 'block';
                document.querySelector('#delete_angles_btn').style.display = 'block';
                
                document.querySelector('#edit_contact_btn').style.display = 'block';
                document.querySelector('#edit_plunger_btn').style.display = 'block';
                document.querySelector('#edit_spring_btn').style.display = 'block';
                document.querySelector('#edit_angles_btn').style.display = 'block';
                document.querySelector('#id_variables_key').value = '';
            })
            .catch(err => {
                console.log(err)
            })
        } else if (val === '0') {

            document.querySelector('input#id_Na').value = '';
            document.querySelector('input#id_Nb').value = '';
            document.querySelector('input#id_NR').value = '';
            document.querySelector('#agree').style.display = 'none';
            document.querySelector('#discard').style.display = 'none';
            document.querySelector('#delete_variables_btn').style.display = 'none';
            
            document.querySelector('#id_variables_key').value = '';
        }
    })
}
