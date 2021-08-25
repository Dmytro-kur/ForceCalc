document.addEventListener('DOMContentLoaded', function() {
  
    window.onpopstate = function(event) {

        let page = event.state.page

        if (page !== 'compose') {
          document.querySelector('#inbox-view').style.display = 'none';
          document.querySelector('#compose-view').style.display = 'none';
          document.querySelector('#sent-view').style.display = 'none';
          document.querySelector('#archived-view').style.display = 'none';
  
          document.querySelector(`#${page}-view`).style.display = 'flex';
          document.querySelector(`#${page}-email-list`).style.display = 'flex';
          
          if (document.querySelector(`#${page}-email-list`).children.length === 0) {
            document.querySelector(`#${page}-email-list`).appendChild(document.querySelector('#myQuery'))
          }
      
          document.querySelector(`#${page}-email-render`).style.display = 'none';
          items_retrieve('', 1, `${page}`)
          
          unread_emails();
        } else if (page === 'compose') {
          
          document.querySelector('#inbox-view').style.display = 'none';
          document.querySelector('#compose-view').style.display = 'flex';
          document.querySelector('#sent-view').style.display = 'none';
          document.querySelector('#archived-view').style.display = 'none';
          
          unread_emails();
          submit_compose_form();
      
        }
    }
    
  // Inbox View
  document.querySelector('#wave-btn__inbox').addEventListener('click', (event) => {
    waves('#wave-btn__inbox', '#wave__inbox', 250, event, 'sidebar');

    document.querySelector('#myQueryInput').value = '';
    history.pushState({page: 'inbox'}, "", "/mail/inbox");

    document.querySelector('#inbox-view').style.display = 'flex';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';

    if (document.querySelector('#inbox-email-list').children.length === 0) {
      document.querySelector('#inbox-email-list').appendChild(document.querySelector('#myQuery'))
    }

    document.querySelector('#inbox-email-list').style.display = 'flex';
    document.querySelector('#inbox-email-render').style.display = 'none';

    items_retrieve('', 1, 'inbox')
    unread_emails();
  });
  // Compose View
  document.querySelector('#wave-btn__compose').addEventListener('click', (event) => {
    waves('#wave-btn__compose', '#wave__compose', 250, event, 'sidebar');

    history.pushState({page: 'compose'}, "", "/mail/compose");

    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'flex';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'none';

    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
    
    unread_emails();
    submit_compose_form();
  });
  // Sent View
  document.querySelector('#wave-btn__sent').addEventListener('click', (event) => {
    waves('#wave-btn__sent', '#wave__sent', 250, event, 'sidebar');

    document.querySelector('#myQueryInput').value = '';
    history.pushState({page: 'sent'}, "", "/mail/sent");

    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'flex';
    document.querySelector('#archived-view').style.display = 'none';

    if (document.querySelector('#sent-email-list').children.length === 0) {
      document.querySelector('#sent-email-list').appendChild(document.querySelector('#myQuery'))
    }

    document.querySelector('#sent-email-list').style.display = 'flex';
    document.querySelector('#sent-email-render').style.display = 'none';
    
    items_retrieve('', 1, 'sent')
    unread_emails();
  });
  // Archived View
  document.querySelector('#wave-btn__archived').addEventListener('click', (event) => {
    waves('#wave-btn__archived', '#wave__archived', 250, event, 'sidebar');

    document.querySelector('#myQueryInput').value = '';
    history.pushState({page: 'archived'}, "", "/mail/archived");

    document.querySelector('#inbox-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#sent-view').style.display = 'none';
    document.querySelector('#archived-view').style.display = 'flex';

    if (document.querySelector('#archived-email-list').children.length === 0) {
      document.querySelector('#archived-email-list').appendChild(document.querySelector('#myQuery'))
    }

    document.querySelector('#archived-email-list').style.display = 'flex';
    document.querySelector('#archived-email-render').style.display = 'none';

    items_retrieve('', 1, 'archived')
    unread_emails();
  });

  history.pushState({page: 'inbox'}, "", "/mail/inbox");

  document.querySelector('#inbox-view').style.display = 'flex';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#sent-view').style.display = 'none';
  document.querySelector('#archived-view').style.display = 'none';

  unread_emails();
  items_retrieve('', 1, 'inbox')
});

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
    });
    return false;
  };
}

function unread_emails() {

  fetch('/unread')
  .then(response => response.json())
  .then(count => {
    
    if (count.count !== 0) {
      document.querySelector('#alert-circle').style.display = 'block';
    } else {
      document.querySelector('#alert-circle').style.display = 'none';
    }
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

      fetch(`/email/${mailbox}/${email.dataset.id}`)
      .then(response => response.json())
      .then(email => {
        unread_emails();
        render_email(email, mailbox);
      });

      if (mailbox !== 'sent') {
        fetch(request, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        })
      }
    }
  })
}

function render_email(email, mailbox) {

  document.querySelector(`#${mailbox}-email-list`).style.display = 'none';
  document.querySelector(`#${mailbox}-email-render`).style.display = 'flex';

  document.querySelector(`#${mailbox}-email-head`).innerHTML = 
    'From: '.bold() + `${email.user_objs.sender.email}` + '<br>' + 
    'To: '.bold() + `${Object.values(email.user_objs.recipients)}` + '<br>' + 
    'Subject: '.bold() + `${email.text.subject}` + '<br>' +
    'Timestamp: '.bold() + `${email.timestamp}` + '<br>';

  document.querySelector(`#${mailbox}-email-content`).value = email.text.body;
  
  if (mailbox === 'inbox' || mailbox === 'archived') {
    document.querySelector(`#${mailbox}-archived-button`).addEventListener('click', (event) => {
      
      let bool = true;
      if (event.target.innerText === 'Archived') {
        bool = true;
      } else if (event.target.innerText === 'Unarchived') {
        bool = false;
      }

      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const request = new Request(
        `/email/${mailbox}/${email.id}`,
          {headers: {'X-CSRFToken': csrftoken}}
      );
      fetch(request, {
        method: 'PUT',
        mode: 'same-origin',
        body: JSON.stringify({
            archived: bool
        })
      })
    });

    document.querySelector(`#${mailbox}-reply-button`).onclick = () => {
      
      document.querySelector('#inbox-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'flex';
      document.querySelector('#sent-view').style.display = 'none';
      document.querySelector('#archived-view').style.display = 'none';
      
      unread_emails();

      document.querySelector('#compose-recipients').value = email.user_objs.sender.email;

      if (email.text.subject.slice(0, 4) === 'Re: ') {
        document.querySelector('#compose-subject').value = email.text.subject;
      } else {
        document.querySelector('#compose-subject').value = `Re: ${email.text.subject}`;
      }

      document.querySelector('#compose-body').value = 
  `  

   -----------------------------------------------------------------------------
  At ${email.timestamp} ${email.user_objs.sender.email} wrote: 

  ${email.text.body}`;

      submit_compose_form();
    }
  }


}



