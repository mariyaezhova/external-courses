import DomElement from '../dom-element/DomElement.js';

export default class Board {
  constructor({ boardId, name }) {
    this.id = boardId;

    this.element = new DomElement({
      type: 'section',
      className: 'tasks-block',
      html: `
        <header class="tasks-block__header">${name}
          <svg class="tasks-block__dots">
              <use xlink:href="#dots"></use>
          </svg>
        </header>
        <main id="tasks-block__container_${boardId}" class="tasks-block__tasks-container"></main>
        <footer class="tasks-block__footer">
          <button id="tasks-block__button_${boardId}" class="tasks-block__add-task-button">
              <svg class="plus-symbol">
                  <use xlink:href="#plus-symbol"></use>
              </svg>
              Add card
          </button>
        </footer>
      `,
      id: boardId
    }).element;

    this.addButton = this.element.querySelector('.tasks-block__add-task-button');
    this.main = this.element.querySelector('.tasks-block__tasks-container');

    this.addButton.addEventListener('click', () => {
      if (this.id === 0) {
        this.inputItem = new DomElement({ type: 'input', className: 'tasks-block__task' });
        this.inputItem.type = 'text';

        this.inputItem.appendToElement(this.main);
        this.inputItem.element.focus();
        this.addButton.disabled = true;

        this.inputItem.element.addEventListener('keydown', (event) => {
          if (event.code === 'Enter') {
            this.inputItem.element.blur();
          }
        });

        this.inputItem.element.addEventListener('blur', ({ target: { value } }) => {
          if (value) {
            this.addTask();
          } else {
            this.inputItem.removeElement();
          }

          this.addButton.disabled = false;
        })

      } else {
        this.selectElement = new DomElement({ type: 'ul', className: 'tasks-block__select-list' });

        this.emptyElement = new DomElement({
          type: 'li',
          html: `
          <span>Please select a task</span>
          <svg class="tasks-block__task-arrow-up">
            <use xlink:href="#arrow"></use>
          </svg>
          `,
        });

        this.emptyElement.appendToElement(this.selectElement.element)
        this.selectElement.appendToElement(this.main);
        this.addButton.disabled = true;
        this.renderTaskList();

        this.selectElement.element.addEventListener('click', ({ target: { innerText, value } }) => {
          if (innerText === 'Please select a task') {
            this.selectElement.removeElement();
            this.addButton.disabled = false;

            return;
          }

          this.selectElement.removeElement();
          this.inputItem = new DomElement({ type: 'input', className: 'tasks-block__task' });
          this.inputItem.appendToElement(this.main);
          this.inputItem.element.value = innerText;
          this.inputItem.addClass('tasks-block__task-not-active');
          this.inputItem.element.disabled = true;
          this.addButton.disabled = false;
          this.addTask();

          fetch("/tasks").then((res) => res.json())
            .then((res) => {
              return res.find((elem) => elem.id === value);
            })
            .then((data) => {
              this.deleteTask(data.id);
            })
        });

        document.addEventListener('click', (event) => {
          this.isClickInsideList = this.selectElement.element.contains(event.target);
          this.isClickButton = this.addButton.contains(event.target);

          if (!this.isClickInsideElement && !this.isClickButton) {
            this.selectElement.removeElement();
            this.addButton.disabled = false;
            this.disableAddButton();
          }
        });
      };

    });
  }

  addTask() {
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: this.inputItem.element.value,
        boardId: this.id
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.renderElements(res);
        this.renderElementsPrevBoard();
        this.disableAddButton();
      });
  }

  deleteTask(id) {
    fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then((res) => res.json())
      .then((res) => {
        this.renderElements(res);
        this.renderElementsPrevBoard();
      });
  }

  renderTaskList() {
    fetch("/tasks")
      .then((res) => res.json())
      .then((res) => {
        this.emptyElement.addClass('tasks-block__empty-item-active');
        res.filter(elem => elem.boardId === this.id - 1)
          .forEach((elem) => {
            new DomElement({
              type: 'li',
              className: 'tasks-block__select-item',
              html: `${elem.task}`,
              value: `${elem.id}`
            }).appendToElement(this.selectElement.element);
          })
      })
  }

  renderTask({ task }) {
    return `<input class="tasks-block__task tasks-block__task-not-active" value="${task}" disabled="true"></input>`;
  }

  renderElements() {
    fetch("/tasks")
      .then((res) => res.json())
      .then((res) => {
        this.main.innerHTML = `
              ${res.filter(elem => elem.boardId === this.id)
            .reduce((acc, res) => acc + this.renderTask(res), "")}
          `
      })
  }

  renderElementsPrevBoard() {
    fetch("/tasks")
      .then((res) => res.json())
      .then((res) => {
        this.prevBoardMain = document.getElementById(`tasks-block__container_${this.id - 1}`);
        this.prevBoardMain.innerHTML = `
              ${res.filter(elem => elem.boardId === this.id - 1)
            .reduce((acc, res) => acc + this.renderTask(res), "")}
          `
      })
  }

  disableAddButton() {
    fetch("/tasks")
      .then((res) => res.json())
      .then((res) => {
        this.nextAddButton = document.getElementById(`tasks-block__button_${this.id + 1}`)
        if (
          !(res.find((elem) => elem.boardId === this.id - 1))
          && this.id !== 0
        ) {
          this.addButton.disabled = true;
        }

        if ((res.find((elem) => elem.boardId === this.id))) {
          this.nextAddButton.disabled = false;
        }
      })
  }
}
