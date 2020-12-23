import './header.css';
import DomElement from '../dom-element/DomElement.js';

export const header = new DomElement({
  type: 'header',
  className: 'header',
  html: `
    <div class="header__left-part">
      <svg class="header__burger-menu">
          <use xlink:href="#burger-menu"></use>
      </svg>
      <span class="header__title">Awesome Kanban Board</span>
    </div>
    <div class="header__right-part">
      <button class="header__add-new-list-button">
          <svg class="header__plus-icon">
              <use xlink:href="#add"></use>
          </svg>
          Create new list
      </button>
      <div class="header__profile-button">
        <div class="header__profile-icon-wrapper">
          <svg class="header__profile-icon">
            <use xlink:href="#profile"></use>
          </svg>
        </div>
        <svg class="header__arrow-down">
            <use xlink:href="#arrow"></use>
        </svg>
      </div>
    </div>
  `
})
