const profileButton = document.querySelector('.profile-button');
const arrow = document.querySelector('.arrow-down');
const main = document.querySelector('.main');
const menu = document.createElement('ul');

const menuTextItems = ['Your profile', 'Your tasks', 'Help', 'Settings', 'Sign out'];

menuTextItems.forEach((element, index) => {
    const liElement = document.createElement('li');
    liElement.classList.add('menu-item');
    liElement.innerText = element;
    menu.appendChild(liElement);
    
    if (index % 2 !== 0) {
        hrElement = document.createElement('hr');
        hrElement.classList.add('menu-stroke');
        menu.appendChild(hrElement);
    }
});

menu.classList.add('pull-down-menu');

function showMenu() {
    main.append(menu);
    arrow.classList.add('arrow-up');
}

function hideMenu() {
    menu.remove();
    arrow.classList.remove('arrow-up');
}

profileButton.addEventListener('click', () => {
    if (arrow.classList.contains('arrow-up')) {
        hideMenu();
    } else {
        showMenu();
    }
});

document.addEventListener('click', (event) => {
    const isClickInsideProfileButton = profileButton.contains(event.target);
    const isClickInsideMenu = menu.contains(event.target);

    if (!isClickInsideProfileButton && !isClickInsideMenu) {
        hideMenu();
    } 
});
