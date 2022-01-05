// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const progressBar = document.querySelector('.progress-bar');
const messageComplete = document.querySelector('.complete-popup');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
   // Todo div
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");
   // Create li 
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Add to localStorage
    saveLocalTodos(todoInput.value);
    // Create checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
    // Clear Todo Input value
    todoInput.value = "";
}

function deleteCheck(event) {
    //console.log(event.target);
    const item = event.target;
    // Delete todo
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    } 
    // Check mark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        progressBar.value = progressBar.value + 1;
        messageComplete.innerText = "well done!";
        messageComplete.style.color = "yellowgreen";
        setTimeout(
            function() {
                messageComplete.innerText = "let's work!";
                messageComplete.style.color = "black";
            },
            4000
        );
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    todos = checkLocalStorage(todos);
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    progressBar.max = todos.length;
}

function checkLocalStorage(todos) {
    if (localStorage.getItem("todos") === null) {
       todos = [];
    } else {
       todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function getTodos() {
    let todos;
    todos = checkLocalStorage(todos);
    todos.forEach(function(todo) {
        // Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Create li 
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // Create checked button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("trash-btn");
        todoDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(todoDiv);        
    });
    progressList();
}

function removeLocalTodo(todo) {
    let todos;
    todos = checkLocalStorage(todos);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    progressBar.max = todos.length;
    if(todos.length == 0) progressBar.value = 0;
}