# Kanban board App

Приложение Kanban разработано для управления задачами конкретного пользователя. 
По умолчанию реализовано 4 панели задач:

- **Backlog**: список планируемых задач. В панель можно добавалять неограниченное количество задач для дальнейшей работы;
- **Ready**: список задач к исполнению. Задачи переносятся из панели "Backlog". Для выбора реализовано выпадающее меню со списком;
- **InProgress**: задачи в стадии выполнения. Задачи переносятся из панели "Ready";
- **Finished**: список выполненных задач. Задачи переносятся из панели "InProgress".

При необходимости можно добавлять новые панели задач в начало списка, нажав на кнопку "Create new list". Списков может быть неограниченное количество.

Панель задач, по желанию, можно удалить, нажав на "..." в правом верхнем углу соответствующей панели и выбрав пункт меню "Delete list".

Добавление новой задачи в список реализуется путем нажатия на кнопку "Add card", либо нажав на "..." и выбрав пункт меню "Add new card".

![Иллюстрация к проекту](https://github.com/mariyaezhova/images/blob/main/Kanban.png)

## Необходимое ПО

-   [NodeJS (LTS)](https://nodejs.org/en/);

## Источники

В директории `src` размещена папка `components` и главный файл проекта `index.html`. 

Внутри директории `components` содержатся модули, на основе которых выстраивается DOM (такие как header, footer, main) и соответствующие им стили, а также необходимые классы для построения елементов и компонентов (DomElement, PullDownMenu, Board).

## Запуск приложения

- Устанавливаем настройки конфигурации для Node.js сервера: 
  > <pre>npm i
- Запускаем Node.js сервер: 
  > <pre>npm start
- Запускаем приложение:
  > <pre>npm run dev