import '../pull-down-menu/pull-down-menu.css';
import DomElement from '../dom-element/DomElement.js';

export default class PullDownMenu {
    constructor(menuItems, main) {
        this.main = main;
        this.menuItems = menuItems;
        this.arrow = document.querySelector('.header__arrow-down');
        this.profileButton = document.querySelector('.header__profile-button');

        this.profileButton.addEventListener('click', () => {
            if (this.arrow.classList.contains('header__arrow-up')) {
                this.hideMenu();
            } else {
                this.showMenu();

                document.addEventListener('click', (event) => {
                    this.isClickInsideProfileButton = this.profileButton.contains(event.target);
                    this.isClickInsideMenu = this.menu.element.contains(event.target);
                
                    if (!this.isClickInsideProfileButton && !this.isClickInsideMenu) {
                        this.hideMenu();
                    }
                });
            }
        });
    }

    renderMenu() {
        this.menu = new DomElement({ type: 'ul', className: 'header__pull-down-menu' });
        this.menuItems.forEach((element, index) => {
            this.liElement = new DomElement({ type: 'li', className: 'header__pull-down-menu-item' });
            this.liElement.element.innerText = element;
            this.liElement.appendToElement(this.menu.element);
        
            if (index % 2 !== 0) {
                this.hrElement = new DomElement({ type: 'hr', className: 'header__menu-stroke' })
                this.hrElement.appendToElement(this.menu.element);
            }
        }); 
    }

    showMenu() {
        this.renderMenu();
        this.menu.appendToElement(this.main);
        this.arrow.classList.add('header__arrow-up');
    }

    hideMenu() {
        this.menu.removeElement();
        this.arrow.classList.remove('header__arrow-up');
    }
}
