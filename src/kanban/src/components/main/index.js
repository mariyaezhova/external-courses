import './styles.css';
import DomElement from '../dom-element/DomElement.js';
import { header } from '../header/header.js';
import { footer } from '../footer/footer.js';
import Board from '../board/Board.js';
import PullDownMenu from '../pull-down-menu/PullDownMenu.js';

export const main = new DomElement({ type: 'main', className: 'main' });
export const mainInnerText = new DomElement({
  type: 'span',
  className: 'main-text',
  html: `You don't have any tasks. Please add new list by clicking "Create new list" button.`
})

const menuItems = ['Your profile', 'Your tasks', 'Help', 'Settings', 'Sign out'];

header.appendToElement(document.body);
main.appendToElement(document.body);
footer.appendToElement(document.body);

const profileButton = document.querySelector('.header__profile-button');
const arrow = document.querySelector('.header__arrow-down');
const headerMenu = new PullDownMenu(menuItems, main.element);

profileButton.addEventListener('click', () => {
  if (arrow.classList.contains('header__arrow-up')) {
    headerMenu.hideMenu();
    arrow.classList.remove('header__arrow-up');
  } else {
    headerMenu.showMenu();
    arrow.classList.add('header__arrow-up');

    document.addEventListener('click', (event) => {
      const isClickInsideProfileButton = profileButton.contains(event.target);
      const isClickInsideMenu = headerMenu.menu.element.contains(event.target);

      if (!isClickInsideProfileButton && !isClickInsideMenu) {
        headerMenu.hideMenu();
        arrow.classList.remove('header__arrow-up');
      }
    });
  }
});

fetch("/boards")
  .then((res) => res.json())
  .then((res) => {
    if (res.length === 0) {
      mainInnerText.appendToElement(main.element);
    }

    return res.map((el) => new Board({ name: el.title }))
  }
  )
  .then((elems) =>
    elems.forEach((item) => {
      main.element.appendChild(item.element);
      item.getBoardParameters();
      item.renderElements();
      item.getNumberTasks();
    })
  );

const addNewListButton = document.querySelector('.header__add-new-list-button');

addNewListButton.addEventListener('click', () => {
  if (main.element.contains(mainInnerText.element)) {
    mainInnerText.removeElement();
  }

  const boardHeader = new DomElement({
    type: 'section',
    className: 'tasks-block',
    html: `
    <header class="tasks-block__header-active">
    <input class="tasks-block__title tasks-block__title-active" type="text" placeholder="Title">
    <svg class="tasks-block__dots">
    <use xlink:href="#dots"></use>
    </svg>
    </header>
    `
  });
  main.element.prepend(boardHeader.element);
  
  const title = document.querySelector('.tasks-block__title-active');

  title.focus();
  title.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      title.blur();
    }
  });

  title.addEventListener('blur', ({ target: { value } }) => {
    if (value) {
      fetch('/boards', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length > 4) {
            main.element.style.justifyContent = 'flex-start';
          }
        })

      const newBoard = new Board({ name: value })

      main.element.prepend(newBoard.element);
      newBoard.getBoardParameters();
      newBoard.getNumberTasks();
      newBoard.disableAddButtons();
    }
    boardHeader.element.remove();
  })
})
