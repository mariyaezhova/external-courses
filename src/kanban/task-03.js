'use strict';
const profileButton = document.querySelector('.header__profile-button');
const arrow = document.querySelector('.header__arrow-down');
const main = document.querySelector('.main');
const menu = document.createElement('ul');

const menuTextItems = ['Your profile', 'Your tasks', 'Help', 'Settings', 'Sign out'];

menuTextItems.forEach((element, index) => {
    const liElement = document.createElement('li');
    liElement.classList.add('header__pull-down-menu-item');
    liElement.innerText = element;
    menu.appendChild(liElement);

    if (index % 2 !== 0) {
        const hrElement = document.createElement('hr');
        hrElement.classList.add('header__menu-stroke');
        menu.appendChild(hrElement);
    }
});

menu.classList.add('header__pull-down-menu');

function showMenu() {
    main.append(menu);
    arrow.classList.add('header__arrow-up');
}

function hideMenu() {
    menu.remove();
    arrow.classList.remove('header__arrow-up');
}

profileButton.addEventListener('click', () => {
    if (arrow.classList.contains('header__arrow-up')) {
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

// Fill Kanban board section

const initialData = {
    backlog: [
        {
            id: 0,
            title: "task1"
        },
        {
            id: 1,
            title: "task2"
        },
        {
            id: 2,
            title: "task3"
        },
        {
            id: 3,
            title: "task4"
        },
        {
            id: 4,
            title: "task5"
        },
        {
            id: 5,
            title: "task6"
        },
        {
            id: 6,
            title: "task7"
        },
        {
            id: 7,
            title: "task8"
        },
    ],
    ready: [
        {
            id: 8,
            title: "task9"
        },
        {
            id: 9,
            title: "task10"
        }
    ],
    inProgress: [],
    finished: []
};

if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(initialData));
    localStorage.setItem('id-count', '9');
}

const tasks = JSON.parse(localStorage.getItem('tasks'));
let idCount = +localStorage.getItem("id-count");

const blocks = {
    backlog: document.querySelector('[data-tasks-block=backlog] .tasks-block__tasks-container'),
    ready: document.querySelector('[data-tasks-block=ready] .tasks-block__tasks-container'),
    inProgress: document.querySelector('[data-tasks-block=inProgress] .tasks-block__tasks-container'),
    finished: document.querySelector('[data-tasks-block=finished] .tasks-block__tasks-container'),
};

const addButtons = {
    backlog: document.querySelector('[data-tasks-block=backlog] .tasks-block__add-task-button'),
    ready: document.querySelector('[data-tasks-block=ready] .tasks-block__add-task-button'),
    inProgress: document.querySelector('[data-tasks-block=inProgress] .tasks-block__add-task-button'),
    finished: document.querySelector('[data-tasks-block=finished] .tasks-block__add-task-button'),
};

const taskBlocksOrder = ['backlog', 'ready', 'inProgress', 'finished'];
const plusSymbol = [...document.querySelectorAll('.plus-symbol')];

const renderTasks = () => {
    localStorage.setItem('id-count', `${idCount}`);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    Object.keys(tasks).forEach(key => {
        blocks[key].innerHTML = '';
        tasks[key].forEach(task => {
            const taskItem = document.createElement('input');

            taskItem.value = task.title;
            taskItem.type = 'text';
            taskItem.disabled = 'true';
            taskItem.classList.add('tasks-block__task', 'tasks-block__task-not-active');
            blocks[key].appendChild(taskItem);
        })
    });

    taskBlocksOrder.forEach((key, i) => {
        const nextKey = taskBlocksOrder[i + 1];

        if (!nextKey) {
            return;
        }

        if (tasks[key].length) {
            addButtons[nextKey].disabled = false;
        } else {
            addButtons[nextKey].disabled = true;
            plusSymbol[i + 1].style.fill = '#a5b5d1';
        }
    })
};

taskBlocksOrder.forEach(key => {
    if (key === 'backlog') {
        addButtons[key].addEventListener('click', () => {
            const inputItem = document.createElement('input');

            inputItem.className = 'tasks-block__task';
            inputItem.type = 'text';
            blocks[key].appendChild(inputItem);
            inputItem.focus();
            addButtons[key].disabled = true;

            inputItem.addEventListener('keydown', (event) => {
                if (event.code === 'Enter') {
                    inputItem.blur();
                    addButtons[key].disabled = false;
                }
            });

            inputItem.addEventListener('blur', ({ target: { value } }) => {
                if (value) {
                    idCount += 1;
                    tasks[key].push({ id: idCount, title: value });
                }
                addButtons[key].disabled = false;
                renderTasks();
            });
        });

        return;
    }

    addButtons[key].addEventListener('click', () => {
        const selectElement = document.createElement('ul');
        const emptyElement = document.createElement('li');
        const blockOrder = taskBlocksOrder.findIndex(blockKey => key === blockKey);
        const prevBlockName = taskBlocksOrder[blockOrder - 1];

        selectElement.className = 'tasks-block__select-list';
        emptyElement.innerHTML = '<span>Please select a task</span><svg class="tasks-block__task-arrow-up"><use xlink:href="#arrow"></use></svg>'
        blocks[key].appendChild(selectElement);
        selectElement.appendChild(emptyElement);
        selectElement.focus();

        tasks[prevBlockName].forEach(({ title, id }) => {
            const liElement = document.createElement('li');

            emptyElement.classList.add('tasks-block__empty-item-active');
            liElement.classList.add('tasks-block__select-item');
            liElement.innerText = title;
            liElement.value = id;
            selectElement.appendChild(liElement);
        });

        selectElement.addEventListener('click', ({ target: { innerText, value } }) => {
            const taskObject = { id: value, title: innerText };
            const deleteIndex = tasks[prevBlockName].findIndex(({ id }) => id === value);

            if (innerText === 'Please select a task') {
                selectElement.remove();
                addButtons[key].disabled = false;

                return;
            }

            emptyElement.innerText = innerText;
            tasks[key].push(taskObject);
            tasks[prevBlockName].splice(deleteIndex, 1);
            renderTasks();
        });
        addButtons[key].disabled = true;
    });
});

renderTasks();
localStorage.clear();
