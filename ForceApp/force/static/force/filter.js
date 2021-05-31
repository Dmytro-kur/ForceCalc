document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#myQuery').onchange = () => {
        var query
        if (document.querySelector('#myQuery').value === "") {
            query = "all"
        } else {
            query = document.querySelector('#myQuery').value
        }
        const start = 0
        const end = 10
        document.querySelectorAll('.table_content')
        .forEach(el => {
            el.remove()
        })
        fetch(`/projects/${query}?start=${start}&end=${end}`)
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const new_tr = document.createElement('tr');
                const date_td = document.createElement('td');
                const num_td = document.createElement('td');
                const name_td = document.createElement('td');
                const ass_td = document.createElement('td');
                const user_td = document.createElement('td');

                new_tr.className = "table_content";
                date_td.innerHTML = `${project.datetime}`;
                num_td.innerHTML = `${project.project_number}`;
                name_td.innerHTML = `${project.project_name}`;
                ass_td.innerHTML = `${project.assembly_number}`;
                user_td.innerHTML = `${project.user.username} (${project.user.email})`;

                new_tr.append(date_td);
                new_tr.append(num_td);
                new_tr.append(name_td);
                new_tr.append(ass_td);
                new_tr.append(user_td);

                document.querySelector('#homeTable').append(new_tr);
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    document.querySelectorAll('.table_content')
    .forEach(row => {
        row.onclick = () => {
            window.location.pathname = "/calculation"
        }
    })

})