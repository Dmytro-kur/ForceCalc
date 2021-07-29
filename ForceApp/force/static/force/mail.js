document.addEventListener('DOMContentLoaded', function() {

  // Inbox View
  document.querySelector('#wave-btn__inbox').addEventListener('click', () => {
    document.querySelector('#inbox-view').style.display = 'flex';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';

    unread_emails();
  });
  // Compose View
  document.querySelector('#wave-btn__compose').addEventListener('click', () => {
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'flex';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';
    
    unread_emails();
    submit_compose_form();
  });
  // Sent View
  document.querySelector('#wave-btn__sent').addEventListener('click', () => {
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'flex';
    document.querySelector('#archived-view').style.display = 'none';

    unread_emails();
  });
  // Archived View
  document.querySelector('#wave-btn__archived').addEventListener('click', () => {
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'flex';

    unread_emails();
  });
  document.querySelector('#inbox-view').style.display = 'flex';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#sent-view').style.display = 'none';
  document.querySelector('#archived-view').style.display = 'none';

  unread_emails();
  load_mailbox('inbox');
});

function unread_emails() {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const request = new Request(
    '/mailbox/inbox',
      {headers: {'X-CSRFToken': csrftoken}}
  );
  fetch(request)
  .then(response => response.json())
  .then(emails => {
    let list = []
    emails.forEach(email => {
      if (email.read === false) {
        list.push(email)
      }
    })
    if (list.length !== 0) {
      document.querySelector('#alert-circle').style.display = 'block';
    } else {
      document.querySelector('#alert-circle').style.display = 'none';
    }
  });
}

function submit_compose_form() {
  document.querySelector("#compose-form").onsubmit = function () {

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
      '/compose',
        {headers: {'X-CSRFToken': csrftoken}}
    );
  
    fetch(request, {
      method: 'POST',
      mode: 'same-origin',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // load_mailbox('sent', false);
    });
    return false;
  };
}

function load_mailbox(mailbox) {

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const request = new Request(
    `/mailbox/${mailbox}`,
      {headers: {'X-CSRFToken': csrftoken}}
  );

  fetch(request)
  .then(response => response.json())
  .then(emails => {
      emails.forEach(email => {
        const element = document.createElement('div');
        element.className = 'email';
        element.dataset.id = email.id;
        if (email.read === true) {
          element.style.backgroundColor = "rgb(169, 169, 169, 0.3)";
        }
        element.innerHTML = 
        `<span id="email-span-1"><span id="email-span-2">from: </span>`+
        `<span>${email.sender} </span></span>`+

        `<div id="email-div-1">`+
        `<span id="email-span-3">subject: </span>`+
        `<span id="email-span-4">${email.subject} </span></div>`+

        `<span id="email-span-5"><span id="email-span-6">timestamp: </span>`+
        `<span>${email.timestamp}</span></span>`;
        
        document.querySelector(`#${mailbox}-view`)
        .querySelector('.email-list').append(element);
      });
      open_email(mailbox);
  });
}

function open_email(mailbox) {
  document.querySelectorAll(".email").forEach(email => {
    email.onclick = () => {

      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const request = new Request(
        `/email/${email.dataset.id}`,
          {headers: {'X-CSRFToken': csrftoken}}
      );

      fetch(request)
      .then(response => response.json())
      .then(email => {
        // render_email(email, mailbox);
      });

      fetch(request, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
        })
      });
    }
  });
}

function render_email(email, mailbox) {

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email').style.display = 'block';
  document.querySelector('#email').style.backgroundColor = "rgb(169, 169, 169, 0)";

  document.querySelector('#email-info').innerHTML = 
    'From: '.bold() + `${email.sender}` + '<br>' + 
    'To: '.bold() + `${email.recipients}` + '<br>' + 
    'Subject: '.bold() + `${email.subject}` + '<br>' +
    'Timestamp: '.bold() + `${email.timestamp}` + '<br>';

  document.querySelector('#email-content').value = email.body;

  if (mailbox !== 'sent') {
    if (email.archived === false) {
      archivations('Archive', email, true)
    } else {
      archivations('Unarchive', email, false)
    }
  }

  document.querySelector('#reply-button').onclick = () => {

    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#email').style.display = 'none';
    document.querySelector('#archiving').innerHTML = '';

    document.querySelector('#compose-recipients').value = email.sender;

    if (email.subject.slice(0, 4) === 'Re: ') {
      document.querySelector('#compose-subject').value = email.subject;
    } else {
      document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
    }

    document.querySelector('#compose-body').value = 
`

-----------------------------------
On ${email.timestamp} ${email.sender} wrote: 

${email.body}
`;

    submit_compose_form();
  }

}


// function archivations(archiving, email, stat) {

//   let Archive = document.createElement('button');
//   Archive.innerHTML = archiving;
//   Archive.className = 'btn btn-sm btn-outline-primary';
//   Archive.id = archiving;
//   document.querySelector('#archiving').innerHTML = '';
//   document.querySelector('#archiving').append(Archive);
//   document.querySelector(`#${archiving}`).addEventListener('click', () => {

//     const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
//     const request = new Request(
//       `/email/${email.id}`,
//         {headers: {'X-CSRFToken': csrftoken}}
//     );
//     fetch(request, {
//       method: 'PUT',
//       mode: 'same-origin',
//       body: JSON.stringify({
//           archived: stat
//       })
//     })
//     .then(() => {
//       load_mailbox('inbox', false);
//     });
//   });
// }



// function compose_email() {

//   // Show compose view and hide other views
//   document.querySelector('#emails-view').style.display = 'none';
//   document.querySelector('#compose-view').style.display = 'block';
//   document.querySelector('#email').style.display = 'none';
//   document.querySelector('#archiving').innerHTML = '';

//   // Clear out composition fields
//   document.querySelector('#compose-recipients').value = '';
//   document.querySelector('#compose-subject').value = '';
//   document.querySelector('#compose-body').value = '';

// }


