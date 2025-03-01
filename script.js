// Selecting Elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", todoAdd);
todoList.addEventListener("click", handle);
filterOption.addEventListener("change", filterTodos);

// Function to Add a New Todo
function todoAdd(event) {
    event.preventDefault(); 

    if (todoInput.value.trim() === "") {  
        alert("You must write something");
        return;
    }

    const taskDiv = document.createElement("div"); //div
    taskDiv.classList.add("todo");

    const todoId = Date.now(); //id
    taskDiv.dataset.id = todoId;

    const todoTask = document.createElement("li"); //li-item
    todoTask.innerText = todoInput.value;
    todoTask.classList.add("todo-item");
    taskDiv.appendChild(todoTask);

    const completeBtn = document.createElement("button"); //complete button
    completeBtn.innerHTML = '<i class="ri-check-fill"></i>';
    completeBtn.classList.add("complete-btn");
    taskDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement("button"); // delete button
    deleteBtn.innerHTML = '<i class="ri-delete-bin-fill"></i>';
    deleteBtn.classList.add("delete-btn");
    taskDiv.appendChild(deleteBtn);

    todoList.appendChild(taskDiv); // adding div to list

    saveDataToLocalStorage(todoInput.value, todoId, false); //save data to localstorage
    todoInput.value = ""; // Clear input
    filterTodos(); // apply filter()
}

// Function to Handle Click Events
function handle(event) {
    const item = event.target;
    const todoDiv = item.closest(".todo");

    if(item.classList.contains("delete-btn")){
        removeTodoFromLocalStorage(todoDiv.dataset.id);
        todoDiv.remove();
    }

    if(item.classList.contains("complete-btn")){
        todoDiv.classList.toggle("completed");
        updateTodo(todoDiv.dataset.id, todoDiv.classList.contains("completed"));
        filterTodos();
    }
}

// Function to Filter Todos
function filterTodos() {
    const allTodo = todoList.childNodes; 

    allTodo.forEach(function(todo) {
        if (todo.nodeType === Node.ELEMENT_NODE) {
            if (filterOption.value === "all") {
                todo.style.display = "flex";
            } else if (filterOption.value === "completed") {
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
            } else if (filterOption.value === "uncompleted") {
                todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
            }
        }
    });
}

// Function to Save Data to Local Storage
function saveDataToLocalStorage(text, id, completed) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text, id, completed });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to Show Todos on Page Load
function showTodo() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.dataset.id = todo.id;

        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="ri-check-fill"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="ri-delete-bin-fill"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton); 

        todoList.appendChild(todoDiv);
    });
}

// Function to Remove Todo from Local Storage
function removeTodoFromLocalStorage(id) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(function(todo) {
        return todo.id !== Number(id);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to Update Todo in Local Storage
function updateTodo(id, completed) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(function(todo) {
        if (todo.id === Number(id)) {
            return { ...todo, completed };
        } else {
            return todo;
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

showTodo(); // Show todos on page refresh
