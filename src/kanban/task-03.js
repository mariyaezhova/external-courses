const profileButton = document.querySelector('.profile-button');
const arrow = document.querySelector('.arrow-down');
const main = document.querySelector('.main');
const menu = document.createElement('ul');

const liElement1 = document.createElement('li');
const liElement2 = document.createElement('li');
const liElement3 = document.createElement('li');
const liElement4 = document.createElement('li');
const liElement5 = document.createElement('li');

const hrElement1 = document.createElement('hr');
const hrElement2 = document.createElement('hr');

liElement1.innerText = 'Your profile';
liElement2.innerText = 'Your tasks';
liElement3.innerText = 'Help';
liElement4.innerText = 'Settings';
liElement5.innerText = 'Sign out';

[liElement1, liElement2, liElement3, liElement4, liElement5].forEach((element) => element.classList.add('menu-item'));
[hrElement1, hrElement2].forEach(element => element.classList.add('menu-stroke'));
menu.classList.add('pull-down-menu');
[liElement1, liElement2, hrElement1, liElement3, liElement4, hrElement2, liElement5].forEach((element) => menu.appendChild(element));

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
