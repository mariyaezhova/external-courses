import './styles.css';
import '../board/board.css';
import '../pull-down-menu/pull-down-menu.css';
import DomElement from '../dom-element/DomElement.js';
import { header } from '../header/header.js';
import { footer } from '../footer/footer.js';
import Board from '../board/Board.js';
import PullDownMenu from '../pull-down-menu/PullDownMenu.js';

export const main = new DomElement({ type: 'main', className: 'main' });
const menuItems = ['Your profile', 'Your tasks', 'Help', 'Settings', 'Sign out'];
header.appendToElement(document.body);
main.appendToElement(document.body);
footer.appendToElement(document.body);

const pullDownMenu = new PullDownMenu(menuItems, main.element);

fetch("/boards")
  .then((res) => res.json())
  .then((res) => {
    return res.map((el) => new Board({ boardId: el.id, name: el.title }))
  }
  )
  .then((elems) => 
    elems.forEach((item) => {
      main.element.appendChild(item.element);
      item.renderElements();
      item.disableAddButton();
    })
  );
