import './pull-down-menu.css';
import DomElement from '../dom-element/DomElement.js';

export default class PullDownMenu {
    constructor(menuItems, main, className = 'header__pull-down-menu') {
        this.main = main;
        this.menuItems = menuItems;
        this.className = className;
    }

    renderMenu() {
        this.menu = new DomElement({ type: 'ul', className: this.className });
        this.menuItems.forEach((element, index, array) => {
            this.liElement = new DomElement({
                type: 'li',
                className: 'pull-down-menu-item',
                html: `${element}`,
            });
            this.liElement.appendToElement(this.menu.element);

            if (index % 2 !== 0 && index !== array.length - 1) {
                this.hrElement = new DomElement({ type: 'hr', className: 'menu-stroke' })
                this.hrElement.appendToElement(this.menu.element);
            }
        });
    }

    showMenu() {
        this.renderMenu();
        this.main.prepend(this.menu.element);
    }

    hideMenu() {
        this.menu.element.remove();
    }
}
