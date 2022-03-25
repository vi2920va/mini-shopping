(() => {
  let todoList = [];
  let completedList = [];

  const LOADED_TODOLIST = localStorage.getItem('TODO');
  const COMPLETED_LIST = localStorage.getItem('COMPLETED');

  const TODO_CONTENT = document.querySelector('.todoContent');
  const ADD_INPUT = document.querySelector('.add-input');
  const INCOMPLETE = document.querySelector('.incomplete');
  const COMPLETED = document.querySelector('.completed');

  // initialize and execute
  const init = () => {
    addEvent();
    loadTodoList();
    loadCompletedList();
    renderTodo();
  };

  // loading todoList
  const loadTodoList = () => {
    if (LOADED_TODOLIST !== null) {
      todoList = JSON.parse(LOADED_TODOLIST);
      return todoList;
    }
  };

  // loading compltedList
  const loadCompletedList = () => {
    if (COMPLETED_LIST !== null) {
      completedList = JSON.parse(COMPLETED_LIST);
      return completedList;
    }
  };

  // event listener
  const addEvent = () => {
    let li, id, index, todo, list, checkbox, item;
    let label, input, save_btn, edit_btn;

    TODO_CONTENT.addEventListener('click', (e) => {
      // add button
      if (e.target.className === 'add-btn') {
        addFormSubmit();

        // delete button
      } else if (e.target.className === 'delete-btn') {
        li = e.target.parentNode.parentNode;
        id = Number(li.getAttribute('data-id'));
        checkbox = li.querySelector('input[type="checkbox"]').value;
        list = checkbox === 'true' ? [...completedList] : [...todoList];
        index = list.findIndex(matchingID.bind(todo, id));

        list.splice(index, 1);
        list = checkbox === 'true' ? (completedList = list) : (todoList = list);

        renderTodo();
        saveTodoList();
        saveCompletedList();

        // edit button
      } else if (e.target.className === 'edit-btn') {
        list = [...todoList];
        li = e.target.parentNode.parentNode;
        id = Number(li.getAttribute('data-id'));
        item = todoList.find(matchingID.bind(todo, id));

        label = li.querySelector('label');
        label.classList.add('a11y-hidden');

        save_btn = li.querySelector('.save-btn');
        save_btn.classList.remove('a11y-hidden');

        edit_btn = li.querySelector('.edit-btn');
        edit_btn.classList.add('a11y-hidden');

        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', id);
        input.setAttribute('value', item.contents);

        li.insertBefore(input, label.nextSibling);

        // save button
      } else if (e.target.className === 'save-btn') {
        list = [...todoList];
        li = e.target.parentNode.parentNode;
        id = Number(li.getAttribute('data-id'));
        item = list.find(matchingID.bind(todo, id));
        index = list.findIndex(matchingID.bind(todo, id));

        input = li.querySelector('input[type="text"]');
        item.contents = input.value;

        save_btn = li.querySelector('.save-btn');
        save_btn.classList.add('a11y-hidden');

        edit_btn = li.querySelector('.edit-btn');
        edit_btn.classList.remove('a11y-hidden');
        list.splice(index, 0);
        todoList = list;

        saveTodoList();
        renderTodo();

        // incomplete if checkbox value is false
      } else if (e.target.type === 'checkbox' && e.target.value === 'false') {
        list = [...todoList];
        id = Number(e.target.id);
        index = list.findIndex(matchingID.bind(todo, id));
        item = list.find(matchingID.bind(todo, id));

        item.isCompleted = !item.isCompleted;
        completedList.push(item);
        list.splice(index, 1);
        todoList = list;

        renderTodo();
        saveTodoList();
        saveCompletedList();

        // complete if checkbox value is true
      } else if (e.target.type === 'checkbox' && e.target.value === 'true') {
        list = [...completedList];
        id = Number(e.target.id);
        index = list.findIndex(matchingID.bind(todo, id));
        item = list.find(matchingID.bind(todo, id));

        item.isCompleted = !item.isCompleted;
        todoList.push(item);
        list.splice(index, 1);
        completedList = list;

        renderTodo();
        saveTodoList();
        saveCompletedList();
      }
    });
  };

  // add item form validation
  const addFormSubmit = () => {
    let VALUE = ADD_INPUT.value;

    if (VALUE === '') {
      return false;
    }

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

  // incompleteTemplete
  const incompleteTemplate = (item) => {
    const INCOMPLETE_ITEM = `
    <li data-id=${item.id}>
    <input id=${item.id} type="checkbox" value=${item.isCompleted} />
    <label for=${item.id}>${item.contents}</label>
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

  // completed template
  const completedTemplate = (item) => {
    const COMPLETED_ITEM = `
    <li data-id=${item.id}>
    <input id=${item.id} type="checkbox" value=${item.isCompleted} />
    <label for=${item.id}>${item.contents}</label>
    <div class="todo-btngroup">
      <button type="button" class="delete-btn">delete</button>
    </div>
  </li>
    `;
    return COMPLETED_ITEM;
  };

  const completed = (item) => {
    return item.isCompleted;
  };

  // matching item
  const matchingID = (id, item) => {
    return item.id === id;
  };

  // render
  const renderTodo = () => {
    let reverse, item, join;

    // todoList
    reverse = [...todoList];
    item = reverse.filter(incomplete);
    join = item.map(incompleteTemplate).join('');
    INCOMPLETE.innerHTML = join;

    reverse = [...completedList];
    item = reverse.filter(completed);
    join = item.map(completedTemplate).join('');
    COMPLETED.innerHTML = join;
  };

  // save to todoList LocalStorage
  const saveTodoList = () => {
    localStorage.setItem('TODO', JSON.stringify(todoList));
  };

  // save to completedList LocalStorage
  const saveCompletedList = () => {
    localStorage.setItem('COMPLETED', JSON.stringify(completedList));
  };

  init();
})();
