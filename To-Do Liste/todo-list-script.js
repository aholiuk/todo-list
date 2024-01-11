let todoList = JSON.parse(localStorage.getItem('todoList'));
if (!todoList){
  todoList = [];
}

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  
  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div> 
      <button class="delete-todo-button js-delete-todo-button">Delete</button> 
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      saveToStorage();
      renderTodoList();
    });
  });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  
  todoList.push({
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();

  saveToStorage();
}

/////////MAKE IT WORK!!!
document.body.addEventListener('keydown', (event) => {
  if (event === 'enter') {
    addTodo();
  }
});

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteTodoList(index) {
  todoList.splice(index, 1);
  //const doneEarlier = document.querySelector('.js-done-earlier')
  //  .innerHTML = 
  renderTodoList();
}