document.addEventListener('DOMContentLoaded', function() {
  
    window.onpopstate = function(event) {

        let page = event.state.page

        if (page !== 'compose') {

          shutOff_views();
          document.querySelector(`#${page}-view`).style.display = 'flex';
          shutOff_elements();
          document.querySelector(`#${page}-email-list`).style.display = 'flex';
          
          if (document.querySelector(`#${page}-email-list`).children.length === 0) {
            document.querySelector(`#${page}-email-list`).appendChild(document.querySelector('#myQuery'))
          }
      
          items_retrieve('', 1, `${page}`)
          
          unread_emails();
        } else if (page === 'compose') {

          shutOff_views();
          shutOff_elements();
          document.querySelector('#compose-view').style.display = 'flex';
          document.querySelector('#compose-form').style.display = 'flex';
          
          unread_emails();
          submit_compose_form();
      
        }
    }
    
  // Inbox View
  document.querySelector('#wave-btn__inbox').addEventListener('click', (event) => {
    waves('#wave-btn__inbox', '#wave__inbox', 250, event, 'sidebar');

    document.querySelector('#myQueryInput').value = '';
    history.pushState({page: 'inbox'}, "", "/mail/inbox");
    
    shutOff_views();
    document.querySelector('#inbox-view').style.display = 'flex';

    if (document.querySelector('#inbox-email-list').children.length === 0) {
      document.querySelector('#inbox-email-list').appendChild(document.querySelector('#myQuery'))
    }

    shutOff_elements();
    document.querySelector('#inbox-email-list').style.display = 'flex';

    items_retrieve('', 1, 'inbox')
    unread_emails();
  });
  // Compose View
  document.querySelector('#wave-btn__compose').addEventListener('click', (event) => {
    waves('#wave-btn__compose', '#wave__compose', 250, event, 'sidebar');

    history.pushState({page: 'compose'}, "", "/mail/compose");
    
    shutOff_views();
    shutOff_elements();
    document.querySelector('#compose-view').style.display = 'flex';
    document.querySelector('#compose-form').style.display = 'flex';

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

    shutOff_views();
    document.querySelector('#sent-view').style.display = 'flex';

    if (document.querySelector('#sent-email-list').children.length === 0) {
      document.querySelector('#sent-email-list').appendChild(document.querySelector('#myQuery'))
    }

    shutOff_elements();
    document.querySelector('#sent-email-list').style.display = 'flex';
    
    items_retrieve('', 1, 'sent')
    unread_emails();
  });
  // Archived View
  document.querySelector('#wave-btn__archived').addEventListener('click', (event) => {
    waves('#wave-btn__archived', '#wave__archived', 250, event, 'sidebar');

    document.querySelector('#myQueryInput').value = '';
    history.pushState({page: 'archived'}, "", "/mail/archived");
    
    shutOff_views();
    document.querySelector('#archived-view').style.display = 'flex';

    if (document.querySelector('#archived-email-list').children.length === 0) {
      document.querySelector('#archived-email-list').appendChild(document.querySelector('#myQuery'))
    }

    shutOff_elements();
    document.querySelector('#archived-email-list').style.display = 'flex';

    items_retrieve('', 1, 'archived')
    unread_emails();
  });

  history.pushState({page: 'inbox'}, "", "/mail/inbox");

  shutOff_views();
  document.querySelector('#inbox-view').style.display = 'flex';

  unread_emails();
  items_retrieve('', 1, 'inbox')
});
function shutOff_elements() {
  document.querySelector('#inbox-email-list').style.display = 'none';
  document.querySelector('#inbox-email-render').style.display = 'none';
  document.querySelector('#sent-email-list').style.display = 'none';
  document.querySelector('#sent-email-render').style.display = 'none';
  document.querySelector('#archived-email-list').style.display = 'none';
  document.querySelector('#archived-email-render').style.display = 'none';
  document.querySelector('#compose-form').style.display = 'none';
}
function shutOff_views() {
  document.querySelector('#inbox-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#sent-view').style.display = 'none';
  document.querySelector('#archived-view').style.display = 'none';
}
function shutOff_archived() {
  document.querySelector('#inbox-archived-button').style.display = 'none';
  document.querySelector('#archived-archived-button').style.display = 'none';
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
        alert(result.message);
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

        if (mailbox !== 'sent' && !email.read) {
          fetch(request, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          })
          .then(response => response.json())
          .then(result => {
            unread_emails();
            alert(result.message)
          })
        }

      });
    }
  })
}

function render_email(email, mailbox) {

  shutOff_elements();
  shutOff_archived();
  shutOff_views();
  console.log(email)
  document.querySelector(`#${mailbox}-view`).style.display = 'flex';
  document.querySelector(`#${mailbox}-email-render`).style.display = 'flex';
  document.querySelector(`#${mailbox}-archived-button`).style.display = 'inline-block';
  document.querySelector(`#${mailbox}-email-head`).innerHTML = 
    'From: '.bold() + `${email.user_objs.sender.email}` + '<br>' + 
    'To: '.bold() + `${Object.values(email.user_objs.recipients)}` + '<br>' + 
    'Subject: '.bold() + `${email.text.subject}` + '<br>' +
    'Timestamp: '.bold() + `${email.timestamp}` + '<br>';
  document.querySelector(`#${mailbox}-email-content`).value = email.text.body;

  if (!email.archived) {
    document.querySelector(`#${mailbox}-archived-button`).innerText = 'Archive';
  } else if (email.archived) {
    document.querySelector(`#${mailbox}-archived-button`).innerText = 'Unarchive';
  }

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
            archived: !email.archived
        })
      })
      .then(response => response.json())
      .then(result => {
        unread_emails();
        alert(result.message)

      })
    });

    document.querySelector(`#${mailbox}-reply-button`).onclick = () => {
      
      shutOff_views();
      shutOff_elements();
      document.querySelector('#compose-view').style.display = 'flex';
      document.querySelector('#compose-form').style.display = 'flex';
      
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



