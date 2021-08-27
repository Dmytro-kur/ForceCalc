function items_retrieve(query, page, mailbox) {
    
    if (query === "") {
        query = "all";
    }
    
    if (mailbox !== 'project') {

        return fetch(`/mailbox/${query}/${mailbox}?page=${page}`)
        .then(response => response.json())
        .then(emails => {

            remove_list();
            document.querySelector('#homeTable').querySelector('thead').innerHTML = 
            '<tr style="border-bottom: 0.5px solid lightskyblue;">'
            + '<th style="border-right: 0.5px solid lightskyblue;">Created</th>'
            + '<th style="border-right: 0.5px solid lightskyblue;">Subject</th>'
            + '<th style="border-right: 0.5px solid lightskyblue;">Body</th>'
            + '<th >Sender</th>'
            + '</tr>';
            document.querySelector("#pages").innerHTML = Math.ceil(emails[0].count/50);
            document.querySelector("#numbers").innerHTML = emails[0].count;
            searchComponentInstance.setState({pages: parseInt(document.querySelector('#pages').innerHTML)})

            emails.slice(1).forEach(email => {
                
                const new_tr = document.createElement('tr');
                const date_td = document.createElement('td');

                const sub_td = document.createElement('td');
                const body_td = document.createElement('td');

                const sen_td = document.createElement('td');
                const rec_td = document.createElement('td');

                new_tr.className = 'email';
                new_tr.dataset.id = email.id;
                
                if (email.read === false) {
                    new_tr.style.backgroundColor = "lightsteelblue";
                }

                date_td.innerHTML = `${email.timestamp}`;
                date_td.className = 'email-timestamp';

                sub_td.innerHTML = `${email.text.subject}`;
                sub_td.className = 'email-subject';
                body_td.innerHTML = `${email.text.body}`;
                body_td.className = 'email-body';

                sen_td.innerHTML = `${email.user_objs.sender.email}`;
                sen_td.className = 'email-sender';
                // rec_td.innerHTML = `recipients: ${Object.values(email.user_objs.recipients)}`;
                // rec_td.className = 'email-recipients';

                new_tr.append(date_td);
                new_tr.append(sub_td);
                new_tr.append(body_td);
                new_tr.append(sen_td);
                new_tr.append(rec_td);
                
                document.querySelector(`#${mailbox}-view`)
                .querySelector(`#${mailbox}-email-list`)
                .querySelector('#homeTable').querySelector('tbody').append(new_tr);
              
            });
            open_email(mailbox);
        });
      
    } else if (mailbox === 'project'){

        return fetch(`/projects/${query}?page=${page}`)
        .then(response => response.json())
        .then(projects => {

            remove_list();
            document.querySelector('#homeTable').querySelector('thead').innerHTML = 
            '<tr style="border-bottom: 0.5px solid lightskyblue;">'
            + '<th style="border-right: 0.5px solid lightskyblue;">Created</th>'
            + '<th style="border-right: 0.5px solid lightskyblue;">Project</th>'
            + '<th style="border-right: 0.5px solid lightskyblue;">Name</th>'
            + '<th style="border-right: 0.5px solid lightskyblue;">Number</th>'
            + '<th>Creator</th>'
            + '</tr>';
            document.querySelector("#pages").innerHTML = Math.ceil(projects[0].count/10);
            document.querySelector("#numbers").innerHTML = projects[0].count;
            searchComponentInstance.setState({pages: parseInt(document.querySelector('#pages').innerHTML)})

            projects.slice(1).forEach(project => {
                const new_tr = document.createElement('tr');
                const date_td = document.createElement('td');
                const num_td = document.createElement('td');
                const name_td = document.createElement('td');
                const ass_td = document.createElement('td');
                const user_td = document.createElement('td');
    
                new_tr.className = "table_content";
                new_tr.dataset.id = project.id;
    
                date_td.innerHTML = `${project.timestamp}`;
                date_td.className = 'project-timestamp';

                num_td.innerHTML = `${project.text.project_number}`;
                num_td.className = 'project-number';

                name_td.innerHTML = `${project.text.project_name}`;
                name_td.className = 'project-name';
                
                ass_td.innerHTML = `${project.text.assembly_number}`;
                ass_td.className = 'project-assembly';

                user_td.innerHTML = `${project.user_objs.user.username} (${project.user_objs.user.email})`;
                user_td.className = 'project-username';

                new_tr.append(date_td);
                new_tr.append(num_td);
                new_tr.append(name_td);
                new_tr.append(ass_td);
                new_tr.append(user_td);
    
                document.querySelector('#homeTable').querySelector('tbody').append(new_tr);
                link_calc();
            })
        })
        .catch(error => {
            console.log(error);
        });    
    }
}

function remove_list() {
    if (document.querySelector('#homeTable')) {
        document.querySelector('#homeTable').querySelector('tbody').innerHTML = '';
        document.querySelector('#homeTable').querySelector('thead').innerHTML = '';
    }
    
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

    history.pushState({page: 'project'}, "", "/");

    unread_emails();
    
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
                document.querySelector('#id_project_number').value = '';
                document.querySelector('#id_project_name').value = '';
                document.querySelector('#id_assembly_number').value = '';
            })
            .then(() => {
                items_retrieve("", 1, 'project');
            })
        }
    }
    if (document.querySelector('#wave-btn__newProject')) {
        document.querySelector('#wave-btn__newProject')
        .addEventListener('click', (e) => {
            waves('#wave-btn__newProject', '#wave__newProject', 250, e, 'sidebar');
    
            let box = document.querySelector('#expanded_box__newProject');
    
            if (box.dataset.state === 'closed') {
                box.style.animation = '70ms ease forwards running expand';
                box.dataset.state = 'expanded';
                
                document.querySelector('#wave-btn__newProject')
                .querySelector('.expand__sidebar')
                .style.animation = '70ms ease forwards running arrow-rotate-downwards';
            }
            else if (box.dataset.state === 'expanded') {
                box.style.animation = '70ms ease forwards running closed';
                box.dataset.state = 'closed';
    
                document.querySelector('#wave-btn__newProject')
                .querySelector('.expand__sidebar')
                .style.animation = '70ms ease forwards running arrow-rotate-upwards';
            }
        })
    }

})