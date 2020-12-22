import './board.css';
import DomElement from '../dom-element/DomElement.js';
import PullDownMenu from '../pull-down-menu/PullDownMenu.js';
import { mainInnerText } from '../main/index.js'

export default class Board {
  constructor({ name }) {
    this.name = name;

    this.element = new DomElement({
      type: 'section',
      className: `tasks-block tasks-block__${name}`,
      html: `
        <header class="tasks-block__header">
          <input class="tasks-block__title" type="text" disabled="true" value="${this.name}">
          <svg class="tasks-block__dots">
              <use xlink:href="#dots"></use>
          </svg>
        </header>
        <main class="tasks-block__tasks-container"></main>
        <footer class="tasks-block__footer">
          <button class="tasks-block__add-task-button">
              <svg class="plus-symbol">
                  <use xlink:href="#plus-symbol"></use>
              </svg>
              Add card
          </button>
        </footer>
      `
    }).element;

    this.addButton = this.element.querySelector('.tasks-block__add-task-button');
    this.main = document.querySelector('.main');
    this.boardContainer = this.element.querySelector('.tasks-block__tasks-container');
    this.boardHeader = this.element.querySelector('.tasks-block__header');
    this.dotsButton = this.element.querySelector('.tasks-block__dots');
    this.footerActiveTaskEl = document.querySelector('.footer__text-active-tasks');
    this.footerFinishedTaskEl = document.querySelector('.footer__text-finished-tasks');

    this.dotsButton.addEventListener('click', () => {
      if (this.element.querySelector('.board__pull-down-menu')) {
        this.boardMenu.hideMenu();
      } else {
        const menuItems = ['Delete list', 'Add new card'];

        this.boardMenu = new PullDownMenu(menuItems, this.boardHeader, 'board__pull-down-menu');
        this.boardMenu.showMenu();
        this.element.querySelectorAll('.pull-down-menu-item')
          .forEach((elem) => {
            if (elem.innerText === menuItems[0]) {
              this.deleteItem = elem;
            } else {
              this.addCardItem = elem;
            }
          });

        this.addCardItem.addEventListener('click', () => {
          if (this.addButton.disabled !== true) {
            this.clickAddCard.call(this);
          }

          this.boardMenu.hideMenu();
        });

        this.deleteItem.addEventListener('click', () => {
          this.element.remove();
          this.deleteBoard(this.id);
          this.deleteTasks(this.id);
        });

        document.addEventListener('click', (event) => {
          this.isClickInsideBoardMenu = this.boardMenu.menu.element.contains(event.target);
          this.isClickOnDots = this.dotsButton.contains(event.target);

          if (!this.isClickInsideBoardMenu && !this.isClickOnDots) {
            this.boardMenu.hideMenu();
          }
        });
      }
    });

    this.addButton.addEventListener('click', this.clickAddCard.bind(this));
  }

  clickAddCard() {
    this.getBoardParameters();
    this.addButton.disabled = true;

    if (this.addButton === document.querySelectorAll('.tasks-block__add-task-button')[0]) {
      this.inputItem = new DomElement({ type: 'input', className: 'tasks-block__task' });
      this.inputItem.type = 'text';

      this.inputItem.appendToElement(this.boardContainer);
      this.inputItem.element.focus();

      this.inputItem.element.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
          this.inputItem.element.blur();
        }
      });

      this.inputItem.element.addEventListener('blur', ({ target: { value } }) => {
        if (value) {
          this.addTask();
          this.renderElements();
          this.getNumberTasks();
        } else {
          this.inputItem.removeElement();
        }

        this.addButton.disabled = false;
      });
    } else {
      this.selectElement = new DomElement({ type: 'ul', className: 'tasks-block__select-list' });

      this.emptyElement = new DomElement({
        type: 'li',
        className: 'tasks-block__empty-item-active',
        html: `
          <div>
            <span>Please select a task</span>
            <svg class="tasks-block__task-arrow-up">
              <use xlink:href="#arrow"></use>
            </svg>
          </div>
        `
      });

      this.emptyElement.appendToElement(this.selectElement.element);
      this.selectElement.appendToElement(this.boardContainer);
      this.renderTaskList();

      document.addEventListener('click', (event) => {
        const currentSelectList = document.querySelector('.tasks-block__select-list');
        const currentBlockClassName = currentSelectList && currentSelectList.parentNode.parentNode.className;

        if (currentBlockClassName && currentBlockClassName.indexOf(this.name) !== -1) {
          this.isClickInsideList = this.selectElement.element.contains(event.target);
          this.isClickButton = this.addButton.contains(event.target);

          if (this.addCardItem) {
            this.isClickAddCardItem = this.addCardItem.contains(event.target);
          }

          if (!this.isClickInsideList && !this.isClickButton && !this.isClickAddCardItem) {
            this.selectElement.removeElement();
            this.addButton.disabled = false;
          }
        }

      });

      this.selectElement.element.addEventListener('click', ({ target: { innerText, value } }) => {
        this.addButton.disabled = false;

        if (innerText === 'Please select a task') {
          this.selectElement.removeElement();

          return;
        }

        this.selectElement.removeElement();
        this.inputItem = new DomElement({ type: 'input', className: 'tasks-block__task' });
        this.inputItem.appendToElement(this.boardContainer);
        this.inputItem.element.value = innerText;
        this.inputItem.addClass('tasks-block__task-not-active');
        this.addTask();
        this.renderElements();
        this.deleteTaskFromPreviousBoard();
        this.getNumberTasks();

        fetch(`/board/${this.previousId}/tasks`)
          .then((res) => res.json())
          .then((res) => {
            return res.find((elem) => elem.id === value);
          })
          .then((data) => {
            this.deleteTask(data.id);
            this.renderElements(data);
            this.deleteTaskFromPreviousBoard();
          });
      });
    };
  }

  getBoardParameters() {
    fetch('/boards')
      .then((res) => res.json())
      .then((res) => {
        this.boardOrder = res.findIndex((item, index) => `${item.title}` === this.name);
        this.board = res.find((item) => `${item.title}` === this.name);
        this.id = this.board.id;

        if (this.boardOrder !== 0) {
          this.previousBoardOrder = this.boardOrder - 1;
          this.previousBoard = res.find((item, index) => index === this.previousBoardOrder);
          this.previousId = this.previousBoard.id;
          this.previousAddButton = document.querySelectorAll(`.tasks-block__add-task-button`)[`${this.previousBoardOrder}`];
        }

        if (this.boardOrder !== res.length - 1) {
          this.nextBoardOrder = this.boardOrder + 1;
          this.nextBoard = res.find((item, index) => index === this.nextBoardOrder);
          this.nextId = this.nextBoard.id;
          this.nextAddButton = document.querySelectorAll(`.tasks-block__add-task-button`)[`${this.nextBoardOrder}`];
        }
      });
  }

  addTask() {
    fetch('/tasks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: this.inputItem.element.value,
        boardId: this.id
      })
    });
  }

  deleteTask(id) {
    fetch(`/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  }

  deleteTasks(boardId) {
    fetch(`/tasks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ boardId })
    });

    this.getNumberTasks();
  }

  renderTaskList() {
    fetch(`/tasks`)
      .then((res) => res.json())
      .then((res) => {
        res.filter((elem) => elem.boardId === this.previousId)
          .forEach((elem) => {
            new DomElement({
              type: 'li',
              className: 'tasks-block__select-item',
              html: `${elem.task}`,
              value: `${elem.id}`
            }).appendToElement(this.selectElement.element);
          })
      });
  }

  renderTask({ task }) {
    return `<input class="tasks-block__task tasks-block__task-not-active" value="${task}" disabled="true"></input>`;
  }

  renderElements() {
    fetch('/tasks')
      .then((res) => res.json())
      .then((res) => {
        this.boardContainer.innerHTML = `
            ${res.filter(elem => elem.boardId === this.id)
            .reduce((acc, res) => acc + this.renderTask(res), "")}
          `
      });

    this.disableAddButtons();
  }

  disableAddButtons() {
    fetch('/tasks')
      .then((res) => res.json())
      .then((res) => {
        if (
          (res.findIndex((elem) => elem.boardId === this.previousId) === -1)
          && this.boardOrder !== 0
        ) {
          this.addButton.disabled = true;
        }

        if (!this.nextAddButton) return

        if (res.findIndex((elem) => elem.boardId === this.id) === -1) {
          this.nextAddButton.disabled = true;
        } else {
          this.nextAddButton.disabled = false;
        }
      });
  }

  renderNumberActiveTasks(boardId) {
    fetch('/tasks')
      .then((res) => res.json())
      .then((res) => {
        this.activeTasks = boardId
          .reduce((acc, elem1) => acc + res.filter((elem) => elem.boardId === elem1).length, 0);
        this.footerActiveTaskEl.innerText = `Active tasks: ${this.activeTasks}`;
      });
  }

  renderNumberFinishedTasks(boardId) {
    fetch('/tasks')
      .then((res) => res.json())
      .then((res) => {
        this.finishedTasks = this.finishedTasks + res.filter((elem) => elem.boardId === boardId).length;
        this.footerFinishedTaskEl.innerText = `Finished tasks: ${this.finishedTasks}`;
      });
  }

  getNumberTasks() {
    this.activeTasks = 0;
    this.finishedTasks = 0;

    fetch('/boards')
      .then((res) => res.json())
      .then((res) => {
        const activeBoardsArr = res.filter((elem, index, arr) => (index !== 0 && index !== arr.length - 1))
          .reduce((acc, elem) => acc.concat(elem.id), [])
        const finishedBoard = res.find((elem, index, arr) => index === arr.length - 1);

        this.renderNumberActiveTasks(activeBoardsArr);
        this.renderNumberFinishedTasks(finishedBoard.id);
      });
  }

  deleteTaskFromPreviousBoard() {
    this.prevBoardMain = document.querySelectorAll(`.tasks-block__tasks-container`)[`${this.previousBoardOrder}`];
    this.tasksPrevBoard = this.prevBoardMain.querySelectorAll('.tasks-block__task');
    this.tasksPrevBoard.forEach((elem) => {
      if (elem.value === this.inputItem.element.value) {
        this.deleteEl = elem;
        this.deleteEl.remove();
      }
    });
  }

  deleteBoard(id) {
    fetch(`/board/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(res => {
        if (res.length === 0) {
          mainInnerText.appendToElement(this.main)
        }

        if (res.length <= 4) {
          this.main.style.justifyContent = 'space-around';
        }

        document.querySelectorAll('.tasks-block').forEach((elem, index) => {
          const button = elem.querySelector('.tasks-block__add-task-button');

          if (
            index === 0
            || document.querySelectorAll('.tasks-block__tasks-container')[index - 1].children.length !== 0
          ) {
            button.disabled = false;
          } else {
            button.disabled = true;
          }
        });
      });
  }
}
