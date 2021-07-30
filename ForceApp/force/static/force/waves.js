function getCoords(elem) {

    let box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

function waves(button, wave, half_radius, event, part) {
    

    const coords = getCoords(document.querySelector(button));
    const center = {
        X: event.pageX - coords.left,
        Y: event.pageY - coords.top
    }
    const element = document.querySelector(wave);

    element.style.clipPath = `circle(0px at ${center.X}px ${center.Y}px)`;
    element.style.left = `${event.pageX-half_radius}px`;
    element.style.top = `${event.pageY-half_radius}px`;
    element.style.animationPlayState = 'running';

    if (part === 'sidebar') {
        element.classList.remove('waves__sidebar');
        void element.offsetWidth;
        element.classList.add('waves__sidebar');
    } else if (part === 'header') {
        element.classList.remove(wave.slice(1));
        void element.offsetWidth;
        element.classList.add(wave.slice(1));
    }
}

function is_clicked(class_name, event) {
    let classList = document.querySelectorAll(class_name);
    let class_counter = 0;

    for (let i = 0; i < classList.length; i++) {
        if (event.target === classList[i]) {
            class_counter++;
        }
    }

    if (class_counter === 0) {
        return false
    } else if (class_counter > 0) {
        return true
    }
}

function unread_emails() {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
      '/unread',
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request)
    .then(response => response.json())
    .then(count => {
      
      if (count.count !== 0) {
        document.querySelector('#alert-circle').style.display = 'block';
      } else {
        document.querySelector('#alert-circle').style.display = 'none';
      }
    });
  }