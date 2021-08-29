document.addEventListener('DOMContentLoaded', () => {
  
  if (document.querySelector("#wave-btn")) {
    document.querySelector("#wave-btn").onclick = (event) => {

      waves("#wave-btn", '.wave-btn__waves', 200, event, 'header');
      if (document.querySelector('#user-menu').style.display === 'flex') {
        document.querySelector('#user-menu').style.display = 'none';
      } else if (document.querySelector('#user-menu').style.display === 'none') {
        
        document.querySelector('#user-menu').style.display = 'flex';
        document.querySelector('#user-menu').style.top = `${25}px`;
  
        const coords = getCoords(document.querySelector('#user-menu'));
        const elementWidth = coords.right - coords.left;
  
        if (window.innerWidth - elementWidth < 0) {
          document.querySelector('#user-menu').style.right = `${200}px`;
        } else {
          document.querySelector('#user-menu').style.right = `${elementWidth}px`;
        }
        
  
        document.querySelector('.change_pwd_logo_wave').style.animationPlayState = 'paused';
        document.querySelector('.logout_logo_wave').style.animationPlayState = 'paused';
      }
    }
  
  }

  if (document.querySelector("#login-btn")) {
    document.querySelector("#login-btn").addEventListener('click', event => {
      console.log('login click')
      waves("#login-btn", ".login-btn__wave", 200, event, 'header');

      setInterval(() => {
        window.location.pathname = '/login';
      }, 70);
      
    });
  }

  if (document.querySelector("#register-btn")) {
    document.querySelector("#register-btn").onclick = (event) => {
      console.log('register click')
      waves("#register-btn", '.register-btn__wave', 200, event, 'header');
      setInterval(() => {
        window.location.pathname = '/register';
      }, 70);
    }
  }



  if (document.querySelector('.change_pwd_logo')) {
    document.querySelector('.change_pwd_logo').addEventListener('click', (e) => {
      waves('.change_pwd_logo', '.change_pwd_logo_wave', 250, e, 'header');
    })
  }

  if (document.querySelector('.logout_logo')) {
    document.querySelector('.logout_logo').addEventListener('click', (e) => {
      waves('.logout_logo', '.logout_logo_wave', 250, e, 'header');
    })
  }

  if (document.querySelector('#user-menu')) {
    document.querySelector('body').addEventListener('click', (e) => {
      if (!is_clicked(".user-menu", e) && !is_clicked(".wave-btn", e)) {
        document.querySelector('#user-menu').style.display = 'none';
      }
    })
  }




})