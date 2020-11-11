const profileButton = document.querySelector('.profile-button');
const arrow = document.querySelector('.arrow-down');
const main = document.querySelector('.main');
const menuItems = ['Your profile', 'Your tasks', 'Help', 'Settings', 'Sign out'];

function showMenu() {
    const menu = document.createElement('ul');

    main.append(menu);
    menu.classList.add('pull-down-menu');
    arrow.classList.add('arrow-up');

    for (i = 0; i <= menuItems.length - 1; i++) {
        const liElement = document.createElement('li');
        const hrElement = document.createElement('hr');

        liElement.classList.add('menu-item');
        hrElement.classList.add('menu-stroke');
        liElement.innerHTML = menuItems[i];
        menu.append(liElement);

        if (i % 2 !== 0) {
            menu.append(hrElement);
        }
    }
}

function hideMenu() {
    document.querySelector('.pull-down-menu').remove();
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
    const isClickInsideProfileButton = document.querySelector('.profile-button').contains(event.target);
    const isClickInsideMenu = document.querySelector('.pull-down-menu').contains(event.target);

    if (!isClickInsideProfileButton && !isClickInsideMenu) {
        hideMenu();
    } 
});
