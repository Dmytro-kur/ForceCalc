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
    document.querySelector(".wave-btn").onclick = (event) => {

        const coords = getCoords(event.target);
        const center = {
            X: event.pageX - coords.left,
            Y: event.pageY - coords.top
        }
        const element = document.querySelector('.wave-btn__waves');

        document.querySelector('.wave-btn__waves').style.clipPath = `circle(0px at ${center.X}px ${center.Y}px)`;
        document.querySelector('.wave-btn__waves').style.left = `${event.pageX-200}px`;
        document.querySelector('.wave-btn__waves').style.top = `${event.pageY-200}px`;
        document.querySelector('.wave-btn__waves').style.animationPlayState = 'running';

        element.classList.remove("wave-btn__waves");
        void element.offsetWidth;
        element.classList.add("wave-btn__waves");

        return false;
    }

})