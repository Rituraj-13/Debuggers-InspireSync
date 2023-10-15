// Quote Function
const get_quotes = async () => {
  const url = 'https://api.quotable.io/quotes/random?tags=success|wisdom&maxLength=60';
  const options = {
    method: 'GET',
  };
  const quote = document.getElementById("quote_data");

  try {
    const response = await fetch(url, options);
    const jsonData = await response.json();

    for (const item of jsonData) {
      quote.innerHTML = `${item.content} <span class="author">--&nbsp;${item.author}</span>`;
    }
  } catch (error) {
    console.error(error);
  }
}

get_quotes();

// todo list
let todos = []

let inputText = document.getElementById('todo_inp');
let outputDiv = document.getElementById('todos_box');

function init() {
    let todosCopy = JSON.parse(localStorage.getItem('is_todosList'));
    if (todosCopy != null) { todos = todosCopy; }
    renderTodo();
}

function uniqueId() {
    let uniqueId, str = "";
    let num = Math.round(Math.random() * 1000000000);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}[]:<>?,./+-*"

    for (i = 0; i < 10; i++) { str += possible[Math.floor(Math.random() * possible.length)] }

    uniqueId = "uid_" + str + "_" + num;
    return uniqueId;
}

let add_todo = document.getElementById('add_todo');
add_todo.addEventListener('click', addTodos);
function addTodos() {
    if(inputText.value != ''){
        let newTodo = {
            _uid: uniqueId(),
            data: inputText.value,
            complete: false
        }

        todos.push(newTodo);
        renderTodo();
        inputText.value = '';
    }else{
        alert("Input box is empty!");
    }

}


function deleteTodo(e) {
    let _id = e.target.getAttribute('del_data');    

    for(i=0; i<todos.length; i++){
        if(todos[i]._uid === _id) break;
    }

    todos.splice(i, 1);
    renderTodo();
}

function todo_check(e){
  let _id = e.target.getAttribute('todo_check');
  for(i=0; i<todos.length; i++){
    if(todos[i]._uid === _id){
      todos[i].complete = true;
    }
  }
  renderTodo();
}

function renderTodo() {
    outputDiv.innerHTML = '';
    for(i=0; i<todos.length; i++){
      item = document.createElement('div');
      item.className = 'todo flex_center';
     
      check_box = document.createElement('input');
      check_box.type = 'checkbox';
      check_box.id = 'todo_check';
      check_box.setAttribute('name', 'todo_check');
      check_box.setAttribute('todo_check', todos[i]._uid);
      check_box.addEventListener('change', todo_check);

      label = document.createElement('label')
      label.setAttribute('for', 'todo_check');
      if(todos[i].complete){
        label.classList.add('todo_complete');
        check_box.checked = true;
      }
      label.innerText = `${todos[i].data}`;

      del_btn = document.createElement('button');
      del_btn.classList.add('todo_del_btn');

      img = document.createElement('img');
      img.src = './icons/delete.png';
      img.setAttribute('del_data', todos[i]._uid);
      img.addEventListener('click', deleteTodo);

      del_btn.appendChild(img);
      item.appendChild(check_box);
      item.appendChild(label);
      item.appendChild(del_btn);

      outputDiv.appendChild(item);
    }

    localStorage.setItem('is_todosList', JSON.stringify(todos));
}


init(); 


// toggle website blocker switch
let blocker_switch = document.getElementById('web_block_inp');
blocker_switch.addEventListener('change', toggleBlocker);

function toggleBlocker(){
  if(blocker_switch.checked){
    chrome.storage.sync.set({ 'web_blocker': true }).then(() => {
      blocker_switch.title = "Running";
    });
  }else{
    chrome.storage.sync.set({ 'web_blocker': false }).then(() => {
      blocker_switch.title = "Please Trun On for Blocking";
    });
  }
}

chrome.storage.sync.get(["web_blocker"]).then((result) => {
  if(result.web_blocker){
    blocker_switch.checked = true;
    blocker_switch.title = "Running";
  }else{
    blocker_switch.checked = false;
    blocker_switch.title = "Please Trun On for Blocking";
  }
});


// Youtube Music


