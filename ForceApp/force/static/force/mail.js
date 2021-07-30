document.addEventListener('DOMContentLoaded', function() {


  
  // Inbox View
  document.querySelector('#wave-btn__inbox').addEventListener('click', (event) => {
    waves('#wave-btn__inbox', '#wave__inbox', 300, event, 'sidebar');

    document.querySelector('#inbox-view').style.display = 'flex';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';

    document.querySelector('#inbox-email-list').style.display = 'flex';
    document.querySelector('#inbox-email-render').style.display = 'none';

    load_mailbox('inbox');
    unread_emails();
  });
  // Compose View
  document.querySelector('#wave-btn__compose').addEventListener('click', (event) => {
    waves('#wave-btn__compose', '#wave__compose', 300, event, 'sidebar');

    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'flex';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';
    
    unread_emails();
    submit_compose_form();
  });
  // Sent View
  document.querySelector('#wave-btn__sent').addEventListener('click', (event) => {
    waves('#wave-btn__sent', '#wave__sent', 300, event, 'sidebar');

    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'flex';
    document.querySelector('#archived-view').style.display = 'none';

    load_mailbox('sent');
    unread_emails();
  });
  // Archived View
  document.querySelector('#wave-btn__archived').addEventListener('click', (event) => {
    waves('#wave-btn__archived', '#wave__archived', 300, event, 'sidebar');
    
    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'flex';

    load_mailbox('archived');
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

      document.querySelector(`#${mailbox}-view`)
      .querySelector(`#${mailbox}-email-list`).innerHTML = '';

      emails.forEach(email => {
        const element = document.createElement('div');
        element.className = 'email';
        element.dataset.id = email.id;
        element.innerHTML = `from: ${email.sender}, subject: ${email.subject}, timestamp: ${email.timestamp}`;
        
        document.querySelector(`#${mailbox}-view`)
        .querySelector(`#${mailbox}-email-list`).append(element);
      });
      open_email(mailbox);
  });
}

function open_email(mailbox) {
  document.querySelectorAll(".email").forEach(email => {
    email.onclick = () => {
    
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const request = new Request(
        `/email/${mailbox}/${email.dataset.id}`,
          {headers: {'X-CSRFToken': csrftoken}}
      );

      fetch(request)
      .then(response => response.json())
      .then(email => {
        render_email(email, mailbox);
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

  document.querySelector(`#${mailbox}-email-list`).style.display = 'none';
  document.querySelector(`#${mailbox}-email-render`).style.display = 'flex';

  document.querySelector(`#${mailbox}-email-head`).innerHTML = 
    'From: '.bold() + `${email.sender}` + '<br>' + 
    'To: '.bold() + `${email.recipients}` + '<br>' + 
    'Subject: '.bold() + `${email.subject}` + '<br>' +
    'Timestamp: '.bold() + `${email.timestamp}` + '<br>';

  document.querySelector(`#${mailbox}-email-content`).value = email.body;
  
  if (mailbox === 'inbox' || mailbox === 'archived') {
    document.querySelector(`#${mailbox}-archived-button`).addEventListener('click', () => {

      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const request = new Request(
        `/email/${mailbox}/${email.id}`,
          {headers: {'X-CSRFToken': csrftoken}}
      );
      fetch(request, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify({
            archived: true
        })
      })
    });

    document.querySelector(`#${mailbox}-reply-button`).onclick = () => {

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
  At ${email.timestamp} ${email.sender} wrote: 

  ${email.body}
  `;

      submit_compose_form();
    }
  }


}



