const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');
const app = express();


let tasks = [
  { id: 0, task: 'task 1', boardId: 0 },
  { id: 1, task: 'task 2', boardId: 0 },
  { id: 2, task: 'task 3', boardId: 0 },
  { id: 3, task: 'task 4', boardId: 0 },
  { id: 4, task: 'task 5', boardId: 1 },
  { id: 5, task: 'task 6', boardId: 1 },
];

let idCounter = tasks.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src/components')));

app.listen(config.PORT, () => {
  console.log(`API app listening on port ${config.PORT}`);
})

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/tasks', (req, res) => {
  res.send(tasks);
})

app.get("/board/:id/tasks", (req, res) => {
  res.send(tasks.filter((item) => `${item.boardId}` === req.params.id));
});

app.get('/tasks/:id', (req, res) => {
  res.send(tasks.filter((item) => `${item.id}` === req.params.id));
})

app.post('/tasks', (req, res) => {
  if (req.body.task) {
    const newTask = { id: idCounter, task: req.body.task, boardId: req.body.boardId };

    idCounter = idCounter + 1;
    tasks.push(newTask);
    res.send(newTask);
  }
})

app.delete('/tasks', (req, res) => {
  const newTasksArr = [];
  tasks.forEach((elem, index) => {
    if (elem.boardId !== req.body.boardId) {
      newTasksArr.push(elem);
    }
  })
  tasks = newTasksArr;
  res.send(tasks);
})

app.delete('/tasks/:id', (req, res) => {
  const deleteIndex = tasks.findIndex(elem => elem.id === req.body.id);

  tasks.splice(deleteIndex, 1);
  res.send(tasks);
})

const boards = [
  { id: 0, title: "Backlog" },
  { id: 1, title: "Ready" },
  { id: 2, title: "In progress" },
  { id: 3, title: "Finished" },
];
let boardId = boards.length;

app.get('/boards', (req, res) => {
  res.send(boards);
})

app.get('/board/:id', (req, res) => {
  res.send(boards.filter((item) => `${item.id}` === req.params.id));
})

app.post('/boards', (req, res) => {
  if (req.body) {
    const newBoard = { id: boardId, title: req.body.name };

    boards.unshift(newBoard)
    boardId++;
    res.send(boards);
  }
})

app.delete('/board/:id', (req, res) => {
  const deleteIndex = boards.findIndex(elem => elem.id === req.body.id);

  boards.splice(deleteIndex, 1);
  res.send(boards);
})
