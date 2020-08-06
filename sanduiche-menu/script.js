let menu;

window.onload = () => {
    menu = document.querySelector('#menu');

    menu.addEventListener('click', () => {
        let list = document.querySelector("#lista");
        if (list.style.display === 'block') 
            list.style.display = 'none';
        else list.style.display = 'block';
    });
    


}