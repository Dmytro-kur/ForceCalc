document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#homeTable').onchange = () => {
        fetch(`/projects/${post_id}`)
        .then(response => response.json())
        .then(like_obj => {
            return like_obj
        })
        .catch(error => {
            console.log('Error: ', error);
        });
        }



})