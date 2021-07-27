function projects_retrieve(query, page) {
    if (query === "") {
        query = "all"
    }
    fetch(`/projects/${query}?page=${page}`)
    .then(response => response.json())
    .then(projects => {        
        projects.slice(1).forEach(project => {
            const new_tr = document.createElement('tr');
            const date_td = document.createElement('td');
            const num_td = document.createElement('td');
            const name_td = document.createElement('td');
            const ass_td = document.createElement('td');
            const user_td = document.createElement('td');

            new_tr.className = "table_content";
            new_tr.dataset.id = project.id;

            date_td.innerHTML = project.datetime;
            num_td.innerHTML = project.project_number;
            name_td.innerHTML = project.project_name;
            ass_td.innerHTML = project.assembly_number;
            user_td.innerHTML = `${project.user.username} (${project.user.email})`;

            new_tr.append(date_td);
            new_tr.append(num_td);
            new_tr.append(name_td);
            new_tr.append(ass_td);
            new_tr.append(user_td);

            document.querySelector('#homeTable').append(new_tr);
            link_calc();
        })
    })
    .catch(error => {
        console.log(error);
    });
}

function remove_list() {
    document.querySelectorAll('.table_content')
    .forEach(el => {
        el.remove()
    });
}

function projects_count(query, page) {
    if (query === "") {
        query = "all"
    }
    return fetch(`/projects/${query}?page=${page}`)
    .then(response => response.json())
    .then(projects => {
        return projects.slice(0,1)[0].projects_count
    })
    .catch(error => {
        console.log('Error: ', error);
    });
}

function link_calc() {
    document.querySelectorAll('.table_content')
    .forEach(row => {
        row.onclick = () => {
            window.location.pathname = `/calculation/${row.dataset.id}`
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {

    link_calc();
    if (document.querySelector('#post_new_project')) {
        document.querySelector('#post_new_project').onclick = () => {
        
            let project_number = document.querySelector('#id_project_number').value;
            let project_name = document.querySelector('#id_project_name').value;
            let assembly_number = document.querySelector('#id_assembly_number').value;

            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const request = new Request(
                '/new_project',
                {headers: {'X-CSRFToken': csrftoken}}
            );

            fetch(request, {
                method: 'POST',
                mode: 'same-origin',
                body: JSON.stringify({
                    project_number: project_number,
                    project_name: project_name,
                    assembly_number: assembly_number,
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    alert(result.error)
                } else {
                    console.log(result)
                }
                remove_list();
            })
            .then(() => {
                projects_retrieve("", 1);
            })
        }
    }

    document.querySelector('#wave-btn__newProject')
    .addEventListener('click', (e) => {
        waves('#wave-btn__newProject', '#wave__newProject', 300, e, 'sidebar');

        let box = document.querySelector('#expanded_box__newProject');

        if (box.dataset.state === 'closed') {
            // box.style.animationPlayState = 'running';
            // box.style.visibility = 'visible';
            // box.style.animationDirection ="normal";
            box.style.animation = '0.2s ease forwards running expand';
            box.dataset.state = 'expanded';
            
            document.querySelector('#wave-btn__newProject')
            .querySelector('.expand__sidebar')
            .style.animation = '0.2s ease forwards running arrow-rotate-downwards';
        }
        else if (box.dataset.state === 'expanded') {
            // box.style.animationPlayState = 'running';
            // box.style.visibility = 'hidden';
            // box.style.animationDirection ="reverse";
            box.style.animation = '0.2s ease forwards running closed';
            box.dataset.state = 'closed';

            document.querySelector('#wave-btn__newProject')
            .querySelector('.expand__sidebar')
            .style.animation = '0.2s ease forwards running arrow-rotate-upwards';
        }
    })

})