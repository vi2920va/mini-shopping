(() => {
  let todoList = [];

  const LOADED_TODOLIST = localStorage.getItem('TODO');
  const TODO_CONTENT = document.querySelector('.todoContent');
  const ADD_INPUT = document.querySelector('.add-input');
  const INCOMPLETE = document.querySelector('.incomplete');
  const COMPLETED = document.querySelector('.completed');

  // initialize and execute
  const init = () => {
    loadTodoList();
    addEvent();
  };

  // todoList loading
  const loadTodoList = () => {
    if (LOADED_TODOLIST !== null) {
      todoList = JSON.parse(LOADED_TODOLIST);
      return todoList;
    }
  };
  const addEvent = () => {
    TODO_CONTENT.addEventListener('click', (event) => {
      if (event.target.className === 'add-btn') {
        addFormSubmit();
      } else if (event.target.className === 'delete-btn') {
      }
    });
  };
  // add item form validation
  const addFormSubmit = () => {
    let VALUE = ADD_INPUT.value;
    ADD_INPUT.value = '';
    addTodoDate(VALUE);
  };

  // add an item to the list
  const addTodoDate = (value) => {
    todoList.push({
      id: Math.floor(Math.random() * 999),
      contents: value,
      isCompleted: false,
    });

    renderTodo();
    saveTodoList();
  };

  const incompleteTemplate = (item) => {
    const INCOMPLETE_ITEM = `
    <li>
    <input id="${item.id}" type="checkbox" value=${item.isCompleted} />
    <label for="${item.id}">${item.contents}</label>
    <div class="todo-btngroup">
      <button type="button" class="edit-btn">edit</button>
      <button type="button" class="a11y-hidden save-btn">save</button>
      <button type="button" class="delete-btn">delete</button>
    </div>
  </li>
    `;

    return INCOMPLETE_ITEM;
  };

  const incomplete = (item) => {
    return !item.isCompleted;
  };

  // render
  const renderTodo = () => {
    let reverse, item;

    reverse = [...todoList];
    item = reverse.filter(incomplete);
    join = item.map(incompleteTemplate).join('');
    INCOMPLETE.innerHTML = join;
  };

  // save to todoList LocalStorage
  const saveTodoList = () => {
    localStorage.setItem('TODO', JSON.stringify(todoList));
  };

  init();
})();
