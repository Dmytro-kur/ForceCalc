document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelector("#wave-btn").onclick = (event) => {

    waves("#wave-btn", '.wave-btn__waves', 200, event, 'header');
    if (document.querySelector('#user-menu').style.display === 'flex') {
      document.querySelector('#user-menu').style.display = 'none';
    } else if (document.querySelector('#user-menu').style.display === 'none') {
      document.querySelector('#user-menu').style.left = `${0}px`;
      document.querySelector('#user-menu').style.top = `${120}px`;
      document.querySelector('#user-menu').style.display = 'flex';
      document.querySelector('.change_pwd_logo_wave').style.animationPlayState = 'paused';
      document.querySelector('.logout_logo_wave').style.animationPlayState = 'paused';
    }
  }

  document.querySelector('.change_pwd_logo').addEventListener('click', (e) => {
    waves('.change_pwd_logo', '.change_pwd_logo_wave', 250, e, 'header');
  })

  document.querySelector('.logout_logo').addEventListener('click', (e) => {
    waves('.logout_logo', '.logout_logo_wave', 250, e, 'header');
  })

  document.querySelector('body').addEventListener('click', (e) => {

    if (!is_clicked(".user-menu", e) && !is_clicked(".wave-btn", e)) {
      document.querySelector('#user-menu').style.display = 'none';
    }

  })



})