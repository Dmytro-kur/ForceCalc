// get document coordinates of the element
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector("#wave-btn").onclick = (event) => {
    
    const coords = getCoords(document.querySelector("#wave-btn"));
    const center = {
        X: event.pageX - coords.left,
        Y: event.pageY - coords.top
    }
    const element = document.querySelector('.wave-btn__waves');

    element.style.clipPath = `circle(0px at ${center.X}px ${center.Y}px)`;
    element.style.left = `${event.pageX-200}px`;
    element.style.top = `${event.pageY-200}px`;
    element.style.animationPlayState = 'running';

    element.classList.remove("wave-btn__waves");
    void element.offsetWidth;
    element.classList.add("wave-btn__waves");

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
    
    const coords = getCoords(document.querySelector(".change_pwd_logo"));
    const center = {
      X: e.pageX - coords.left,
      Y: e.pageY - coords.top
    }
    const element = document.querySelector('.change_pwd_logo_wave');

    element.style.clipPath = `circle(0px at ${center.X}px ${center.Y}px)`;
    element.style.left = `${e.pageX-300}px`;
    element.style.top = `${e.pageY-300}px`;
    element.style.animationPlayState = 'running';

    element.classList.remove("change_pwd_logo_wave");
    void element.offsetWidth;
    element.classList.add("change_pwd_logo_wave");

  })

  document.querySelector('.logout_logo').addEventListener('click', (e) => {
    
    const coords = getCoords(document.querySelector(".logout_logo"));
    const center = {
      X: e.pageX - coords.left,
      Y: e.pageY - coords.top
    }
    const element = document.querySelector('.logout_logo_wave');

    element.style.clipPath = `circle(0px at ${center.X}px ${center.Y}px)`;
    element.style.left = `${e.pageX-300}px`;
    element.style.top = `${e.pageY-300}px`;
    element.style.animationPlayState = 'running';

    element.classList.remove("logout_logo_wave");
    void element.offsetWidth;
    element.classList.add("logout_logo_wave");

  })

  document.querySelector('body').addEventListener('click', (e) => {

    let menuNodeList = document.querySelectorAll(".user-menu");
    let wave_btn_nodeList = document.querySelectorAll(".wave-btn");
    let menu_counter = 0;
    let wave_btn_counter = 0;

    for (let i = 0; i < menuNodeList.length; i++) {
      if (e.target === menuNodeList[i]) {
        menu_counter++;
      }
    }
    for (let i = 0; i < wave_btn_nodeList.length; i++) {
      if (e.target === wave_btn_nodeList[i]) {
        wave_btn_counter++;
      }
    }
    if (menu_counter === 0 && wave_btn_counter === 0) {
      document.querySelector('#user-menu').style.display = 'none';
    }

  })



})